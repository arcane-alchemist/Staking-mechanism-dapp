"use client";

import { useState } from "react";
import {
  Rocket,
  CheckCircle2,
  Circle,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeployPanelProps {
  isDeployed: boolean;
  onDeploy: (config: DeployConfig) => void;
  isDeploying: boolean;
  deployStep: number;
}

export interface DeployConfig {
  assetName: string;
  assetSymbol: string;
  shareName: string;
  shareSymbol: string;
  metadataName: string;
  metadataDescription: string;
  metadataAuthor: string;
}

const deploySteps = [
  { label: "Deploy Asset Token (ERC20)", description: "Creates the underlying staking asset" },
  { label: "Deploy Share Token (ERC20)", description: "Creates the staking shares token" },
  { label: "Deploy Staking Contract", description: "Deploys the main staking vault" },
  { label: "Configure & Verify", description: "Sets metadata and verifies contracts" },
];

export function DeployPanel({
  isDeployed,
  onDeploy,
  isDeploying,
  deployStep,
}: DeployPanelProps) {
  const [config, setConfig] = useState<DeployConfig>({
    assetName: "USDNTL",
    assetSymbol: "USDNTL",
    shareName: "Staked USDNTL",
    shareSymbol: "sUSDNTL",
    metadataName: "USDNTL Staking Vault",
    metadataDescription: "Stake USDNTL tokens to earn yield",
    metadataAuthor: "",
  });

  const handleChange = (field: keyof DeployConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-card border-border" id="deploy">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">
                Deploy Staking Mechanism
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Deploy asset, share, and staking contracts
              </p>
            </div>
          </div>
          {isDeployed && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Deployed</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Config */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              Asset Token
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover border-border text-popover-foreground">
                    <p>The ERC20 token users will stake</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Token Name
                </Label>
                <Input
                  value={config.assetName}
                  onChange={(e) => handleChange("assetName", e.target.value)}
                  placeholder="e.g. USDNTL"
                  disabled={isDeployed || isDeploying}
                  className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Token Symbol
                </Label>
                <Input
                  value={config.assetSymbol}
                  onChange={(e) => handleChange("assetSymbol", e.target.value)}
                  placeholder="e.g. USDNTL"
                  disabled={isDeployed || isDeploying}
                  className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              Share Token
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover border-border text-popover-foreground">
                    <p>The ERC20 token representing staking shares</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Share Name
                </Label>
                <Input
                  value={config.shareName}
                  onChange={(e) => handleChange("shareName", e.target.value)}
                  placeholder="e.g. Staked USDNTL"
                  disabled={isDeployed || isDeploying}
                  className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Share Symbol
                </Label>
                <Input
                  value={config.shareSymbol}
                  onChange={(e) => handleChange("shareSymbol", e.target.value)}
                  placeholder="e.g. sUSDNTL"
                  disabled={isDeployed || isDeploying}
                  className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-foreground">
            Contract Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input
                value={config.metadataName}
                onChange={(e) =>
                  handleChange("metadataName", e.target.value)
                }
                placeholder="Protocol name"
                disabled={isDeployed || isDeploying}
                className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Description
              </Label>
              <Input
                value={config.metadataDescription}
                onChange={(e) =>
                  handleChange("metadataDescription", e.target.value)
                }
                placeholder="Brief description"
                disabled={isDeployed || isDeploying}
                className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Author</Label>
              <Input
                value={config.metadataAuthor}
                onChange={(e) =>
                  handleChange("metadataAuthor", e.target.value)
                }
                placeholder="Your name or address"
                disabled={isDeployed || isDeploying}
                className="mt-1.5 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Deploy Steps */}
        {(isDeploying || isDeployed) && (
          <div className="space-y-3 p-4 rounded-lg bg-secondary/50 border border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Deployment Progress
            </h4>
            <div className="space-y-2.5">
              {deploySteps.map((step, index) => {
                const isCompleted = deployStep > index;
                const isCurrent = deployStep === index;
                return (
                  <div
                    key={step.label}
                    className="flex items-center gap-3"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <div>
                      <span
                        className={`text-sm ${
                          isCompleted
                            ? "text-foreground"
                            : isCurrent
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isCurrent && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Deploy Button */}
        {!isDeployed && (
          <Button
            onClick={() => onDeploy(config)}
            disabled={isDeploying || !config.assetName || !config.assetSymbol}
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deploying Contracts...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Deploy Staking Mechanism
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
