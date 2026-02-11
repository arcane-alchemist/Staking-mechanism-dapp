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
  type StakingState,
  loadState,
  saveState,
  getDefaultState,
  deployContracts,
  previewDeposit as calcPreviewDeposit,
  previewWithdraw as calcPreviewWithdraw,
} from "@/lib/staking-store";
import { Toaster, toast } from "sonner";

export function StakingDashboard() {
  const [state, setState] = useState<StakingState>(getDefaultState());
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (state.isDeployed) {
      saveState(state);
    }
  }, [state]);

  const handleConnect = useCallback(() => {
    // Simulated wallet connection
    const chars = "0123456789abcdef";
    let addr = "0x";
    for (let i = 0; i < 40; i++) {
      addr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setWalletAddress(addr);
    toast.success("Wallet connected successfully");
  }, []);

  const handleDisconnect = useCallback(() => {
    setWalletAddress(null);
    toast.info("Wallet disconnected");
  }, []);

  const handleDeploy = useCallback(async (config: DeployConfig) => {
    setIsDeploying(true);
    setDeployStep(0);

    // Simulate deployment steps
    for (let i = 0; i < 4; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDeployStep(i + 1);
    }

    const contracts = deployContracts();

    setState((prev) => ({
      ...prev,
      isDeployed: true,
      contracts,
      assetName: config.assetName,
      assetSymbol: config.assetSymbol,
      shareName: config.shareName,
      shareSymbol: config.shareSymbol,
    }));

    setIsDeploying(false);
    toast.success("Staking mechanism deployed successfully!");
  }, []);

  const handleStake = useCallback(
    async (amount: string) => {
      const num = Number.parseFloat(amount);
      if (Number.isNaN(num) || num <= 0) return;
      if (num > state.userAssetBalance) {
        toast.error("Insufficient balance");
        return;
      }

      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const sharesToMint = num * state.exchangeRate;

      setState((prev) => ({
        ...prev,
        totalStaked: prev.totalStaked + num,
        totalShares: prev.totalShares + sharesToMint,
        userAssetBalance: prev.userAssetBalance - num,
        userShareBalance: prev.userShareBalance + sharesToMint,
      }));

      setActivities((prev) => [
        {
          id: Date.now().toString(),
          type: "stake",
          amount: num.toFixed(2),
          symbol: state.assetSymbol,
          shares: sharesToMint.toFixed(2),
          shareSymbol: state.shareSymbol,
          timestamp: new Date(),
        },
        ...prev,
      ]);

      setIsProcessing(false);
      toast.success(`Staked ${num.toFixed(2)} ${state.assetSymbol}`);
    },
    [state]
  );

  const handleUnstake = useCallback(
    async (amount: string) => {
      const num = Number.parseFloat(amount);
      if (Number.isNaN(num) || num <= 0) return;
      if (num > state.userShareBalance) {
        toast.error("Insufficient share balance");
        return;
      }

      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const assetsToReturn = num / state.exchangeRate;

      setState((prev) => ({
        ...prev,
        totalStaked: prev.totalStaked - assetsToReturn,
        totalShares: prev.totalShares - num,
        userAssetBalance: prev.userAssetBalance + assetsToReturn,
        userShareBalance: prev.userShareBalance - num,
      }));

      setActivities((prev) => [
        {
          id: Date.now().toString(),
          type: "unstake",
          amount: assetsToReturn.toFixed(2),
          symbol: state.assetSymbol,
          shares: num.toFixed(2),
          shareSymbol: state.shareSymbol,
          timestamp: new Date(),
        },
        ...prev,
      ]);

      setIsProcessing(false);
      toast.success(`Unstaked ${num.toFixed(2)} ${state.shareSymbol}`);
    },
    [state]
  );

  const contractsList = state.contracts
    ? [
        {
          label: `${state.assetName} Token`,
          address: state.contracts.asset,
          type: "ERC20",
        },
        {
          label: `${state.shareName} Token`,
          address: state.contracts.share,
          type: "ERC20",
        },
        {
          label: "Staking Vault",
          address: state.contracts.staking,
          type: "Vault",
        },
      ]
    : [];

  const previewDepositFn = (amount: string): string => {
    const num = Number.parseFloat(amount);
    if (Number.isNaN(num)) return "0";
    return calcPreviewDeposit(num, state.exchangeRate).toFixed(4);
  };

  const previewWithdrawFn = (amount: string): string => {
    const num = Number.parseFloat(amount);
    if (Number.isNaN(num)) return "0";
    return calcPreviewWithdraw(num, state.exchangeRate).toFixed(4);
  };

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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
              Stake Tokens.{" "}
              <span className="text-primary">Earn Rewards.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg leading-relaxed">
              Deploy your own ERC20 staking vault with automatic share minting.
              Deposit assets, receive shares, and grow your position over time.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">
                  ERC20 Compatible
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">
                  OpenZeppelin Based
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">
                  IPFS Metadata
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsCards
          totalStaked={`${state.totalStaked.toLocaleString()} ${state.assetSymbol}`}
          totalShares={`${state.totalShares.toLocaleString()} ${state.shareSymbol}`}
          exchangeRate={`${state.exchangeRate.toFixed(4)}`}
          isDeployed={state.isDeployed}
        />

        {/* Deploy */}
        <DeployPanel
          isDeployed={state.isDeployed}
          onDeploy={handleDeploy}
          isDeploying={isDeploying}
          deployStep={deployStep}
        />

        {/* Stake/Unstake + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StakePanel
              isDeployed={state.isDeployed}
              assetSymbol={state.assetSymbol}
              shareSymbol={state.shareSymbol}
              assetBalance={state.userAssetBalance.toFixed(2)}
              shareBalance={state.userShareBalance.toFixed(2)}
              exchangeRate={state.exchangeRate.toFixed(4)}
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
              isDeployed={state.isDeployed}
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
              Built with OpenZeppelin
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
