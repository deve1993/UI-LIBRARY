"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TrafficSourceData } from "@/types";

interface TrafficSourcesTableProps {
  data: TrafficSourceData[];
}

type SortKey = keyof TrafficSourceData;
type SortDirection = "asc" | "desc";

const sourceColors: Record<string, string> = {
  google: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  facebook: "bg-blue-900 text-blue-100 dark:bg-blue-800 dark:text-blue-200",
  "(direct)": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  newsletter: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  linkedin: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
};

export function TrafficSourcesTable({ data }: TrafficSourcesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("sessions");
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

  const getSourceBadgeColor = (source: string) => {
    return sourceColors[source.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sorgenti di Traffico</CardTitle>
        <CardDescription>
          Analisi dettagliata delle sorgenti di acquisizione utenti
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
                    onClick={() => handleSort("source")}
                    className="h-8 px-2"
                  >
                    Sorgente / Mezzo
                    <SortIcon columnKey="source" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("sessions")}
                    className="h-8 px-2"
                  >
                    Sessioni
                    <SortIcon columnKey="sessions" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
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
                <TableHead className="text-right hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("conversionRate")}
                    className="h-8 px-2"
                  >
                    Tasso Conv.
                    <SortIcon columnKey="conversionRate" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className={getSourceBadgeColor(item.source)}
                      >
                        {item.source}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.medium}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.sessions.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.keyEvents.toLocaleString("it-IT")}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <span className="font-medium">{item.conversionRate.toFixed(1)}%</span>
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
