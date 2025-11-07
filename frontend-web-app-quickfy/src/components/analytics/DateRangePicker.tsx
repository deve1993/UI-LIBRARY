"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, subMonths } from "date-fns";
import { it } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { DateRange, DateRangePreset, ComparisonPeriod } from "@/types";

interface DateRangePickerProps {
  dateRange: DateRange;
  comparisonPeriod?: ComparisonPeriod;
  onDateRangeChange: (range: DateRange) => void;
  onComparisonPeriodChange?: (period: ComparisonPeriod) => void;
  showComparison?: boolean;
}

const presets: { label: string; value: DateRangePreset }[] = [
  { label: "Oggi", value: "today" },
  { label: "Ieri", value: "yesterday" },
  { label: "Ultimi 7 giorni", value: "last_7_days" },
  { label: "Ultimi 30 giorni", value: "last_30_days" },
  { label: "Questo mese", value: "this_month" },
  { label: "Mese scorso", value: "last_month" },
  { label: "Questo trimestre", value: "this_quarter" },
];

function getDateRangeFromPreset(preset: DateRangePreset): { start: Date; end: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case "today":
      return { start: today, end: today };
    case "yesterday":
      return { start: subDays(today, 1), end: subDays(today, 1) };
    case "last_7_days":
      return { start: subDays(today, 6), end: today };
    case "last_30_days":
      return { start: subDays(today, 29), end: today };
    case "this_month":
      return { start: startOfMonth(today), end: endOfMonth(today) };
    case "last_month": {
      const lastMonth = subMonths(today, 1);
      return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
    }
    case "this_quarter":
      return { start: startOfQuarter(today), end: endOfQuarter(today) };
    default:
      return { start: subDays(today, 29), end: today };
  }
}

function getComparisonPeriod(currentRange: { start: Date; end: Date }): { start: Date; end: Date } {
  const duration = currentRange.end.getTime() - currentRange.start.getTime();
  const comparisonEnd = new Date(currentRange.start.getTime() - 24 * 60 * 60 * 1000); // 1 day before start
  const comparisonStart = new Date(comparisonEnd.getTime() - duration);
  return { start: comparisonStart, end: comparisonEnd };
}

export function DateRangePicker({
  dateRange,
  comparisonPeriod,
  onDateRangeChange,
  onComparisonPeriodChange,
  showComparison = true,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>(
    dateRange.preset || "last_30_days"
  );
  const [compareEnabled, setCompareEnabled] = useState(comparisonPeriod?.enabled || false);

  const handlePresetSelect = (preset: DateRangePreset) => {
    setSelectedPreset(preset);
    const { start, end } = getDateRangeFromPreset(preset);

    const newRange: DateRange = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      preset,
    };

    onDateRangeChange(newRange);

    if (showComparison && onComparisonPeriodChange && compareEnabled) {
      const comparisonDates = getComparisonPeriod({ start, end });
      onComparisonPeriodChange({
        startDate: comparisonDates.start.toISOString(),
        endDate: comparisonDates.end.toISOString(),
        enabled: true,
      });
    }
  };

  const handleComparisonToggle = (checked: boolean) => {
    setCompareEnabled(checked);

    if (onComparisonPeriodChange) {
      if (checked) {
        const currentStart = new Date(dateRange.startDate);
        const currentEnd = new Date(dateRange.endDate);
        const comparisonDates = getComparisonPeriod({ start: currentStart, end: currentEnd });

        onComparisonPeriodChange({
          startDate: comparisonDates.start.toISOString(),
          endDate: comparisonDates.end.toISOString(),
          enabled: true,
        });
      } else {
        onComparisonPeriodChange({
          startDate: "",
          endDate: "",
          enabled: false,
        });
      }
    }
  };

  useEffect(() => {
    if (dateRange.preset) {
      setSelectedPreset(dateRange.preset);
    }
  }, [dateRange.preset]);

  const formatDateRange = () => {
    try {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);

      if (start.toDateString() === end.toDateString()) {
        return format(start, "d MMM yyyy", { locale: it });
      }

      return `${format(start, "d MMM", { locale: it })} - ${format(end, "d MMM yyyy", { locale: it })}`;
    } catch {
      return "Seleziona periodo";
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium mb-3 text-sm">Seleziona Periodo</h4>
            <div className="grid gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  variant={selectedPreset === preset.value ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => handlePresetSelect(preset.value)}
                >
                  {selectedPreset === preset.value && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {showComparison && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="compare"
                    checked={compareEnabled}
                    onCheckedChange={handleComparisonToggle}
                  />
                  <Label
                    htmlFor="compare"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Confronta con periodo precedente
                  </Label>
                </div>
                {compareEnabled && comparisonPeriod && comparisonPeriod.enabled && (
                  <p className="text-xs text-muted-foreground pl-6">
                    {format(new Date(comparisonPeriod.startDate), "d MMM", { locale: it })} -{" "}
                    {format(new Date(comparisonPeriod.endDate), "d MMM yyyy", { locale: it })}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
