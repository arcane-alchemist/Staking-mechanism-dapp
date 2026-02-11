"use client";

import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExplorerUrl } from "@/lib/contracts/web3";

export interface ActivityItem {
  id: string;
  type: "stake" | "unstake";
  amount: string;
  symbol: string;
  shares: string;
  shareSymbol: string;
  timestamp: Date;
  txHash?: string;
}

interface ActivityPanelProps {
  activities: ActivityItem[];
}

export function ActivityPanel({ activities }: ActivityPanelProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              On-chain transactions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-secondary mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No Activity
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your staking and unstaking transactions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "stake"
                        ? "bg-primary/10"
                        : "bg-chart-3/10"
                    }`}
                  >
                    {activity.type === "stake" ? (
                      <ArrowDownRight className="h-4 w-4 text-primary" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-chart-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.type === "stake" ? "Staked" : "Unstaked"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.amount} {activity.symbol}{" "}
                      {activity.type === "stake" ? "for" : "from"}{" "}
                      {activity.shares} {activity.shareSymbol}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {activity.txHash && (
                    <a
                      href={getExplorerUrl(activity.txHash, "tx")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View transaction on Etherscan"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
