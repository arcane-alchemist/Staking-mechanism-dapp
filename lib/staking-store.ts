// Simulated staking store for demo purposes
// In production, this would integrate with ethers.js / wagmi / web3.js

export interface ContractAddresses {
  asset: string;
  share: string;
  staking: string;
}

export interface StakingState {
  isDeployed: boolean;
  contracts: ContractAddresses | null;
  assetName: string;
  assetSymbol: string;
  shareName: string;
  shareSymbol: string;
  totalStaked: number;
  totalShares: number;
  userAssetBalance: number;
  userShareBalance: number;
  exchangeRate: number;
}

function generateAddress(): string {
  const chars = "0123456789abcdef";
  let result = "0x";
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const STORAGE_KEY = "stakevault_state";

export function loadState(): StakingState | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return null;
}

export function saveState(state: StakingState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDefaultState(): StakingState {
  return {
    isDeployed: false,
    contracts: null,
    assetName: "USDNTL",
    assetSymbol: "USDNTL",
    shareName: "Staked USDNTL",
    shareSymbol: "sUSDNTL",
    totalStaked: 0,
    totalShares: 0,
    userAssetBalance: 10000,
    userShareBalance: 0,
    exchangeRate: 1,
  };
}

export function deployContracts(): ContractAddresses {
  return {
    asset: generateAddress(),
    share: generateAddress(),
    staking: generateAddress(),
  };
}

export function previewDeposit(
  amount: number,
  exchangeRate: number
): number {
  return amount * exchangeRate;
}

export function previewWithdraw(
  shares: number,
  exchangeRate: number
): number {
  if (exchangeRate === 0) return 0;
  return shares / exchangeRate;
}
