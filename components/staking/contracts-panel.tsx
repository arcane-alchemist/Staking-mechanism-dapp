"use client";

import { useState } from "react";
import { FileCode2, Copy, Check, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getExplorerUrl } from "@/lib/contracts/web3";

interface ContractInfo {
  label: string;
  address: string;
  type: string;
}

interface ContractsPanelProps {
  contracts: ContractInfo[];
  isDeployed: boolean;
}

function ContractRow({ contract }: { contract: ContractInfo }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(contract.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 10)}...${addr.slice(-8)}`;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <FileCode2 className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {contract.label}
            </span>
            <Badge
              variant="secondary"
              className="bg-secondary text-muted-foreground border-border text-[10px] px-1.5"
            >
              {contract.type}
            </Badge>
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">
            {shortenAddress(contract.address)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={copyAddress}
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover border-border text-popover-foreground">
              <p>{copied ? "Copied!" : "Copy address"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={getExplorerUrl(contract.address, "address")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-popover border-border text-popover-foreground">
              <p>View on Hoodi Explorer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export function ContractsPanel({ contracts, isDeployed }: ContractsPanelProps) {
  return (
    <Card className="bg-card border-border" id="contracts">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileCode2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">
              Deployed Contracts
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Ethereum Hoodi
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isDeployed ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-secondary mb-4">
              <FileCode2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No Contracts Yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Deploy your staking mechanism to see contract addresses here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {contracts.map((contract) => (
              <ContractRow key={contract.address} contract={contract} />
            ))}

            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-muted-foreground">
                Contract addresses and ABIs are stored in localStorage. These
                addresses are deployed on Ethereum Hoodi (Chain ID: 560048) and
                can be verified on{" "}
                <a
                  href="https://light-hoodi.beaconcha.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  light-hoodi.beaconcha.in
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
