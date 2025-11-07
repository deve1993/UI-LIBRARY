"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { AdPlatform } from "@/types";

interface PlatformFilterProps {
  selectedPlatform: AdPlatform | "all";
  onPlatformChange: (platform: AdPlatform | "all") => void;
}

const platforms = [
  {
    code: "all" as const,
    name: "Tutte le piattaforme",
    icon: "🌐"
  },
  {
    code: "google_ads" as const,
    name: "Google Ads",
    icon: "🔍"
  },
  {
    code: "facebook_ads" as const,
    name: "Facebook Ads",
    icon: "📘"
  },
  {
    code: "instagram_ads" as const,
    name: "Instagram Ads",
    icon: "📸"
  },
];

export function PlatformFilter({ selectedPlatform, onPlatformChange }: PlatformFilterProps) {
  const [open, setOpen] = useState(false);

  const selected = platforms.find((p) => p.code === selectedPlatform) || platforms[0];

  const handleSelect = (code: AdPlatform | "all") => {
    onPlatformChange(code);
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
          <span>{selected.icon}</span>
          <span className="hidden md:inline">{selected.name}</span>
          <span className="md:hidden">
            {selected.code === "all" ? "Tutte" : selected.icon}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto p-1">
          {platforms.map((platform) => (
            <Button
              key={platform.code}
              variant="ghost"
              className="w-full justify-start gap-2 h-9"
              onClick={() => handleSelect(platform.code)}
            >
              <span className="text-lg">{platform.icon}</span>
              <span className="flex-1 text-left">{platform.name}</span>
              {selectedPlatform === platform.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
