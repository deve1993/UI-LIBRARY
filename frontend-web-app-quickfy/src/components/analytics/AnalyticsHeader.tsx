"use client";

import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./DateRangePicker";
import { CountryFilter } from "./CountryFilter";
import type { DateRange, ComparisonPeriod } from "@/types";

interface AnalyticsHeaderProps {
  dateRange: DateRange;
  comparisonPeriod?: ComparisonPeriod;
  selectedCountry: string;
  onDateRangeChange: (range: DateRange) => void;
  onComparisonPeriodChange?: (period: ComparisonPeriod) => void;
  onCountryChange: (country: string) => void;
  onExport: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date;
}

export function AnalyticsHeader({
  dateRange,
  comparisonPeriod,
  selectedCountry,
  onDateRangeChange,
  onComparisonPeriodChange,
  onCountryChange,
  onExport,
  onRefresh,
  isRefreshing = false,
  lastUpdated,
}: AnalyticsHeaderProps) {
  const formatLastUpdated = () => {
    if (!lastUpdated) return "";

    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);

    if (diff < 60) return "pochi secondi fa";
    if (diff < 3600) return `${Math.floor(diff / 60)} minuti fa`;
    return lastUpdated.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 w-full sm:w-auto">
        <DateRangePicker
          dateRange={dateRange}
          comparisonPeriod={comparisonPeriod}
          onDateRangeChange={onDateRangeChange}
          onComparisonPeriodChange={onComparisonPeriodChange}
          showComparison
        />

        <CountryFilter
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        {lastUpdated && (
          <span className="text-xs text-muted-foreground hidden md:inline">
            Aggiornato {formatLastUpdated()}
          </span>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Aggiorna</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Esporta</span>
        </Button>
      </div>
    </div>
  );
}
