import { BrowserProvider, Contract, ethers } from "ethers";
import {
  ERC20_ABI,
  ASSET_TOKEN_BYTECODE,
  SHARE_TOKEN_ABI,
  SHARE_TOKEN_BYTECODE,
  STAKING_VAULT_ABI,
  STAKING_VAULT_BYTECODE,
  HOODI_CHAIN,
  HOODI_CHAIN_ID,
  HOODI_EXPLORER,
} from "./abis";

// ---- Types ----

export interface DeployedContracts {
  asset: string;
  share: string;
  staking: string;
}

export interface StakingMetadata {
  name: string;
  description: string;
  author: string;
}

export interface OnChainState {
  totalAssets: string;
  totalShares: string;
  exchangeRate: string;
  userAssetBalance: string;
  userShareBalance: string;
  userStakedBalance: string;
}

// ---- Helpers ----

function getProvider(): BrowserProvider {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Ethereum wallet found. Please install MetaMask.");
  }
  return new BrowserProvider(window.ethereum);
}

async function ensureHoodiNetwork(): Promise<void> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Ethereum wallet found.");
  }

  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });
  const currentChainId = Number.parseInt(chainIdHex as string, 16);

  if (currentChainId !== HOODI_CHAIN_ID) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: HOODI_CHAIN.chainId }],
      });
    } catch (switchError: unknown) {
      const err = switchError as { code?: number };
      // Chain not added yet - add it
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [HOODI_CHAIN],
        });
      } else {
        throw switchError;
      }
    }
  }
}

// ---- Wallet ----

/**
 * Connect wallet: request accounts first (so MetaMask shows Connect and user approves),
 * then switch to Ethereum Hoodi. Doing network switch before connect can cause "Failed to connect to MetaMask".
 */
export async function connectWallet(): Promise<string> {
  const provider = getProvider();
  const accounts = await provider.send("eth_requestAccounts", []);
  const address = accounts[0];
  if (!address) {
    throw new Error("No accounts returned. Unlock MetaMask and try again.");
  }
  await ensureHoodiNetwork();
  return address;
}

export async function getConnectedAddress(): Promise<string | null> {
  try {
    const provider = getProvider();
    const accounts = await provider.send("eth_accounts", []);
    return accounts[0] || null;
  } catch {
    return null;
  }
}

// Explicit gas for deploys (avoids estimateGas issues and "missing revert data" on some testnets).
const DEPLOY_GAS_LIMIT = 8_000_000;

/** Send deploy tx with explicit data + gasLimit so wallet/RPC never drop bytecode. */
async function sendDeployTx(
  factory: ethers.ContractFactory,
  signer: ethers.Signer,
  args: unknown[],
  gasLimit: number = DEPLOY_GAS_LIMIT
): Promise<string> {
  const deployTx = await factory.getDeployTransaction(...args);
  const data =
    typeof deployTx.data === "string"
      ? deployTx.data
      : deployTx.data
        ? ethers.hexlify(deployTx.data)
        : "";
  if (!data || data === "0x") {
    throw new Error("Deploy transaction has no bytecode (data is empty).");
  }
  const tx = await signer.sendTransaction({
    data,
    gasLimit,
  });
  const receipt = await tx.wait();
  if (receipt && (receipt as { status?: number }).status === 0) {
    throw new Error(
      "Deployment reverted. The network may need more gas or the contract constructor failed. Try again or use a different RPC."
    );
  }
  const address = receipt?.contractAddress;
  if (!address) {
    throw new Error("Deployment failed: no contract address in receipt.");
  }
  return address;
}

export async function deployERC20(
  name: string,
  symbol: string
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();
  const factory = new ethers.ContractFactory(ERC20_ABI, ASSET_TOKEN_BYTECODE, signer);
  return sendDeployTx(factory, signer, [name, symbol]);
}

/** Deploy share token using the dedicated share-token bytecode (mint/burn/setStakingContract). */
export async function deployShareToken(
  name: string,
  symbol: string
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();
  const factory = new ethers.ContractFactory(
    SHARE_TOKEN_ABI,
    SHARE_TOKEN_BYTECODE,
    signer
  );
  return sendDeployTx(factory, signer, [name, symbol]);
}

export async function deployStakingVault(
  assetAddress: string,
  shareAddress: string,
  metadata: StakingMetadata
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();
  const metadataString = JSON.stringify(metadata);
  const factory = new ethers.ContractFactory(
    STAKING_VAULT_ABI,
    STAKING_VAULT_BYTECODE,
    signer
  );
  return sendDeployTx(factory, signer, [
    assetAddress,
    shareAddress,
    metadataString,
  ]);
}

// ---- Read Operations ----

