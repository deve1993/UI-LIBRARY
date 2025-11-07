"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CountryFilterProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const countries = [
  { code: "all", name: "Tutti i paesi", flag: "🌍" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "US", name: "Stati Uniti", flag: "🇺🇸" },
  { code: "DE", name: "Germania", flag: "🇩🇪" },
  { code: "FR", name: "Francia", flag: "🇫🇷" },
  { code: "ES", name: "Spagna", flag: "🇪🇸" },
  { code: "GB", name: "Regno Unito", flag: "🇬🇧" },
  { code: "NL", name: "Paesi Bassi", flag: "🇳🇱" },
  { code: "BE", name: "Belgio", flag: "🇧🇪" },
  { code: "CH", name: "Svizzera", flag: "🇨🇭" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
];

export function CountryFilter({ selectedCountry, onCountryChange }: CountryFilterProps) {
  const [open, setOpen] = useState(false);

  const selected = countries.find((c) => c.code === selectedCountry) || countries[0];

  const handleSelect = (code: string) => {
    onCountryChange(code);
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
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{selected.flag}</span>
          <span className="hidden md:inline">{selected.name}</span>
          <span className="md:hidden">{selected.code === "all" ? "Tutti" : selected.code}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto p-1">
          {countries.map((country) => (
            <Button
              key={country.code}
              variant="ghost"
              className="w-full justify-start gap-2 h-9"
              onClick={() => handleSelect(country.code)}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="flex-1 text-left">{country.name}</span>
              {selectedCountry === country.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
