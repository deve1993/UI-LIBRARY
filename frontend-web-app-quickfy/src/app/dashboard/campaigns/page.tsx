"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { DollarSign, MousePointerClick, TrendingUp, Eye } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { subDays } from "date-fns";
import { CampaignsSkeleton } from "@/components/skeletons";
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { CampaignsHeader } from "@/components/campaigns/CampaignsHeader";
import { ComparisonMetricCard } from "@/components/analytics/ComparisonMetricCard";
import { ComparisonLineChart } from "@/components/analytics/ComparisonLineChart";
import { CampaignsTable } from "@/components/campaigns/CampaignsTable";
import { EmptyCampaignsState } from "@/components/campaigns/EmptyCampaignsState";
import { CreateCampaignDialog } from "@/components/campaigns/CreateCampaignDialog";
import { apiClient } from "@/lib/api/client";
import type { DateRange, ComparisonPeriod, CampaignAnalytics, Campaign, AdPlatform, CampaignStatus } from "@/types";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function CampaignsPage() {
  const { user } = useAuthStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Filters state
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

  const [selectedPlatform, setSelectedPlatform] = useState<AdPlatform | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus | "all">("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch data
  const fetchData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const [campaignsData, analyticsData] = await Promise.all([
        apiClient.getCampaigns(),
        apiClient.getCampaignsAnalytics(
          dateRange,
          comparisonPeriod.enabled ? comparisonPeriod : undefined,
          selectedPlatform !== "all" ? selectedPlatform : undefined,
          selectedStatus !== "all" ? selectedStatus : undefined
        ),
      ]);

      setCampaigns(campaignsData);
      setAnalytics(analyticsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Errore nel caricamento campagne:", error);
      toast.error("Errore nel caricamento dei dati");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [dateRange, comparisonPeriod, selectedPlatform, selectedStatus]);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes (only when tab is visible)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        intervalId = setInterval(() => {
          fetchData(false);
        }, 300000); // 5 minutes
      }
    };

    intervalId = setInterval(() => {
      fetchData(false);
    }, 300000);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchData]);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      if (selectedPlatform !== "all" && c.platform !== selectedPlatform) return false;
      if (selectedStatus !== "all" && c.status !== selectedStatus) return false;
      return true;
    });
  }, [campaigns, selectedPlatform, selectedStatus]);

  // Export to Excel
  const handleExport = () => {
    if (!analytics || !filteredCampaigns.length) return;

    try {
      const wb = XLSX.utils.book_new();

      // Overview sheet
      const overviewData = [
        ["Metrica", "Valore", "Variazione %"],
        ["Budget Speso", `€${analytics.totalSpent.toFixed(2)}`, analytics.totalSpentChange],
        ["Impressioni Totali", analytics.totalImpressions, analytics.totalImpressionsChange],
        ["Click Totali", analytics.totalClicks, analytics.totalClicksChange],
        ["Conversioni Totali", analytics.totalConversions, analytics.totalConversionsChange],
        ["CTR Medio", `${analytics.avgCTR.toFixed(2)}%`, analytics.avgCTRChange],
        ["CPC Medio", `€${analytics.avgCPC.toFixed(2)}`, analytics.avgCPCChange],
        ["ROAS Medio", `${analytics.avgROAS.toFixed(1)}x`, analytics.avgROASChange],
      ];
      const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(wb, wsOverview, "Panoramica");

      // Campaigns sheet
      const campaignsData = [
        ["Nome", "Piattaforma", "Stato", "Budget", "Speso", "Impressioni", "Click", "Conversioni", "CTR %", "CPC €", "ROAS"],
        ...filteredCampaigns.map(c => [
          c.name,
          c.platform,
          c.status,
          c.budget,
          c.spent,
          c.impressions,
          c.clicks,
          c.conversions,
          c.ctr,
          c.cpc,
          c.roas,
        ]),
      ];
      const wsCampaigns = XLSX.utils.aoa_to_sheet(campaignsData);
      XLSX.utils.book_append_sheet(wb, wsCampaigns, "Campagne");

      // Daily breakdown sheet
      const dailyData = [
        ["Data", "Speso €", "Impressioni", "Click", "Conversioni", "CTR %", "CPC €", "ROAS"],
        ...analytics.dailyBreakdown.map(d => [
          d.date,
          d.spent.toFixed(2),
          Math.round(d.impressions),
          Math.round(d.clicks),
          Math.round(d.conversions),
          d.ctr.toFixed(2),
          d.cpc.toFixed(2),
          d.roas.toFixed(1),
        ]),
      ];
      const wsDaily = XLSX.utils.aoa_to_sheet(dailyData);
      XLSX.utils.book_append_sheet(wb, wsDaily, "Performance Giornaliera");

      // Write file
      XLSX.writeFile(wb, `campagne-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Report esportato con successo!");
    } catch (error) {
      console.error("Errore export:", error);
      toast.error("Errore durante l'esportazione");
    }
  };

  const handleCreateCampaign = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
    // Refetch analytics to update metrics
    fetchData(false);
  };

  if (loading) {
    return <CampaignsSkeleton />;
  }

  if (!analytics) {
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
            <h1 className="text-2xl md:text-3xl font-bold">Campagne Pubblicitarie</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Monitora e ottimizza le tue campagne Google Ads, Facebook e Instagram
            </p>
          </div>

          <CampaignsHeader
            dateRange={dateRange}
            comparisonPeriod={comparisonPeriod}
            selectedPlatform={selectedPlatform}
            selectedStatus={selectedStatus}
            onDateRangeChange={setDateRange}
            onComparisonPeriodChange={setComparisonPeriod}
            onPlatformChange={setSelectedPlatform}
            onStatusChange={setSelectedStatus}
            onExport={handleExport}
            onRefresh={() => fetchData(false)}
            onCreateCampaign={handleCreateCampaign}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
          />
        </div>
      </FadeIn>

      {filteredCampaigns.length === 0 ? (
        <FadeIn direction="up" delay={0.2}>
          <EmptyCampaignsState onCreateClick={handleCreateCampaign} />
        </FadeIn>
      ) : (
        <>
          {/* KPI Cards */}
          <StaggerContainer className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            <StaggerItem>
              <ComparisonMetricCard
                title="Budget Speso"
                value={analytics.totalSpent}
                change={analytics.totalSpentChange}
                icon={DollarSign}
                format="currency"
                decimals={0}
              />
            </StaggerItem>
            <StaggerItem>
              <ComparisonMetricCard
                title="Impressioni"
                value={analytics.totalImpressions}
                change={analytics.totalImpressionsChange}
                icon={Eye}
                format="number"
              />
            </StaggerItem>
            <StaggerItem>
              <ComparisonMetricCard
                title="Click Totali"
                value={analytics.totalClicks}
                change={analytics.totalClicksChange}
                icon={MousePointerClick}
                format="number"
              />
            </StaggerItem>
            <StaggerItem>
              <ComparisonMetricCard
                title="ROAS Medio"
                value={analytics.avgROAS}
                change={analytics.avgROASChange}
                icon={TrendingUp}
                format="custom"
                customFormatter={(val) => `${val.toFixed(1)}x`}
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Charts - Layout Misto */}
          <div className="space-y-4">
            {/* Grafico Principale - Full Width */}
            <FadeIn direction="up" delay={0.3}>
              <ComparisonLineChart
                title="Spesa Pubblicitaria"
                description="Trend giornaliero spesa campagne"
                data={analytics.spentChart}
                showComparison={comparisonPeriod.enabled}
                valueFormatter={(val) => `€${val.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`}
                height={350}
              />
            </FadeIn>

            {/* Grafici Secondari - 2 Colonne */}
            <FadeIn direction="up" delay={0.4}>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <ComparisonLineChart
                  title="Click Giornalieri"
                  description="Trend giornaliero click"
                  data={analytics.clicksChart}
                  showComparison={comparisonPeriod.enabled}
                  height={300}
                />
                <ComparisonLineChart
                  title="ROAS Giornaliero"
                  description="Trend giornaliero ROAS"
                  data={analytics.roasChart}
                  showComparison={comparisonPeriod.enabled}
                  valueFormatter={(val) => `${val.toFixed(1)}x`}
                  height={300}
                />
              </div>
            </FadeIn>
          </div>

          {/* Campaigns Table */}
          <FadeIn direction="up" delay={0.5}>
            <CampaignsTable
              campaigns={filteredCampaigns}
              onCampaignClick={(campaign) => {
                toast.info(`Dettagli campagna: ${campaign.name} (in arrivo)`);
              }}
            />
          </FadeIn>
        </>
      )}

      {/* Create Campaign Dialog */}
      <CreateCampaignDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCampaignCreated={handleCampaignCreated}
      />
    </AnimatedPage>
  );
}
