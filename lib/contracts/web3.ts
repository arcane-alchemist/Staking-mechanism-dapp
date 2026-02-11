import { BrowserProvider, Contract, ethers } from "ethers";
import {
  ERC20_ABI,
  STAKING_VAULT_ABI,
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

export async function connectWallet(): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
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

// ---- Contract Deployment ----

export async function deployERC20(
  name: string,
  symbol: string
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();

  const factory = new ethers.ContractFactory(ERC20_ABI, "0x", signer);

  // Use a minimal proxy deploy - the actual bytecode should come from your compiled Solidity
  // For now we deploy via the factory pattern
  const contract = await factory.deploy(name, symbol);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  return address;
}

export async function deployStakingVault(
  assetAddress: string,
  shareAddress: string,
  metadata: StakingMetadata
): Promise<string> {
  await ensureHoodiNetwork();
  const provider = getProvider();
  const signer = await provider.getSigner();

  // Hash the metadata into bytes32 for on-chain storage
  const metadataString = JSON.stringify(metadata);
  const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(metadataString));

  const factory = new ethers.ContractFactory(
    STAKING_VAULT_ABI,
    "0x",
    signer
  );
  const contract = await factory.deploy(assetAddress, shareAddress, metadataHash);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  return address;
}

// ---- Read Operations ----

export async function fetchOnChainState(
  contracts: DeployedContracts,
  userAddress: string
): Promise<OnChainState> {
  const provider = getProvider();

  const assetContract = new Contract(contracts.asset, ERC20_ABI, provider);
  const shareContract = new Contract(contracts.share, ERC20_ABI, provider);
  const stakingContract = new Contract(
    contracts.staking,
    STAKING_VAULT_ABI,
    provider
  );

  const [
    totalAssets,
    totalShares,
    exchangeRate,
    userAssetBalance,
    userShareBalance,
    userStakedBalance,
  ] = await Promise.all([
    stakingContract.totalAssets().catch(() => BigInt(0)),
    stakingContract.totalShares().catch(() => BigInt(0)),
    stakingContract.exchangeRate().catch(() => ethers.parseEther("1")),
    assetContract.balanceOf(userAddress).catch(() => BigInt(0)),
    shareContract.balanceOf(userAddress).catch(() => BigInt(0)),
    stakingContract.stakedBalance(userAddress).catch(() => BigInt(0)),
  ]);

  return {
    totalAssets: ethers.formatEther(totalAssets),
    totalShares: ethers.formatEther(totalShares),
    exchangeRate: ethers.formatEther(exchangeRate),
    userAssetBalance: ethers.formatEther(userAssetBalance),
    userShareBalance: ethers.formatEther(userShareBalance),
    userStakedBalance: ethers.formatEther(userStakedBalance),
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

  // Then deposit
  const stakingContract = new Contract(
    stakingAddress,
    STAKING_VAULT_ABI,
    signer
  );
  const depositTx = await stakingContract.deposit(parsedAmount);
  const receipt = await depositTx.wait();

  // Parse the Deposit event to get shares minted
  let sharesMinted = amount; // fallback
  for (const log of receipt.logs) {
    try {
      const parsed = stakingContract.interface.parseLog({
        topics: [...log.topics],
        data: log.data,
      });
      if (parsed?.name === "Deposit") {
        sharesMinted = ethers.formatEther(parsed.args.shares);
      }
    } catch {
      // not our event
    }
  }

  return { txHash: depositTx.hash, shares: sharesMinted };
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
  const tx = await stakingContract.withdraw(parsedShares);
  const receipt = await tx.wait();

  // Parse the Withdraw event to get assets returned
  let assetsReturned = amount; // fallback
  for (const log of receipt.logs) {
    try {
      const parsed = stakingContract.interface.parseLog({
        topics: [...log.topics],
        data: log.data,
      });
      if (parsed?.name === "Withdraw") {
        assetsReturned = ethers.formatEther(parsed.args.assets);
      }
    } catch {
      // not our event
    }
  }

  return { txHash: tx.hash, assets: assetsReturned };
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
export { HOODI_CHAIN_ID, HOODI_EXPLORER } from "./abis";
