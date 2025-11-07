"use client";

import { RefreshCw, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { PlatformFilter } from "./PlatformFilter";
import { StatusFilter } from "./StatusFilter";
import type { DateRange, ComparisonPeriod, AdPlatform, CampaignStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

interface CampaignsHeaderProps {
  dateRange: DateRange;
  comparisonPeriod?: ComparisonPeriod;
  selectedPlatform: AdPlatform | "all";
  selectedStatus: CampaignStatus | "all";
  onDateRangeChange: (range: DateRange) => void;
  onComparisonPeriodChange: (period: ComparisonPeriod) => void;
  onPlatformChange: (platform: AdPlatform | "all") => void;
  onStatusChange: (status: CampaignStatus | "all") => void;
  onExport: () => void;
  onRefresh: () => void;
  onCreateCampaign?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date;
}

export function CampaignsHeader({
  dateRange,
  comparisonPeriod,
  selectedPlatform,
  selectedStatus,
  onDateRangeChange,
  onComparisonPeriodChange,
  onPlatformChange,
  onStatusChange,
  onExport,
  onRefresh,
  onCreateCampaign,
  isRefreshing = false,
  lastUpdated,
}: CampaignsHeaderProps) {
  const lastUpdatedText = lastUpdated
    ? formatDistanceToNow(lastUpdated, { addSuffix: true, locale: it })
    : "";

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <DateRangePicker
            dateRange={dateRange}
            comparisonPeriod={comparisonPeriod}
            onDateRangeChange={onDateRangeChange}
            onComparisonPeriodChange={onComparisonPeriodChange}
          />
          <PlatformFilter
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
          />
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />
        </div>

        <div className="flex gap-2">
          {onCreateCampaign && (
            <Button onClick={onCreateCampaign} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Crea Campagna</span>
              <span className="sm:hidden">Crea</span>
            </Button>
          )}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {lastUpdatedText && <>Ultimo aggiornamento: {lastUpdatedText}</>}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Aggiorna
          </Button>
          <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Esporta</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
