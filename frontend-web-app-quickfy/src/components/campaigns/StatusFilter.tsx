"use client";

import { useState } from "react";
import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CampaignStatus } from "@/types";

interface StatusFilterProps {
  selectedStatus: CampaignStatus | "all";
  onStatusChange: (status: CampaignStatus | "all") => void;
}

const statuses = [
  {
    code: "all" as const,
    name: "Tutti gli stati",
    badge: "🔘"
  },
  {
    code: "active" as const,
    name: "Attive",
    badge: "✅"
  },
  {
    code: "paused" as const,
    name: "In Pausa",
    badge: "⏸️"
  },
  {
    code: "ended" as const,
    name: "Terminate",
    badge: "⏹️"
  },
];

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  const [open, setOpen] = useState(false);

  const selected = statuses.find((s) => s.code === selectedStatus) || statuses[0];

  const handleSelect = (code: CampaignStatus | "all") => {
    onStatusChange(code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-start gap-2"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">{selected.name}</span>
          <span className="md:hidden">
            {selected.code === "all" ? "Tutti" : selected.badge}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto p-1">
          {statuses.map((status) => (
            <Button
              key={status.code}
              variant="ghost"
              className="w-full justify-start gap-2 h-9"
              onClick={() => handleSelect(status.code)}
            >
              <span className="text-lg">{status.badge}</span>
              <span className="flex-1 text-left">{status.name}</span>
              {selectedStatus === status.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
