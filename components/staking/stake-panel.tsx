"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  Loader2,
  ArrowDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StakePanelProps {
  isDeployed: boolean;
  assetSymbol: string;
  shareSymbol: string;
  assetBalance: string;
  shareBalance: string;
  exchangeRate: string;
  onStake: (amount: string) => void;
  onUnstake: (amount: string) => void;
  isProcessing: boolean;
  previewDeposit: (amount: string) => string;
  previewWithdraw: (amount: string) => string;
}

export function StakePanel({
  isDeployed,
  assetSymbol,
  shareSymbol,
  assetBalance,
  shareBalance,
  exchangeRate,
  onStake,
  onUnstake,
  isProcessing,
  previewDeposit,
  previewWithdraw,
}: StakePanelProps) {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("stake");

  // Ensure amount string is never negative (for inputs and submit)
  const clampNonNegative = (value: string): string => {
    if (value === "" || value === "-") return value === "-" ? "0" : value;
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num < 0) return "0";
    return value;
  };

  const stakePreview = stakeAmount ? previewDeposit(stakeAmount) : "0";
  const unstakePreview = unstakeAmount ? previewWithdraw(unstakeAmount) : "0";

  return (
    <Card className="bg-card border-border" id="stake">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ArrowDownUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">Stake & Unstake</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your staking position
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isDeployed ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-secondary mb-4">
              <ArrowDownUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Deploy First
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Deploy your staking contracts before you can stake or unstake tokens.
            </p>
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-2 bg-secondary h-11">
              <TabsTrigger
                value="stake"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-medium"
              >
                Stake
              </TabsTrigger>
              <TabsTrigger
                value="unstake"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-medium"
              >
                Unstake
              </TabsTrigger>
            </TabsList>

            {/* Stake Tab */}
            <TabsContent value="stake" className="space-y-4 mt-4">
              <div className="space-y-3">
                {/* From */}
                <div className="rounded-xl bg-secondary p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      You Deposit
                    </span>
                    <button
                      type="button"
                      onClick={() => setStakeAmount(assetBalance)}
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Balance: {assetBalance} {assetSymbol}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min={0}
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(clampNonNegative(e.target.value))}
                      placeholder="0.00"
                      className="border-0 bg-transparent text-2xl font-bold text-foreground placeholder:text-muted-foreground/40 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border shrink-0">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {assetSymbol.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {assetSymbol}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1 relative z-10">
                  <div className="p-2 rounded-lg bg-card border border-border">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* To */}
                <div className="rounded-xl bg-secondary p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      You Receive
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Balance: {shareBalance} {shareSymbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-foreground min-h-[36px]">
                      {stakePreview || "0.00"}
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border shrink-0 ml-auto">
                      <div className="h-5 w-5 rounded-full bg-chart-2/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-chart-2">
                          {shareSymbol.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {shareSymbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Info */}
              <div className="flex items-center justify-between px-1 py-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    Exchange Rate
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border-border text-popover-foreground">
                        <p>Rate at which assets convert to shares</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-xs font-mono text-foreground">
                  1 {assetSymbol} = {exchangeRate} {shareSymbol}
                </span>
              </div>

              <Button
                onClick={() => onStake(clampNonNegative(stakeAmount) || "0")}
                disabled={isProcessing || !stakeAmount || Number(stakeAmount) <= 0}
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Staking...
                  </>
                ) : (
                  "Stake"
                )}
              </Button>
            </TabsContent>

            {/* Unstake Tab */}
            <TabsContent value="unstake" className="space-y-4 mt-4">
              <div className="space-y-3">
                {/* From */}
                <div className="rounded-xl bg-secondary p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      You Burn
                    </span>
                    <button
                      type="button"
                      onClick={() => setUnstakeAmount(shareBalance)}
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Balance: {shareBalance} {shareSymbol}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min={0}
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(clampNonNegative(e.target.value))}
                      placeholder="0.00"
                      className="border-0 bg-transparent text-2xl font-bold text-foreground placeholder:text-muted-foreground/40 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border shrink-0">
                      <div className="h-5 w-5 rounded-full bg-chart-2/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-chart-2">
                          {shareSymbol.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {shareSymbol}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1 relative z-10">
                  <div className="p-2 rounded-lg bg-card border border-border">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* To */}
                <div className="rounded-xl bg-secondary p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      You Receive
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Balance: {assetBalance} {assetSymbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-foreground min-h-[36px]">
                      {unstakePreview || "0.00"}
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border shrink-0 ml-auto">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {assetSymbol.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {assetSymbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Info */}
              <div className="flex items-center justify-between px-1 py-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    Exchange Rate
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover border-border text-popover-foreground">
                        <p>Rate at which shares convert to assets</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-xs font-mono text-foreground">
                  1 {shareSymbol} = {exchangeRate} {assetSymbol}
                </span>
              </div>

              <Button
                onClick={() => onUnstake(clampNonNegative(unstakeAmount) || "0")}
                disabled={
                  isProcessing || !unstakeAmount || Number(unstakeAmount) <= 0
                }
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Unstaking...
                  </>
                ) : (
                  "Unstake"
                )}
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