export async function fetchOnChainState(
  contracts: DeployedContracts,
  userAddress: string
): Promise<OnChainState> {
  const provider = getProvider();

  const assetContract = new Contract(contracts.asset, ERC20_ABI, provider);
  const shareContract = new Contract(contracts.share, SHARE_TOKEN_ABI, provider);
  const stakingContract = new Contract(
    contracts.staking,
    STAKING_VAULT_ABI,
    provider
  );

  const stakingAddress = contracts.staking;

  const [
    totalAssets,
    totalShares,
    userAssetBalance,
    userShareBalance,
  ] = await Promise.all([
    assetContract.balanceOf(stakingAddress).catch(() => BigInt(0)),
    shareContract.totalSupply().catch(() => BigInt(0)),
    assetContract.balanceOf(userAddress).catch(() => BigInt(0)),
    shareContract.balanceOf(userAddress).catch(() => BigInt(0)),
  ]);

  const rate =
    totalShares === BigInt(0)
      ? ethers.parseEther("1")
      : (totalAssets * ethers.parseEther("1")) / totalShares;

  return {
    totalAssets: ethers.formatEther(totalAssets),
    totalShares: ethers.formatEther(totalShares),
    exchangeRate: ethers.formatEther(rate),
    userAssetBalance: ethers.formatEther(userAssetBalance),
    userShareBalance: ethers.formatEther(userShareBalance),
    userStakedBalance: ethers.formatEther(userShareBalance),
  };
}

export async function previewDepositOnChain(
  stakingAddress: string,
  amount: string
): Promise<string> {
  try {
    const provider = getProvider();
    const stakingContract = new Contract(
      stakingAddress,
      STAKING_VAULT_ABI,
      provider
    );
    const assets = ethers.parseEther(amount);
    const shares = await stakingContract.previewDeposit(assets);
    return ethers.formatEther(shares);
  } catch {
    return amount; // fallback 1:1 rate
  }
}

export async function previewWithdrawOnChain(
  stakingAddress: string,
  amount: string
): Promise<string> {
  try {
    const provider = getProvider();
    const stakingContract = new Contract(
      stakingAddress,
      STAKING_VAULT_ABI,
      provider
    );
    const shares = ethers.parseEther(amount);
    const assets = await stakingContract.previewWithdraw(shares);
    return ethers.formatEther(assets);
  } catch {
    return amount; // fallback 1:1 rate
  }
}

// ---- Write Operations ----

export async function approveAsset(
  assetAddress: string,
  spenderAddress: string,
  amount: string
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();
  const assetContract = new Contract(assetAddress, ERC20_ABI, signer);

  const parsedAmount = ethers.parseEther(amount);
  const tx = await assetContract.approve(spenderAddress, parsedAmount);
  await tx.wait();
  return tx.hash;
}

export async function stakeTokens(
  stakingAddress: string,
  assetAddress: string,
  amount: string
): Promise<{ txHash: string; shares: string }> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();

  // First approve
  const assetContract = new Contract(assetAddress, ERC20_ABI, signer);
  const parsedAmount = ethers.parseEther(amount);

  const approveTx = await assetContract.approve(stakingAddress, parsedAmount);
  await approveTx.wait();

  const stakingContract = new Contract(
    stakingAddress,
    STAKING_VAULT_ABI,
    signer
  );
  const sharesMinted = await stakingContract.previewDeposit(parsedAmount);
  const depositTx = await stakingContract.deposit(parsedAmount);
  await depositTx.wait();

  return {
    txHash: depositTx.hash,
    shares: ethers.formatEther(sharesMinted),
  };
}

export async function unstakeTokens(
  stakingAddress: string,
  amount: string
): Promise<{ txHash: string; assets: string }> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();

  const stakingContract = new Contract(
    stakingAddress,
    STAKING_VAULT_ABI,
    signer
  );
  const parsedShares = ethers.parseEther(amount);
  const assetsReturned = await stakingContract.previewWithdraw(parsedShares);
  const tx = await stakingContract.withdraw(parsedShares);
  await tx.wait();

  return {
    txHash: tx.hash,
    assets: ethers.formatEther(assetsReturned),
  };
}

// ---- Utility ----

export function getExplorerUrl(
  addressOrTx: string,
  type: "address" | "tx" = "address"
): string {
  return `${HOODI_EXPLORER}/${type}/${addressOrTx}`;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// ---- localStorage persistence for contract addresses + ABIs ----

const STORAGE_KEY = "stakevault_contracts";

export interface SavedContractData {
  contracts: DeployedContracts;
  assetName: string;
  assetSymbol: string;
  shareName: string;
  shareSymbol: string;
  metadata: StakingMetadata;
  deployedAt: string;
  chainId: number;
}

export function saveContractData(data: SavedContractData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadContractData(): SavedContractData | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return null;
}

export function clearContractData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Re-export chain constants for convenience
export {
  HOODI_CHAIN_ID,
  HOODI_EXPLORER,
  HOODI_RPC_PRIMARY,
} from "./abis";
