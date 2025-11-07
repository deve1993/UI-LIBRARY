"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/types";

interface CampaignsTableProps {
  campaigns: Campaign[];
  onCampaignClick?: (campaign: Campaign) => void;
}

type SortKey = keyof Campaign;
type SortDirection = "asc" | "desc";

export function CampaignsTable({ campaigns, onCampaignClick }: CampaignsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("spent");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }, [campaigns, sortKey, sortDirection]);

  const paginatedCampaigns = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCampaigns.slice(start, start + pageSize);
  }, [sortedCampaigns, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedCampaigns.length / pageSize);

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const getStatusVariant = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "ended":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "Attiva";
      case "paused":
        return "In Pausa";
      case "ended":
        return "Terminata";
      default:
        return status;
    }
  };

  const getPlatformIcon = (platform: Campaign["platform"]) => {
    switch (platform) {
      case "google_ads":
        return "🔍";
      case "facebook_ads":
        return "📘";
      case "instagram_ads":
        return "📸";
      default:
        return "🌐";
    }
  };

  const getBudgetColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getROASColor = (roas: number) => {
    if (roas >= 4) return "text-green-600 dark:text-green-400 font-semibold";
    if (roas >= 2) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elenco Campagne</CardTitle>
        <CardDescription>
          {campaigns.length} campagna{campaigns.length !== 1 ? "e" : ""} trovata{campaigns.length !== 1 ? "e" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                    className="h-8 px-2"
                  >
                    Nome
                    <SortIcon columnKey="name" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("status")}
                    className="h-8 px-2"
                  >
                    Stato
                    <SortIcon columnKey="status" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("spent")}
                    className="h-8 px-2"
                  >
                    Budget
                    <SortIcon columnKey="spent" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("impressions")}
                    className="h-8 px-2"
                  >
                    Impressioni
                    <SortIcon columnKey="impressions" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("clicks")}
                    className="h-8 px-2"
                  >
                    Click
                    <SortIcon columnKey="clicks" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden xl:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("cpc")}
                    className="h-8 px-2"
                  >
                    CPC
                    <SortIcon columnKey="cpc" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("roas")}
                    className="h-8 px-2"
                  >
                    ROAS
                    <SortIcon columnKey="roas" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className={onCampaignClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onCampaignClick?.(campaign)}
                >
                  <TableCell className="text-center text-xl">
                    {getPlatformIcon(campaign.platform)}
                  </TableCell>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-medium">
                        €{campaign.spent.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        di €{campaign.budget.toLocaleString("it-IT")}
                      </span>
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getBudgetColor(campaign.spent, campaign.budget)}`}
                          style={{
                            width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium hidden lg:table-cell">
                    {campaign.impressions.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right font-medium hidden lg:table-cell">
                    {campaign.clicks.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right hidden xl:table-cell">
                    <span className="text-sm">
                      €{campaign.cpc.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={getROASColor(campaign.roas)}>
                      {campaign.roas.toFixed(1)}x
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              Pagina {currentPage} di {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Precedente
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Successiva
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
