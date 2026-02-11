"use client";

import { useState } from "react";
import {
  Hexagon,
  Wallet,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getExplorerUrl } from "@/lib/contracts/web3";

interface HeaderProps {
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function Header({
  walletAddress,
  onConnect,
  onDisconnect,
}: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const shortenAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Hexagon className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">SV</span>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            StakeVault
          </h1>
          <p className="text-xs text-muted-foreground">
            Holesky Testnet
          </p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <a
          href="#deploy"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Deploy
        </a>
        <a
          href="#stake"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Stake
        </a>
        <a
          href="#contracts"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Contracts
        </a>
      </nav>

      <div className="flex items-center gap-3">
        {/* Network Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Holesky
          </span>
        </div>

        {walletAddress ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-primary/30 text-foreground hover:border-primary/60 hover:bg-secondary bg-transparent"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono text-sm">
                  {shortenAddress(walletAddress)}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card border-border"
            >
              <DropdownMenuItem
                onClick={copyAddress}
                className="gap-2 text-foreground focus:bg-secondary focus:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Address"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    getExplorerUrl(walletAddress, "address"),
                    "_blank"
                  )
                }
                className="gap-2 text-foreground focus:bg-secondary focus:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                View on Etherscan
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={onDisconnect}
                className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={onConnect}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
