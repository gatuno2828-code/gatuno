import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useBackend";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useMemo, useState } from "react";

// ─── Avatar palette — 10 distinct OKLCH-mapped Tailwind bg classes ────────────
const AVATAR_PALETTE = [
  "bg-purple-600",
  "bg-blue-600",
  "bg-teal-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-emerald-600",
  "bg-indigo-600",
  "bg-orange-600",
  "bg-cyan-600",
  "bg-pink-600",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  sub?: string;
}

function StatCard({ label, value, icon, sub }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4">
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground tabular-nums leading-tight">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Expanded user detail panel ───────────────────────────────────────────────
interface ExpandedRowProps {
  totalRides: number;
  totalSpent: number;
  rating: number;
  phone: string;
}

function ExpandedRow({
  totalRides,
  totalSpent,
  rating,
  phone,
}: ExpandedRowProps) {
  return (
    <tr className="bg-muted/10">
      <td colSpan={5} className="px-4 pb-4 pt-1">
        <div className="flex flex-wrap gap-6 pl-12">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Total de Corridas
            </span>
            <span className="text-foreground font-semibold text-sm tabular-nums">
              {totalRides} corridas
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Total Gasto
            </span>
            <span className="text-foreground font-semibold text-sm tabular-nums">
              {formatCurrency(totalSpent)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Avaliação Média
            </span>
            <span className="inline-flex items-center gap-1 text-yellow-400 font-semibold text-sm">
              <Star size={13} fill="currentColor" />
              {rating.toFixed(1)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Telefone
            </span>
            <span className="inline-flex items-center gap-1 text-foreground font-semibold text-sm">
              <Phone size={12} className="text-muted-foreground" />
              {phone}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function Usuarios() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Stats derived from the full user list
  const totalUsers = users?.length ?? 0;
  const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
  const newThisWeek = useMemo(
    () => (users ?? []).filter((u) => u.joinedAt >= oneWeekAgo).length,
    [users, oneWeekAgo],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users ?? [];
    return (users ?? []).filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <Layout>
      {/* Page header */}
      <div className="mb-6" data-ocid="usuarios.page">
        <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Base de clientes cadastrados na plataforma
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <StatCard
          label="Total de Usuários"
          value={isLoading ? "—" : totalUsers}
          icon={<Users size={18} />}
          sub="clientes na plataforma"
        />
        <StatCard
          label="Novos esta Semana"
          value={isLoading ? "—" : newThisWeek}
          icon={<TrendingUp size={18} />}
          sub="cadastros nos últimos 7 dias"
        />
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
          data-ocid="usuarios.search_input"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3" data-ocid="usuarios.loading_state">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <Skeleton key={k} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3"
            data-ocid="usuarios.empty_state"
          >
            <Users size={40} className="text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm font-medium">
              Nenhum usuário encontrado
            </p>
            {search && (
              <p className="text-muted-foreground text-xs">
                Tente buscar com outro nome ou e-mail
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="usuarios.table">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[280px]">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    E-mail
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">
                    Data de Cadastro
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                    Corridas
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => {
                  const isExpanded = expandedId === user.id;
                  const avatarBg = getAvatarColor(user.name);
                  const initial = user.name.charAt(0).toUpperCase();

                  return (
                    <React.Fragment key={user.id}>
                      <tr
                        key={user.id}
                        className={cn(
                          "border-b border-border transition-colors cursor-pointer",
                          isExpanded
                            ? "bg-muted/20"
                            : "hover:bg-muted/10 last:border-0",
                        )}
                        onClick={() => toggleExpand(user.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            toggleExpand(user.id);
                        }}
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        data-ocid={`usuarios.item.${i + 1}`}
                      >
                        {/* Avatar + Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={cn(
                                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                                avatarBg,
                              )}
                              aria-hidden="true"
                            >
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {user.name}
                              </p>
                              {user.blocked && (
                                <span className="badge-cancel text-[10px] px-1.5 py-0.5">
                                  Bloqueado
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[200px]">
                          {user.email}
                        </td>

                        {/* Joined date */}
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(user.joinedAt)}
                        </td>

                        {/* Total rides */}
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground text-sm font-medium">
                          {user.totalRides}
                        </td>

                        {/* Expand toggle */}
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            aria-label={isExpanded ? "Recolher" : "Expandir"}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            data-ocid={`usuarios.expand.${i + 1}`}
                          >
                            {isExpanded ? (
                              <ChevronUp size={15} />
                            ) : (
                              <ChevronDown size={15} />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <ExpandedRow
                          key={`${user.id}-expanded`}
                          totalRides={user.totalRides}
                          totalSpent={user.totalSpent}
                          rating={user.rating}
                          phone={user.phone}
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

      {/* Footer summary */}
      {!isLoading && (
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {filtered.length} de {totalUsers} usuários
          </span>
          {search && filtered.length !== totalUsers && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-primary hover:underline"
                data-ocid="usuarios.clear_search"
              >
                Limpar busca
              </button>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
