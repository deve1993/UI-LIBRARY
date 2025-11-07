"use client";

import { Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyCampaignsStateProps {
  onCreateClick?: () => void;
}

export function EmptyCampaignsState({ onCreateClick }: EmptyCampaignsStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Megaphone className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nessuna campagna attiva</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Inizia a promuovere i tuoi prodotti creando la tua prima campagna pubblicitaria su
          Google Ads, Facebook o Instagram.
        </p>
        {onCreateClick && (
          <Button onClick={onCreateClick} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Crea Prima Campagna
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
