import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRides } from "@/hooks/useBackend";
import {
  calcFare,
  cn,
  formatCurrency,
  formatDate,
  getRideStatusColor,
  getRideStatusLabel,
} from "@/lib/utils";
import type { Ride, RideStatus, RideType } from "@/types";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Package,
  Route,
  Search,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const STATUS_FILTERS: Array<{ value: RideStatus | "todos"; label: string }> = [
  { value: "todos", label: "Todas" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "a_caminho", label: "A caminho" },
  { value: "procurando", label: "Procurando" },
  { value: "concluida", label: "Finalizadas" },
  { value: "cancelada", label: "Canceladas" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeIcon({ type }: { type: RideType }) {
  return type === "entrega" ? (
    <span className="inline-flex items-center gap-1 text-xs text-blue-400">
      <Package size={13} className="shrink-0" />
      <span>Entrega</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-primary">
      <Car size={13} className="shrink-0" />
      <span>Corrida</span>
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function FareBreakdown({ ride }: { ride: Ride }) {
  const base = 5;
  const kmCost = ride.distanceKm * 2.5;
  const timeCost = ride.durationMinutes * 0.5;
  const total = calcFare(ride.distanceKm, ride.durationMinutes);

  return (
    <div className="bg-muted/20 border border-border rounded-lg p-3 space-y-1.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Detalhamento da Tarifa
      </p>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Tarifa base</span>
        <span className="text-foreground">{formatCurrency(base)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">
          Distância ({ride.distanceKm.toFixed(1)} km × R$ 2,50)
        </span>
        <span className="text-foreground">{formatCurrency(kmCost)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">
          Tempo ({ride.durationMinutes} min × R$ 0,50)
        </span>
        <span className="text-foreground">{formatCurrency(timeCost)}</span>
      </div>
      <Separator className="my-1 bg-border/60" />
      <div className="flex justify-between text-sm font-semibold">
        <span className="text-foreground">Total</span>
        <span className="text-primary">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

function ExpandedDetails({
  ride,
  onClose,
}: { ride: Ride; onClose: () => void }) {
  return (
    <tr>
      <td colSpan={8} className="px-0 pb-0 pt-0">
        <div className="bg-muted/10 border-t border-b border-border px-6 py-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Detalhes da Corrida{" "}
              <span className="font-mono text-muted-foreground text-xs">
                #{ride.id}
              </span>
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar detalhes"
              data-ocid="corridas.details.close_button"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-5">
            <div className="flex items-start gap-2">
              <User size={14} className="text-primary mt-0.5 shrink-0" />
              <DetailRow label="Cliente" value={ride.clientName} />
            </div>
            <div className="flex items-start gap-2">
              <Car
                size={14}
                className="text-muted-foreground mt-0.5 shrink-0"
              />
              <DetailRow
                label="Motorista"
                value={ride.driverName || "Não atribuído"}
              />
            </div>
            <div className="flex items-start gap-2">
              <Route
                size={14}
                className="text-muted-foreground mt-0.5 shrink-0"
              />
              <DetailRow
                label="Distância"
                value={`${ride.distanceKm.toFixed(1)} km`}
              />
            </div>
            <div className="flex items-start gap-2">
              <Clock
                size={14}
                className="text-muted-foreground mt-0.5 shrink-0"
              />
              <DetailRow
                label="Duração"
                value={`${ride.durationMinutes} min`}
              />
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <MapPin size={14} className="text-green-500 mt-0.5 shrink-0" />
              <DetailRow label="Origem" value={ride.origin} />
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
              <DetailRow label="Destino" value={ride.destination} />
            </div>
          </div>

          <FareBreakdown ride={ride} />

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Criado em: {formatDate(ride.createdAt)}</span>
            <span>•</span>
            <span>Atualizado: {formatDate(ride.updatedAt)}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function Corridas() {
  const { data: rides, isLoading } = useRides();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RideStatus | "todos">(
    "todos",
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = (rides ?? []).filter((ride) => {
    const matchesStatus =
      statusFilter === "todos" || ride.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      ride.id.includes(q) ||
      ride.clientName.toLowerCase().includes(q) ||
      ride.driverName.toLowerCase().includes(q) ||
      ride.origin.toLowerCase().includes(q) ||
      ride.destination.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleFilterChange(val: RideStatus | "todos") {
    setStatusFilter(val);
    setPage(1);
    setExpandedId(null);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
    setExpandedId(null);
  }

  function toggleRow(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6" data-ocid="corridas.page">
        <h1 className="text-2xl font-bold text-foreground">Corridas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Histórico e monitoramento de todas as corridas e entregas
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar por ID, cliente, motorista, endereço..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-card border-border"
            data-ocid="corridas.search_input"
          />
        </div>
      </div>

      {/* Status filter tabs */}
      <div
        className="flex gap-1.5 flex-wrap mb-5"
        data-ocid="corridas.filter.tab"
      >
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => handleFilterChange(f.value)}
            data-ocid={`corridas.filter.${f.value}`}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border",
              statusFilter === f.value
                ? "bg-primary text-primary-foreground border-primary shadow-card"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/60",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3" data-ocid="corridas.loading_state">
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
              <Skeleton key={k} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3"
            data-ocid="corridas.empty_state"
          >
            <Car size={40} className="text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm font-medium">
              Nenhuma corrida encontrada
            </p>
            {statusFilter !== "todos" && (
              <button
                type="button"
                onClick={() => handleFilterChange("todos")}
                className="text-xs text-primary hover:underline"
              >
                Limpar filtro
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="corridas.table">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[100px]">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[90px]">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">
                    Origem → Destino
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[130px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground w-[100px]">
                    Valor
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden lg:table-cell w-[130px]">
                    Data/Hora
                  </th>
                  <th className="px-3 py-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {paginated.map((ride, i) => {
                  const isExpanded = expandedId === ride.id;
                  const rowIndex = (safePage - 1) * PAGE_SIZE + i + 1;
                  return (
                    <React.Fragment key={ride.id}>
                      <tr
                        className={cn(
                          "border-b border-border last:border-0 transition-colors",
                          isExpanded
                            ? "bg-muted/30 border-b-0"
                            : "hover:bg-muted/20",
                        )}
                        data-ocid={`corridas.item.${rowIndex}`}
                      >
                        <td className="px-4 py-3">
                          <TypeIcon type={ride.type} />
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          #{ride.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {ride.clientName}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                            <span className="truncate max-w-[110px]">
                              {ride.origin}
                            </span>
                            <span className="text-muted-foreground/40 shrink-0">
                              →
                            </span>
                            <span className="truncate max-w-[110px]">
                              {ride.destination}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={getRideStatusColor(ride.status)}>
                            {getRideStatusLabel(ride.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium tabular-nums text-foreground">
                          {formatCurrency(ride.fare)}
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                          {formatDate(ride.createdAt)}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => toggleRow(ride.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleRow(ride.id);
                              }
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                            aria-label={
                              isExpanded ? "Fechar detalhes" : "Ver detalhes"
                            }
                            aria-expanded={isExpanded}
                            data-ocid={`corridas.expand_button.${rowIndex}`}
                          >
                            {isExpanded ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <ExpandedDetails
                          key={`${ride.id}-details`}
                          ride={ride}
                          onClose={() => setExpandedId(null)}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer: summary + pagination */}
      {!isLoading && filtered.length > 0 && (
        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Summary */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{filtered.length} corridas</span>
            <span>•</span>
            <span>
              Total:{" "}
              <span className="text-foreground font-medium">
                {formatCurrency(filtered.reduce((sum, r) => sum + r.fare, 0))}
              </span>
            </span>
            <Badge variant="outline" className="text-xs py-0">
              Ao vivo
            </Badge>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="sm:ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="text-xs h-7 px-3"
                data-ocid="corridas.pagination_prev"
              >
                Anterior
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums">
                {safePage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="text-xs h-7 px-3"
                data-ocid="corridas.pagination_next"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
