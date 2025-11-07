"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChartDataPoint } from "@/types";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ComparisonLineChartProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  showComparison?: boolean;
  valueFormatter?: (value: number) => string;
  height?: number;
}

export function ComparisonLineChart({
  title,
  description,
  data,
  showComparison = false,
  valueFormatter = (val) => val.toLocaleString("it-IT"),
  height = 300,
}: ComparisonLineChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full" style={{ height: `${height}px` }} />
        </CardContent>
      </Card>
    );
  }

  const categories = data.map((d) => {
    try {
      return format(new Date(d.date), "d MMM", { locale: it });
    } catch {
      return d.date;
    }
  });

  const currentSeries = data.map((d) => d.value);
  const comparisonSeries = showComparison
    ? data.map((d) => d.comparisonValue || 0)
    : [];

  const series: ApexAxisChartSeries = [
    {
      name: "Periodo Corrente",
      data: currentSeries,
    },
  ];

  if (showComparison && comparisonSeries.length > 0) {
    series.push({
      name: "Periodo Precedente",
      data: comparisonSeries,
    });
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: true,
        offsetY: -20,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        speed: 800,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 2],
    },
    colors: ["hsl(var(--primary))", "hsl(var(--chart-2))"],
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "hsl(var(--muted-foreground))",
        },
        rotate: -45,
        rotateAlways: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "hsl(var(--muted-foreground))",
        },
        formatter: valueFormatter,
      },
    },
    grid: {
      borderColor: "hsl(var(--border))",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
      },
      y: {
        formatter: valueFormatter,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: 10,
      labels: {
        colors: "hsl(var(--foreground))",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="line"
          height={height}
        />
      </CardContent>
    </Card>
  );
}
