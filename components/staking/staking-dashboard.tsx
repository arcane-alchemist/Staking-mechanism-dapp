"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "./header";
import { StatsCards } from "./stats-cards";
import { DeployPanel } from "./deploy-panel";
import type { DeployConfig } from "./deploy-panel";
import { StakePanel } from "./stake-panel";
import { ContractsPanel } from "./contracts-panel";
import { ActivityPanel } from "./activity-panel";
import type { ActivityItem } from "./activity-panel";
import {
  connectWallet,
  getConnectedAddress,
  stakeTokens,
  unstakeTokens,
  fetchOnChainState,
  loadContractData,
  saveContractData,
  deployERC20,
  deployStakingVault,
  type DeployedContracts,
  type SavedContractData,
  HOODI_CHAIN_ID,
} from "@/lib/contracts/web3";
import { Toaster, toast } from "sonner";

export function StakingDashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isDeployed, setIsDeployed] = useState(false);
  const [contracts, setContracts] = useState<DeployedContracts | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // On-chain state
  const [totalStaked, setTotalStaked] = useState("0");
  const [totalShares, setTotalShares] = useState("0");
  const [exchangeRate, setExchangeRate] = useState("1.0000");
  const [userAssetBalance, setUserAssetBalance] = useState("0.00");
  const [userShareBalance, setUserShareBalance] = useState("0.00");

  // Token info
  const [assetSymbol, setAssetSymbol] = useState("USDNTL");
  const [shareSymbol, setShareSymbol] = useState("sUSDNTL");

  // Check for existing wallet connection + saved contracts
  useEffect(() => {
    async function init() {
      const addr = await getConnectedAddress();
      if (addr) {
        setWalletAddress(addr);
      }

      const saved = loadContractData();
      if (saved && saved.chainId === HOODI_CHAIN_ID) {
        setIsDeployed(true);
        setContracts(saved.contracts);
        setAssetSymbol(saved.assetSymbol);
        setShareSymbol(saved.shareSymbol);
      }
    }
    init();
  }, []);

  // Listen for MetaMask account/chain changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        setWalletAddress(null);
      } else {
        setWalletAddress(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  // Fetch on-chain state when wallet + contracts are available
  const refreshOnChainState = useCallback(async () => {
    if (!walletAddress || !contracts) return;
    try {
      const state = await fetchOnChainState(contracts, walletAddress);
      setTotalStaked(state.totalAssets);
      setTotalShares(state.totalShares);
      setExchangeRate(state.exchangeRate);
      setUserAssetBalance(state.userAssetBalance);
      setUserShareBalance(state.userShareBalance);
    } catch (err) {
      console.log("[v0] Failed to fetch on-chain state:", err);
    }
  }, [walletAddress, contracts]);

  useEffect(() => {
    refreshOnChainState();
  }, [refreshOnChainState]);

  // ---- Wallet ----

  const handleConnect = useCallback(async () => {
    try {
      const addr = await connectWallet();
      setWalletAddress(addr);
      toast.success("Wallet connected on Holesky Testnet");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Failed to connect wallet");
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setWalletAddress(null);
    toast.info("Wallet disconnected");
  }, []);

  // ---- Deploy ----

  const handleDeploy = useCallback(
    async (config: DeployConfig) => {
      if (!walletAddress) {
        toast.error("Connect your wallet first");
        return;
      }

      setIsDeploying(true);
      setDeployStep(0);

      try {
        // Step 1: Deploy Asset ERC20
        toast.info("Deploying Asset Token... Confirm in MetaMask");
        const assetAddress = await deployERC20(
          config.assetName,
          config.assetSymbol
        );
        setDeployStep(1);
        toast.success(`Asset Token deployed: ${assetAddress.slice(0, 10)}...`);

        // Step 2: Deploy Share ERC20
        toast.info("Deploying Share Token... Confirm in MetaMask");
        const shareAddress = await deployERC20(
          config.shareName,
          config.shareSymbol
        );
        setDeployStep(2);
        toast.success(`Share Token deployed: ${shareAddress.slice(0, 10)}...`);

        // Step 3: Deploy Staking Vault
        toast.info("Deploying Staking Vault... Confirm in MetaMask");
        const stakingAddress = await deployStakingVault(
          assetAddress,
          shareAddress,
          {
            name: config.metadataName,
            description: config.metadataDescription,
            author: config.metadataAuthor,
          }
        );
        setDeployStep(3);
        toast.success(
          `Staking Vault deployed: ${stakingAddress.slice(0, 10)}...`
        );

        // Step 4: Save to localStorage
        const deployedContracts: DeployedContracts = {
          asset: assetAddress,
          share: shareAddress,
          staking: stakingAddress,
        };

        const savedData: SavedContractData = {
          contracts: deployedContracts,
          assetName: config.assetName,
          assetSymbol: config.assetSymbol,
          shareName: config.shareName,
          shareSymbol: config.shareSymbol,
          metadata: {
            name: config.metadataName,
            description: config.metadataDescription,
            author: config.metadataAuthor,
          },
          deployedAt: new Date().toISOString(),
          chainId: HOODI_CHAIN_ID,
        };

        saveContractData(savedData);
        setDeployStep(4);

        setContracts(deployedContracts);
        setAssetSymbol(config.assetSymbol);
        setShareSymbol(config.shareSymbol);
        setIsDeployed(true);
        setIsDeploying(false);

        toast.success("All contracts deployed successfully on Holesky!");

        // Refresh on-chain state
        setTimeout(() => refreshOnChainState(), 2000);
      } catch (err: unknown) {
        const error = err as Error;
        console.log("[v0] Deploy error:", error);
        setIsDeploying(false);
        toast.error(`Deployment failed: ${error.message}`);
      }
    },
    [walletAddress, refreshOnChainState]
  );

  // ---- Stake ----

  const handleStake = useCallback(
    async (amount: string) => {
      if (!walletAddress || !contracts) {
        toast.error("Connect wallet and deploy contracts first");
        return;
      }

      const num = Number.parseFloat(amount);
      if (Number.isNaN(num) || num <= 0) {
        toast.error("Enter a valid amount");
        return;
      }

      setIsProcessing(true);
      try {
        toast.info("Approving tokens... Confirm in MetaMask");
        toast.info("Depositing tokens... Confirm in MetaMask");

        const { txHash, shares } = await stakeTokens(
          contracts.staking,
          contracts.asset,
          amount
        );

        setActivities((prev) => [
          {
            id: txHash,
            type: "stake",
            amount: num.toFixed(4),
            symbol: assetSymbol,
            shares: shares,
            shareSymbol: shareSymbol,
            timestamp: new Date(),
            txHash,
          },
          ...prev,
        ]);

        toast.success(`Staked ${num.toFixed(4)} ${assetSymbol}`);

        // Refresh balances
        await refreshOnChainState();
      } catch (err: unknown) {
        const error = err as Error;
        console.log("[v0] Stake error:", error);
        toast.error(`Staking failed: ${error.message}`);
      } finally {
        setIsProcessing(false);
      }
    },
    [walletAddress, contracts, assetSymbol, shareSymbol, refreshOnChainState]
  );

  // ---- Unstake ----

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (!walletAddress || !contracts) {
        toast.error("Connect wallet and deploy contracts first");
        return;
      }

      const num = Number.parseFloat(amount);
      if (Number.isNaN(num) || num <= 0) {
        toast.error("Enter a valid amount");
        return;
      }

      setIsProcessing(true);
      try {
        toast.info("Withdrawing tokens... Confirm in MetaMask");

        const { txHash, assets } = await unstakeTokens(
          contracts.staking,
          amount
        );

        setActivities((prev) => [
          {
            id: txHash,
            type: "unstake",
            amount: assets,
            symbol: assetSymbol,
            shares: num.toFixed(4),
            shareSymbol: shareSymbol,
            timestamp: new Date(),
            txHash,
          },
          ...prev,
        ]);

        toast.success(`Unstaked ${num.toFixed(4)} ${shareSymbol}`);

        // Refresh balances
        await refreshOnChainState();
      } catch (err: unknown) {
        const error = err as Error;
        console.log("[v0] Unstake error:", error);
        toast.error(`Unstaking failed: ${error.message}`);
      } finally {
        setIsProcessing(false);
      }
    },
    [walletAddress, contracts, assetSymbol, shareSymbol, refreshOnChainState]
  );

  // ---- Preview Functions (on-chain) ----

  const previewDepositFn = (amount: string): string => {
    const num = Number.parseFloat(amount);
    if (Number.isNaN(num)) return "0";
    // Use local exchange rate for instant preview, on-chain for accuracy
    const rate = Number.parseFloat(exchangeRate);
    return (num * (rate || 1)).toFixed(4);
  };

  const previewWithdrawFn = (amount: string): string => {
    const num = Number.parseFloat(amount);
    if (Number.isNaN(num)) return "0";
    const rate = Number.parseFloat(exchangeRate);
    if (rate === 0) return "0";
    return (num / rate).toFixed(4);
  };

  // ---- Contract list for display ----

  const contractsList = contracts
    ? [
        {
          label: `${assetSymbol} Token`,
          address: contracts.asset,
          type: "ERC20",
        },
        {
          label: `${shareSymbol} Token`,
          address: contracts.share,
          type: "ERC20",
        },
        {
          label: "Staking Vault",
          address: contracts.staking,
          type: "Vault",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "hsl(220 18% 9%)",
            border: "1px solid hsl(220 14% 18%)",
            color: "hsl(210 20% 95%)",
          },
        }}
      />

      <Header
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary">
                  Holesky Testnet
                </span>
              </div>
              {walletAddress && (
                <div className="px-3 py-1 rounded-full bg-chart-2/10 border border-chart-2/20">
                  <span className="text-xs font-medium text-chart-2">
                    Connected
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
              Stake Tokens.{" "}
              <span className="text-primary">Earn Rewards.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg leading-relaxed">
              Deploy your own ERC20 staking vault on Ethereum Holesky testnet.
              Deposit assets, receive shares, and grow your position over time.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">ERC20 Compatible</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">OpenZeppelin Based</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">IPFS Metadata</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsCards
          totalStaked={`${Number.parseFloat(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${assetSymbol}`}
          totalShares={`${Number.parseFloat(totalShares).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${shareSymbol}`}
          exchangeRate={exchangeRate}
          isDeployed={isDeployed}
        />

        {/* Deploy */}
        <DeployPanel
          isDeployed={isDeployed}
          onDeploy={handleDeploy}
          isDeploying={isDeploying}
          deployStep={deployStep}
        />

        {/* Stake/Unstake + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StakePanel
              isDeployed={isDeployed}
              assetSymbol={assetSymbol}
              shareSymbol={shareSymbol}
              assetBalance={Number.parseFloat(userAssetBalance).toFixed(4)}
              shareBalance={Number.parseFloat(userShareBalance).toFixed(4)}
              exchangeRate={exchangeRate}
              onStake={handleStake}
              onUnstake={handleUnstake}
              isProcessing={isProcessing}
              previewDeposit={previewDepositFn}
              previewWithdraw={previewWithdrawFn}
            />
          </div>
          <div className="space-y-6">
            <ContractsPanel
              contracts={contractsList}
              isDeployed={isDeployed}
            />
            <ActivityPanel activities={activities} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            StakeVault Protocol - ERC20 Staking Mechanism
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Holesky Testnet (Chain ID: 17000)
            </span>
            <span className="text-xs text-muted-foreground">
              Powered by Ethereum
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
