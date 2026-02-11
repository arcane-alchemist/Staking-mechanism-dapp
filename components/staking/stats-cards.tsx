"use client";

import { Coins, TrendingUp, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalStaked: string;
  totalShares: string;
  exchangeRate: string;
  isDeployed: boolean;
}

const stats = [
  {
    key: "tvl",
    label: "Total Value Locked",
    icon: Coins,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "shares",
    label: "Total Shares Minted",
    icon: TrendingUp,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    key: "rate",
    label: "Exchange Rate",
    icon: Users,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    key: "status",
    label: "Protocol Status",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
] as const;

export function StatsCards({
  totalStaked,
  totalShares,
  exchangeRate,
  isDeployed,
}: StatsCardsProps) {
  const values: Record<string, string> = {
    tvl: totalStaked,
    shares: totalShares,
    rate: exchangeRate,
    status: isDeployed ? "Active" : "Not Deployed",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.key}
          className="bg-card border-border hover:border-primary/20 transition-colors"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">
              {values[stat.key]}
            </p>
            {stat.key === "status" && (
              <div className="flex items-center gap-1.5 mt-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    isDeployed ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isDeployed ? "Contracts deployed" : "Awaiting deployment"}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
