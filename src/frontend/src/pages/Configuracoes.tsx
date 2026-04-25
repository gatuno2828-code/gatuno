import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useSettings, useUpdateSettings } from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/utils";
import type { Settings } from "@/types";
import {
  AlertTriangle,
  Calculator,
  Car,
  DollarSign,
  Save,
  Settings2,
  Sliders,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Section card wrapper ────────────────────────────────────────────────────
function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <h2 className="font-semibold text-foreground text-base">{title}</h2>
      </div>
      <Separator className="opacity-40" />
      {children}
    </div>
  );
}

// ─── Number field with optional R$ prefix ────────────────────────────────────
function NumField({
  id,
  label,
  value,
  step,
  min,
  max,
  onChange,
  ocid,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  step?: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  ocid: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        step={step ?? 0.5}
        min={min ?? 0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
        className="bg-background border-border"
        data-ocid={ocid}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

// ─── Toggle row ───────────────────────────────────────────────────────────────
function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
  ocid,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        data-ocid={ocid}
        aria-label={label}
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function Configuracoes() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  // Separate form state per section
  const [priceForm, setPriceForm] = useState<Partial<Settings> | null>(null);
  const [rideForm, setRideForm] = useState<Partial<Settings> | null>(null);
  const [featForm, setFeatForm] = useState<Partial<Settings> | null>(null);

  // Preview calculator state
  const [previewKm, setPreviewKm] = useState(10);
  const [previewMin, setPreviewMin] = useState(20);

  const current: Settings | undefined = settings
    ? { ...settings, ...priceForm, ...rideForm, ...featForm }
    : undefined;

  const handleSavePrice = () => {
    if (!current) return;
    updateSettings.mutate(current, {
      onSuccess: () => {
        toast.success("Configurações salvas com sucesso!", {
          duration: 3000,
          className: "bg-primary text-primary-foreground",
        });
        setPriceForm(null);
      },
      onError: () => toast.error("Erro ao salvar configurações."),
    });
  };

  const handleSaveFeat = () => {
    if (!current) return;
    updateSettings.mutate(current, {
      onSuccess: () => {
        toast.success("Configurações salvas com sucesso!", {
          duration: 3000,
          className: "bg-primary text-primary-foreground",
        });
        setFeatForm(null);
      },
      onError: () => toast.error("Erro ao salvar funcionalidades."),
    });
  };

  const liveBase = current?.baseFare ?? 5;
  const liveKm = current?.perKmRate ?? 2.5;
  const liveMin = current?.perMinuteRate ?? 0.5;
  const liveMinFare = current?.minFare ?? 7;
  const previewFare = Math.max(
    liveBase + previewKm * liveKm + previewMin * liveMin,
    liveMinFare,
  );

  if (isLoading || !current) {
    return (
      <Layout>
        <div className="mb-6" data-ocid="configuracoes.page">
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Parâmetros de tarifas e configurações gerais da plataforma
          </p>
        </div>
        <div className="max-w-2xl space-y-4">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8" data-ocid="configuracoes.page">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 size={20} className="text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-7">
          Parâmetros de tarifas e configurações gerais da plataforma
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* ── Section 1: Preços e Tarifas ── */}
        <SectionCard icon={<DollarSign size={18} />} title="Preços e Tarifas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumField
              id="baseFare"
              label="Tarifa base (R$)"
              value={current.baseFare}
              step={0.5}
              ocid="configuracoes.base_fare.input"
              hint="Valor cobrado no início da corrida"
              onChange={(v) =>
                setPriceForm((f) => ({ ...(f ?? current), baseFare: v }))
              }
            />
            <NumField
              id="perKmRate"
              label="Por km (R$/km)"
              value={current.perKmRate}
              step={0.1}
              ocid="configuracoes.per_km.input"
              hint="Valor adicional por quilômetro"
              onChange={(v) =>
                setPriceForm((f) => ({ ...(f ?? current), perKmRate: v }))
              }
            />
            <NumField
              id="perMinuteRate"
              label="Por minuto (R$/min)"
              value={current.perMinuteRate}
              step={0.1}
              ocid="configuracoes.per_minute.input"
              hint="Valor adicional por minuto de corrida"
              onChange={(v) =>
                setPriceForm((f) => ({ ...(f ?? current), perMinuteRate: v }))
              }
            />
            <NumField
              id="serviceFee"
              label="Taxa de serviço (%)"
              value={current.serviceFeePercent}
              step={1}
              max={100}
              ocid="configuracoes.service_fee.input"
              hint="Percentual cobrado sobre o total"
              onChange={(v) =>
                setPriceForm((f) => ({
                  ...(f ?? current),
                  serviceFeePercent: v,
                }))
              }
            />
            <NumField
              id="minFare"
              label="Valor mínimo (R$)"
              value={current.minFare}
              step={0.5}
              ocid="configuracoes.min_fare.input"
              hint="Tarifa mínima cobrada por corrida"
              onChange={(v) =>
                setPriceForm((f) => ({ ...(f ?? current), minFare: v }))
              }
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSavePrice}
              disabled={updateSettings.isPending || !priceForm}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
              data-ocid="configuracoes.save_price_button"
            >
              <Save size={15} />
              {updateSettings.isPending
                ? "Salvando..."
                : "Salvar Configurações de Preço"}
            </Button>
          </div>
        </SectionCard>

        {/* ── Section 2: Configurações de Corrida ── */}
        <SectionCard icon={<Car size={18} />} title="Configurações de Corrida">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NumField
              id="searchRadius"
              label="Raio de busca (km)"
              value={current.searchRadiusKm}
              step={1}
              min={1}
              ocid="configuracoes.search_radius.input"
              hint="Distância máxima para localizar motoristas"
              onChange={(v) =>
                setRideForm((f) => ({ ...(f ?? current), searchRadiusKm: v }))
              }
            />
            <NumField
              id="acceptTimeout"
              label="Tempo de aceite (s)"
              value={current.acceptanceTimeoutSec}
              step={5}
              min={10}
              ocid="configuracoes.accept_timeout.input"
              hint="Segundos para motorista aceitar a corrida"
              onChange={(v) =>
                setRideForm((f) => ({
                  ...(f ?? current),
                  acceptanceTimeoutSec: v,
                }))
              }
            />
            <NumField
              id="cancelFee"
              label="Taxa de cancelamento (%)"
              value={current.cancellationFeePercent}
              step={1}
              max={100}
              ocid="configuracoes.cancel_fee.input"
              hint="Percentual cobrado em cancelamentos"
              onChange={(v) =>
                setRideForm((f) => ({
                  ...(f ?? current),
                  cancellationFeePercent: v,
                }))
              }
            />
          </div>

          {/* Maintenance mode inline */}
          <div className="mt-2 p-4 rounded-lg bg-muted/30 border border-border flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-yellow-500" />
                Modo Manutenção
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Quando ativado, o app fica indisponível para novos pedidos.
              </p>
            </div>
            <Switch
              checked={current.maintenanceMode}
              onCheckedChange={(checked) =>
                setRideForm((f) => ({
                  ...(f ?? current),
                  maintenanceMode: checked,
                }))
              }
              data-ocid="configuracoes.maintenance.switch"
              aria-label="Modo manutenção"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button
              onClick={() => {
                if (!current) return;
                updateSettings.mutate(current, {
                  onSuccess: () => {
                    toast.success("Configurações salvas com sucesso!", {
                      duration: 3000,
                    });
                    setRideForm(null);
                  },
                  onError: () => toast.error("Erro ao salvar."),
                });
              }}
              disabled={updateSettings.isPending || !rideForm}
              variant="outline"
              className="gap-2 border-primary text-primary hover:bg-primary/10"
              data-ocid="configuracoes.save_ride_button"
            >
              <Save size={15} />
              {updateSettings.isPending ? "Salvando..." : "Salvar Corrida"}
            </Button>
          </div>
        </SectionCard>

        {/* ── Section 3: Funcionalidades ── */}
        <SectionCard icon={<Sliders size={18} />} title="Funcionalidades">
          <div className="space-y-1 divide-y divide-border">
            <ToggleRow
              label="Corrida agendada"
              description="Permite que clientes agendem corridas com antecedência"
              checked={current.scheduledRide}
              onCheckedChange={(v) =>
                setFeatForm((f) => ({ ...(f ?? current), scheduledRide: v }))
              }
              ocid="configuracoes.scheduled_ride.switch"
            />
            <ToggleRow
              label="Compartilhar rota"
              description="Clientes podem compartilhar a rota em tempo real"
              checked={current.shareRoute}
              onCheckedChange={(v) =>
                setFeatForm((f) => ({ ...(f ?? current), shareRoute: v }))
              }
              ocid="configuracoes.share_route.switch"
            />
            <ToggleRow
              label="Múltiplos destinos"
              description="Permite adicionar paradas intermediárias na corrida"
              checked={current.multipleDestinations}
              onCheckedChange={(v) =>
                setFeatForm((f) => ({
                  ...(f ?? current),
                  multipleDestinations: v,
                }))
              }
              ocid="configuracoes.multiple_destinations.switch"
            />
            <ToggleRow
              label="Exibir valor antes de aceitar"
              description="Motorista vê o valor estimado antes de aceitar a corrida"
              checked={current.showFareBeforeAccept}
              onCheckedChange={(v) =>
                setFeatForm((f) => ({
                  ...(f ?? current),
                  showFareBeforeAccept: v,
                }))
              }
              ocid="configuracoes.show_fare_before.switch"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSaveFeat}
              disabled={updateSettings.isPending || !featForm}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
              data-ocid="configuracoes.save_features_button"
            >
              <Save size={15} />
              {updateSettings.isPending
                ? "Salvando..."
                : "Salvar Funcionalidades"}
            </Button>
          </div>
        </SectionCard>

        {/* ── Section 4: Preview do cálculo ── */}
        <SectionCard icon={<Calculator size={18} />} title="Preview do Cálculo">
          <p className="text-sm text-muted-foreground -mt-1">
            Simulador ao vivo — ajuste km e minutos para ver o valor estimado em
            tempo real.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="previewKm"
                className="text-sm text-muted-foreground"
              >
                Distância (km)
              </Label>
              <Input
                id="previewKm"
                type="number"
                min={0}
                step={1}
                value={previewKm}
                onChange={(e) =>
                  setPreviewKm(Number.parseFloat(e.target.value) || 0)
                }
                className="bg-background border-border"
                data-ocid="configuracoes.preview_km.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="previewMin"
                className="text-sm text-muted-foreground"
              >
                Duração (minutos)
              </Label>
              <Input
                id="previewMin"
                type="number"
                min={0}
                step={1}
                value={previewMin}
                onChange={(e) =>
                  setPreviewMin(Number.parseFloat(e.target.value) || 0)
                }
                className="bg-background border-border"
                data-ocid="configuracoes.preview_minutes.input"
              />
            </div>
          </div>

          {/* Result panel */}
          <div className="rounded-lg bg-primary/10 border border-primary/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                Fórmula: {liveBase} + ({previewKm} × {liveKm}) + ({previewMin} ×{" "}
                {liveMin})
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                ={" "}
                {(liveBase + previewKm * liveKm + previewMin * liveMin).toFixed(
                  2,
                )}{" "}
                → mín. {formatCurrency(liveMinFare)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-0.5">
                Valor estimado
              </p>
              <p
                className="text-3xl font-bold text-primary"
                data-ocid="configuracoes.preview_fare"
              >
                {formatCurrency(previewFare)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tarifa base", value: formatCurrency(liveBase) },
              {
                label: "Por distância",
                value: formatCurrency(previewKm * liveKm),
              },
              {
                label: "Por tempo",
                value: formatCurrency(previewMin * liveMin),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-muted/40 border border-border p-3 text-center"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Global save note */}
        <p className="text-xs text-muted-foreground text-center pb-4 flex items-center justify-center gap-1.5">
          <Zap size={12} className="text-primary" />
          Alterações são aplicadas imediatamente após salvar cada seção.
        </p>
      </div>
    </Layout>
  );
}
