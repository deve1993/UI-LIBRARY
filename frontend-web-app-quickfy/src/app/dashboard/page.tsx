"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, Eye, Target } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { subDays } from "date-fns";
import { DashboardSkeleton } from "@/components/skeletons";
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { ComparisonMetricCard } from "@/components/analytics/ComparisonMetricCard";
import { ComparisonLineChart } from "@/components/analytics/ComparisonLineChart";
import { TrafficSourcesTable } from "@/components/analytics/TrafficSourcesTable";
import { LandingPagesTable } from "@/components/analytics/LandingPagesTable";
import { apiClient } from "@/lib/api/client";
import type { DateRange, ComparisonPeriod, AnalyticsOverview } from "@/types";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: subDays(new Date(), 29).toISOString(),
    endDate: new Date().toISOString(),
    preset: "last_30_days",
  });

  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>({
    startDate: subDays(new Date(), 59).toISOString(),
    endDate: subDays(new Date(), 30).toISOString(),
    enabled: true,
  });

  const [selectedCountry, setSelectedCountry] = useState("all");

  // Fetch analytics data
  const fetchAnalytics = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const analyticsData = await apiClient.getAnalyticsOverview(
        dateRange,
        comparisonPeriod.enabled ? comparisonPeriod : undefined,
        selectedCountry !== "all" ? selectedCountry : undefined
      );

      setData(analyticsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Errore nel caricamento analytics:", error);
      toast.error("Errore nel caricamento dei dati analytics");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [dateRange, comparisonPeriod, selectedCountry]);

  // Initial load
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Auto-refresh every 60 seconds (only when tab is visible)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        intervalId = setInterval(() => {
          fetchAnalytics(false);
        }, 60000);
      }
    };

    // Start interval
    intervalId = setInterval(() => {
      fetchAnalytics(false);
    }, 60000);

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchAnalytics]);

  // Export to Excel
  const handleExport = () => {
    if (!data) return;

    try {
      const wb = XLSX.utils.book_new();

      // Overview sheet
      const overviewData = [
        ["Metrica", "Valore", "Variazione %"],
        ["Sessioni", data.metrics.sessions, data.metrics.sessionsChange],
        ["Utenti Attivi", data.metrics.activeUsers, data.metrics.activeUsersChange],
        ["Eventi Chiave", data.metrics.keyEvents, data.metrics.keyEventsChange],
        ["Visualizzazioni Pagine", data.metrics.pageViews, data.metrics.pageViewsChange],
        ["Bounce Rate", `${data.metrics.bounceRate.toFixed(1)}%`, data.metrics.bounceRateChange],
      ];
      const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(wb, wsOverview, "Panoramica");

      // Traffic Sources sheet
      const trafficData = [
        ["Sorgente", "Mezzo", "Sessioni", "Eventi Chiave", "Tasso Conv. %"],
        ...data.trafficSources.map(t => [
          t.source,
          t.medium,
          t.sessions,
          t.keyEvents,
          t.conversionRate,
        ]),
      ];
      const wsTraffic = XLSX.utils.aoa_to_sheet(trafficData);
      XLSX.utils.book_append_sheet(wb, wsTraffic, "Sorgenti Traffico");

      // Landing Pages sheet
      const pagesData = [
        ["Pagina", "Visualizzazioni", "Eventi Chiave", "Bounce Rate %"],
        ...data.landingPages.map(p => [
          p.page,
          p.views,
          p.keyEvents,
          p.bounceRate,
        ]),
      ];
      const wsPages = XLSX.utils.aoa_to_sheet(pagesData);
      XLSX.utils.book_append_sheet(wb, wsPages, "Pagine di Destinazione");

      // Write file
      XLSX.writeFile(wb, `analytics-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Report esportato con successo!");
    } catch (error) {
      console.error("Errore export:", error);
      toast.error("Errore durante l'esportazione");
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Nessun dato disponibile</p>
      </div>
    );
  }

  return (
    <AnimatedPage className="space-y-6">
      {/* Header */}
      <FadeIn direction="down">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard Analytics</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Benvenuto, {user?.name || "Utente"}
            </p>
          </div>

          <AnalyticsHeader
            dateRange={dateRange}
            comparisonPeriod={comparisonPeriod}
            selectedCountry={selectedCountry}
            onDateRangeChange={setDateRange}
            onComparisonPeriodChange={setComparisonPeriod}
            onCountryChange={setSelectedCountry}
            onExport={handleExport}
            onRefresh={() => fetchAnalytics(false)}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
          />
        </div>
      </FadeIn>

      {/* KPI Cards */}
      <StaggerContainer className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
        <StaggerItem>
          <ComparisonMetricCard
            title="Utenti Attivi"
            value={data.metrics.activeUsers}
            change={data.metrics.activeUsersChange}
            icon={Users}
            format="number"
          />
        </StaggerItem>
        <StaggerItem>
          <ComparisonMetricCard
            title="Visualizzazioni Pagine"
            value={data.metrics.pageViews}
            change={data.metrics.pageViewsChange}
            icon={Eye}
            format="number"
          />
        </StaggerItem>
        <StaggerItem>
          <ComparisonMetricCard
            title="Eventi Chiave"
            value={data.metrics.keyEvents}
            change={data.metrics.keyEventsChange}
            icon={Target}
            format="number"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Charts - Layout Misto */}
      <div className="space-y-4">
        {/* Grafico Principale - Full Width */}
        <FadeIn direction="up" delay={0.3}>
          <ComparisonLineChart
            title="Utenti Attivi"
            description="Trend giornaliero utenti attivi"
            data={data.usersChart}
            showComparison={comparisonPeriod.enabled}
            height={350}
          />
        </FadeIn>

        {/* Grafici Secondari - 2 Colonne */}
        <FadeIn direction="up" delay={0.4}>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <ComparisonLineChart
              title="Visualizzazioni Pagine"
              description="Trend giornaliero visualizzazioni"
              data={data.pageViewsChart}
              showComparison={comparisonPeriod.enabled}
              height={300}
            />
            <ComparisonLineChart
              title="Eventi Chiave"
              description="Trend giornaliero conversioni"
              data={data.conversionsChart}
              showComparison={comparisonPeriod.enabled}
              height={300}
            />
          </div>
        </FadeIn>
      </div>

      {/* Tables */}
      <FadeIn direction="up" delay={0.5}>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <TrafficSourcesTable data={data.trafficSources} />
          <LandingPagesTable data={data.landingPages} />
        </div>
      </FadeIn>
    </AnimatedPage>
  );
}
