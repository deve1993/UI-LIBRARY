"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Campaign, AdPlatform } from "@/types";
import { toast } from "sonner";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
  onCampaignCreated,
}: CreateCampaignDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    platform: "google_ads" as AdPlatform,
    budget: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    objective: "conversions",
    targetAudience: "",
    location: "Italia",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome campagna obbligatorio";
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Budget deve essere maggiore di 0";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Data inizio obbligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = "Pubblico target obbligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      name: formData.name,
      platform: formData.platform,
      status: "active",
      budget: parseFloat(formData.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roas: 0,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
    };

    onCampaignCreated(newCampaign);
    toast.success(`Campagna "${formData.name}" creata con successo!`);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      platform: "google_ads",
      budget: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      objective: "conversions",
      targetAudience: "",
      location: "Italia",
    });
    setErrors({});
    onOpenChange(false);
  };

  const getPlatformIcon = (platform: AdPlatform) => {
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

  const getPlatformName = (platform: AdPlatform) => {
    switch (platform) {
      case "google_ads":
        return "Google Ads";
      case "facebook_ads":
        return "Facebook Ads";
      case "instagram_ads":
        return "Instagram Ads";
      default:
        return platform;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crea Nuova Campagna</DialogTitle>
          <DialogDescription>
            Step {currentStep} di 3 - {currentStep === 1 ? "Informazioni Base" : currentStep === 2 ? "Obiettivi & Targeting" : "Review"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full ${
                step <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Campagna *</Label>
              <Input
                id="name"
                placeholder="es. Black Friday 2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label>Piattaforma *</Label>
              <RadioGroup
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value as AdPlatform })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google_ads" id="google" />
                  <Label htmlFor="google" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-lg">🔍</span>
                    Google Ads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="facebook_ads" id="facebook" />
                  <Label htmlFor="facebook" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-lg">📘</span>
                    Facebook Ads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instagram_ads" id="instagram" />
                  <Label htmlFor="instagram" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-lg">📸</span>
                    Instagram Ads
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Totale (€) *</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                step="100"
                placeholder="1000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data Inizio *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data Fine (opzionale)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  min={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Targeting */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="objective">Obiettivo Campagna</Label>
              <select
                id="objective"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              >
                <option value="conversions">Conversioni</option>
                <option value="traffic">Traffico al Sito</option>
                <option value="awareness">Brand Awareness</option>
                <option value="leads">Lead Generation</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Pubblico Target *</Label>
              <Input
                id="targetAudience"
                placeholder="es. Donne 25-45 anni interessate a moda"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
              {errors.targetAudience && <p className="text-sm text-destructive">{errors.targetAudience}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Località</Label>
              <Input
                id="location"
                placeholder="Italia"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-lg mb-3">Riepilogo Campagna</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Nome:</span>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Piattaforma:</span>
                  <p className="font-medium flex items-center gap-2">
                    <span className="text-lg">{getPlatformIcon(formData.platform)}</span>
                    {getPlatformName(formData.platform)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <p className="font-medium">€{parseFloat(formData.budget).toLocaleString("it-IT")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">
                    {new Date(formData.startDate).toLocaleDateString("it-IT")}
                    {formData.endDate && ` - ${new Date(formData.endDate).toLocaleDateString("it-IT")}`}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Obiettivo:</span>
                  <p className="font-medium capitalize">{formData.objective}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Località:</span>
                  <p className="font-medium">{formData.location}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Pubblico Target:</span>
                  <p className="font-medium">{formData.targetAudience}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="text-muted-foreground">
                <strong>Nota:</strong> La campagna verrà creata con stato "Attiva" e metriche iniziali a zero.
                Potrai monitorare le performance dalla tabella principale.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Annulla
          </Button>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Indietro
            </Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNext}>
              Avanti
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Crea Campagna
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
