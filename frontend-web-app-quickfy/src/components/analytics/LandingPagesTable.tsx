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
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingPageData } from "@/types";

interface LandingPagesTableProps {
  data: LandingPageData[];
}

type SortKey = keyof LandingPageData;
type SortDirection = "asc" | "desc";

export function LandingPagesTable({ data }: LandingPagesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("views");
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

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
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
  }, [data, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

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

  const getBounceRateColor = (rate: number) => {
    if (rate < 40) return "text-green-600 dark:text-green-400";
    if (rate < 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBounceRateProgressColor = (rate: number) => {
    if (rate < 40) return "bg-green-500";
    if (rate < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagine di Destinazione</CardTitle>
        <CardDescription>
          Prime pagine visitate dagli utenti sul sito
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("page")}
                    className="h-8 px-2"
                  >
                    Pagina
                    <SortIcon columnKey="page" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("views")}
                    className="h-8 px-2"
                  >
                    Visualizzazioni
                    <SortIcon columnKey="views" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("keyEvents")}
                    className="h-8 px-2"
                  >
                    Eventi Chiave
                    <SortIcon columnKey="keyEvents" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("bounceRate")}
                    className="h-8 px-2"
                  >
                    Bounce Rate
                    <SortIcon columnKey="bounceRate" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">
                            {item.page}
                          </code>
                          <a
                            href={item.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        {item.pageTitle && (
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {item.pageTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.views.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right font-medium hidden md:table-cell">
                    {item.keyEvents.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    <div className="flex flex-col items-end gap-1">
                      <span className={`font-medium ${getBounceRateColor(item.bounceRate)}`}>
                        {item.bounceRate.toFixed(1)}%
                      </span>
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getBounceRateProgressColor(item.bounceRate)}`}
                          style={{ width: `${Math.min(item.bounceRate, 100)}%` }}
                        />
                      </div>
                    </div>
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
