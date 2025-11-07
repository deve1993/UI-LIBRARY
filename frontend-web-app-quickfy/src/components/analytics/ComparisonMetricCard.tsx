"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonMetricCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: LucideIcon;
  format?: "number" | "percent" | "duration" | "currency";
  decimals?: number;
  invertColors?: boolean;
}

export function ComparisonMetricCard({
  title,
  value,
  change,
  icon: Icon,
  format = "number",
  decimals = 0,
  invertColors = false,
}: ComparisonMetricCardProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val;

    switch (format) {
      case "number":
        return val.toLocaleString("it-IT", { maximumFractionDigits: decimals });
      case "percent":
        return `${val.toFixed(decimals)}%`;
      case "duration":
        const minutes = Math.floor(val / 60);
        const seconds = Math.floor(val % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      case "currency":
        return `€${val.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      default:
        return val.toString();
    }
  };

  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  // Determine color based on invertColors prop
  const changeColorClass = invertColors
    ? isPositive
      ? "text-red-600 dark:text-red-400"
      : isNegative
      ? "text-green-600 dark:text-green-400"
      : "text-muted-foreground"
    : isPositive
    ? "text-green-600 dark:text-green-400"
    : isNegative
    ? "text-red-600 dark:text-red-400"
    : "text-muted-foreground";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className="flex items-center gap-1 mt-1">
          {!isNeutral && (
            <>
              {isPositive ? (
                <TrendingUp className={cn("h-4 w-4", changeColorClass)} />
              ) : (
                <TrendingDown className={cn("h-4 w-4", changeColorClass)} />
              )}
            </>
          )}
          <p className={cn("text-xs font-medium", changeColorClass)}>
            {isPositive && "+"}
            {change.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">vs periodo precedente</p>
        </div>
      </CardContent>
    </Card>
  );
}
