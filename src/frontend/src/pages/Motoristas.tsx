import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useDrivers, useToggleDriverOnline } from "@/hooks/useBackend";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Driver, DriverStatus } from "@/types";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Search,
  Star,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-emerald-600",
  "bg-blue-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-indigo-600",
  "bg-orange-600",
];

function avatarColor(id: string): string {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function statusInfo(status: DriverStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case "online":
      return { label: "Online", className: "badge-success" };
    case "em_corrida":
      return { label: "Em corrida", className: "badge-warning" };
    case "offline":
      return {
        label: "Offline",
        className: "badge-status bg-muted text-muted-foreground",
      };
    default:
      return { label: status, className: "badge-status" };
  }
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={
            i <= Math.round(value)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30 fill-muted-foreground/30"
          }
        />
      ))}
      <span className="text-xs text-foreground font-medium ml-0.5">
        {value.toFixed(1)}
      </span>
    </span>
  );
}

// ─── Expanded detail panel ────────────────────────────────────────────────────
function DriverDetail({ driver }: { driver: Driver }) {
  // Derived mock financials from totalRides and rating
  const estimatedEarnings = driver.totalRides * 38.5 * (driver.rating / 5);
  const activeHours = Math.round(driver.totalRides * 0.42);
  const lastRideTs = Date.now() - 1000 * 60 * (15 + (driver.totalRides % 90));

  return (
    <tr data-ocid={`motoristas.detail.${driver.id}`}>
      <td colSpan={7} className="bg-muted/40 border-b border-border px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <DollarSign size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ganhos Totais</p>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(estimatedEarnings)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
              <Clock size={14} className="text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Horas Ativas</p>
              <p className="text-sm font-semibold text-foreground">
                {activeHours}h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
              <Car size={14} className="text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Última Corrida</p>
              <p className="text-sm font-semibold text-foreground">
                {formatDate(lastRideTs)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0">
              <Users size={14} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cadastro</p>
              <p className="text-sm font-semibold text-foreground">
                {formatDate(driver.joinedAt)}
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Table row ────────────────────────────────────────────────────────────────
function DriverRow({
  driver,
  index,
  expanded,
  onToggleExpand,
}: {
  driver: Driver;
  index: number;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const toggle = useToggleDriverOnline();
  const { label, className } = statusInfo(driver.status);
  const isOnline = driver.status !== "offline";

  return (
    <>
      <tr
        className="border-b border-border hover:bg-muted/30 transition-colors"
        data-ocid={`motoristas.item.${index + 1}`}
      >
        {/* Avatar + Nome */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-9 h-9 rounded-full ${avatarColor(driver.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              aria-hidden
            >
              {getInitials(driver.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {driver.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {driver.phone}
              </p>
            </div>
          </div>
        </td>

        {/* Avaliação */}
        <td className="px-4 py-3 hidden sm:table-cell">
          <StarRating value={driver.rating} />
        </td>

        {/* Corridas */}
        <td className="px-4 py-3 hidden md:table-cell">
          <span className="text-sm text-foreground tabular-nums">
            {driver.totalRides.toLocaleString("pt-BR")}
          </span>
        </td>

        {/* Veículo */}
        <td className="px-4 py-3 hidden lg:table-cell">
          <div className="min-w-0">
            <p className="text-sm text-foreground truncate">{driver.vehicle}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {driver.plate}
            </p>
          </div>
        </td>

        {/* Status badge */}
        <td className="px-4 py-3">
          <span className={className}>{label}</span>
        </td>

        {/* Toggle */}
        <td
          className="px-4 py-3"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label="Alterar status"
        >
          <Switch
            checked={isOnline}
            onCheckedChange={(checked) =>
              toggle.mutate({ driverId: driver.id, online: checked })
            }
            data-ocid={`motoristas.toggle.${index + 1}`}
            disabled={driver.status === "em_corrida"}
            aria-label={`Alterar status de ${driver.name}`}
            className="data-[state=checked]:bg-primary"
          />
        </td>

        {/* Expand chevron */}
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors rounded p-1 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={expanded ? "Recolher detalhes" : "Ver detalhes"}
            data-ocid={
              expanded
                ? `motoristas.collapse.${index + 1}`
                : `motoristas.expand.${index + 1}`
            }
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
      </tr>
      {expanded && <DriverDetail driver={driver} />}
    </>
  );
}

// ─── Stats card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 shadow-card">
      <div
        className={`w-10 h-10 rounded-full ${accent} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground tabular-nums">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function Motoristas() {
  const { data: drivers, isLoading } = useDrivers();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalCount = drivers?.length ?? 0;
  const onlineCount =
    drivers?.filter((d) => d.status === "online" || d.status === "em_corrida")
      .length ?? 0;
  const offlineCount =
    drivers?.filter((d) => d.status === "offline").length ?? 0;

  const filtered = (drivers ?? []).filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <Layout>
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            data-ocid="motoristas.page"
          >
            Motoristas
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerenciamento e status da frota de motoristas
          </p>
        </div>
      </div>

      {/* ── Stats row ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          data-ocid="motoristas.stats"
        >
          <StatCard
            label="Total de Motoristas"
            value={totalCount}
            accent="bg-primary/15"
            icon={<Users size={18} className="text-primary" />}
          />
          <StatCard
            label="Online / Em corrida"
            value={onlineCount}
            accent="bg-emerald-500/15"
            icon={<Wifi size={18} className="text-emerald-400" />}
          />
          <StatCard
            label="Offline"
            value={offlineCount}
            accent="bg-muted-foreground/15"
            icon={<WifiOff size={18} className="text-muted-foreground" />}
          />
        </div>
      )}

      {/* ── Search bar ── */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          className="pl-10"
          placeholder="Buscar motorista por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="motoristas.search_input"
        />
      </div>

      {/* ── Table ── */}
      {isLoading ? (
        <div className="space-y-2">
          {["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
          data-ocid="motoristas.table"
        >
          {/* Table header */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Motorista
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Avaliação
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    Corridas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                    Veículo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Disponível
                  </th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div
                        className="flex flex-col items-center justify-center py-16 text-center"
                        data-ocid="motoristas.empty_state"
                      >
                        <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center mb-4">
                          <Search size={24} className="text-muted-foreground" />
                        </div>
                        <p className="text-base font-medium text-foreground">
                          Nenhum motorista encontrado
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tente buscar por outro nome
                        </p>
                        {search && (
                          <button
                            type="button"
                            className="mt-4 text-sm text-primary hover:underline"
                            onClick={() => setSearch("")}
                            data-ocid="motoristas.clear_search_button"
                          >
                            Limpar busca
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((driver, i) => (
                    <DriverRow
                      key={driver.id}
                      driver={driver}
                      index={i}
                      expanded={expandedId === driver.id}
                      onToggleExpand={() => toggleExpand(driver.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="border-t border-border px-4 py-3 flex items-center justify-between bg-muted/20">
              <p className="text-xs text-muted-foreground">
                {filtered.length === totalCount
                  ? `${totalCount} motoristas no total`
                  : `${filtered.length} de ${totalCount} motoristas`}
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 inline-block" />
                  {onlineCount} online
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5 inline-block" />
                  {offlineCount} offline
                </Badge>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
