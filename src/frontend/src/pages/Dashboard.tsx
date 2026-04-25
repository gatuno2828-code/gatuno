import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats, useRides, useUsers } from "@/hooks/useBackend";
import {
  formatCurrency,
  formatRelativeTime,
  getRideStatusColor,
  getRideStatusLabel,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Alert, DashboardStats, Ride } from "@/types";
import {
  AlertCircle,
  Car,
  DollarSign,
  Info,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  trend?: "up" | "down";
  trendLabel?: string;
  ocid: string;
}

function KpiCard({
  label,
  value,
  icon: Icon,
  iconBg,
  trend,
  trendLabel,
  ocid,
}: KpiCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth flex flex-col gap-3"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon size={16} className="text-primary-foreground" />
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground tracking-tight leading-none">
        {value}
      </p>
      {trend && trendLabel && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend === "up" ? "text-green-400" : "text-red-400",
          )}
        >
          {trend === "up" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}

// ─── 7-Day Revenue SVG Chart ──────────────────────────────────────────────────

const WEEK_DATA = [
  { day: "Seg", value: 980 },
  { day: "Ter", value: 1120 },
  { day: "Qua", value: 870 },
  { day: "Qui", value: 1340 },
  { day: "Sex", value: 1580 },
  { day: "Sáb", value: 1820 },
  { day: "Dom", value: 1251 },
];

function RevenueChart() {
  const W = 560;
  const H = 140;
  const PAD = { top: 12, right: 16, bottom: 28, left: 52 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...WEEK_DATA.map((d) => d.value));
  const minVal = Math.min(...WEEK_DATA.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const pts = WEEK_DATA.map((d, i) => ({
    x: PAD.left + (i / (WEEK_DATA.length - 1)) * chartW,
    y: PAD.top + (1 - (d.value - minVal) / range) * chartH,
    value: d.value,
    day: d.day,
  }));

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");

  // Filled area path
  const areaPath = [
    `M ${pts[0].x} ${PAD.top + chartH}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${PAD.top + chartH}`,
    "Z",
  ].join(" ");

  // Y-axis gridlines (3 levels)
  const yLevels = [0, 0.5, 1].map((t) => ({
    y: PAD.top + t * chartH,
    label: maxVal - t * range,
  }));

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
      data-ocid="dashboard.revenue.chart"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Última semana</h2>
        <span className="text-xs text-muted-foreground">
          Faturamento diário
        </span>
      </div>
      <div className="px-4 pt-3 pb-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: H }}
          aria-label="Gráfico de faturamento — últimos 7 dias"
          role="img"
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity="0.28"
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {yLevels.map((lvl) => (
            <g key={lvl.y}>
              <line
                x1={PAD.left}
                y1={lvl.y}
                x2={W - PAD.right}
                y2={lvl.y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 6}
                y={lvl.y + 4}
                textAnchor="end"
                fontSize="9"
                fill="currentColor"
                fillOpacity="0.45"
              >
                {`R$ ${Math.round(lvl.label)}`}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#revenueGrad)" />

          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points + day labels */}
          {pts.map((p) => (
            <g key={p.day}>
              <circle cx={p.x} cy={p.y} r={4} fill="var(--color-primary)" />
              <circle
                cx={p.x}
                cy={p.y}
                r={7}
                fill="var(--color-primary)"
                fillOpacity="0.18"
              />
              <text
                x={p.x}
                y={H - 4}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                fillOpacity="0.55"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Ride["status"] }) {
  return (
    <span className={getRideStatusColor(status)}>
      {getRideStatusLabel(status)}
    </span>
  );
}

// ─── Ride Feed Row ────────────────────────────────────────────────────────────

function RideFeedRow({ ride, index }: { ride: Ride; index: number }) {
  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in"
      data-ocid={`dashboard.ride.item.${index + 1}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <td className="px-4 py-3 text-sm text-foreground font-medium truncate max-w-[120px]">
        {ride.clientName}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">
        <span className="truncate block max-w-[90px]">
          {ride.origin.split(" - ")[1] ?? ride.origin.split(",")[0]}
        </span>
        <span className="text-muted-foreground/50 mx-1">→</span>
        <span className="truncate block max-w-[90px]">
          {ride.destination.split(" - ")[1] ?? ride.destination.split(",")[0]}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-foreground tabular-nums text-right">
        {formatCurrency(ride.fare)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={ride.status} />
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {formatRelativeTime(ride.createdAt)}
      </td>
    </tr>
  );
}

// ─── Status Breakdown ─────────────────────────────────────────────────────────

function StatusBreakdown({
  breakdown,
}: { breakdown: DashboardStats["statusBreakdown"] }) {
  const items: Array<{
    label: string;
    key: keyof typeof breakdown;
    color: string;
  }> = [
    { label: "Em andamento", key: "em_andamento", color: "bg-yellow-500" },
    { label: "A caminho", key: "a_caminho", color: "bg-blue-500" },
    { label: "Procurando", key: "procurando", color: "bg-orange-500" },
    { label: "Concluídas", key: "concluida", color: "bg-primary" },
    { label: "Canceladas", key: "cancelada", color: "bg-red-500" },
  ];

  return (
    <div className="space-y-2 mt-1">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
          <span className="flex-1">{item.label}</span>
          <span className="font-semibold text-foreground tabular-nums">
            {breakdown[item.key]}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Alert Item ───────────────────────────────────────────────────────────────

function AlertItem({ alert }: { alert: Alert }) {
  const Icon = alert.severity === "warning" ? AlertCircle : Info;
  const iconClass =
    alert.severity === "warning" ? "text-yellow-500" : "text-blue-400";
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="mt-0.5 shrink-0">
        <Icon size={13} className={iconClass} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-foreground leading-relaxed line-clamp-2">
          {alert.message}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {formatRelativeTime(alert.timestamp)}
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: rides, isLoading: ridesLoading } = useRides();
  const { data: users } = useUsers();

  const recentRides = rides?.slice(0, 10) ?? [];
  const totalUsers = users?.length ?? 0;

  return (
    <Layout>
      {/* Page header */}
      <div className="mb-6" data-ocid="dashboard.page">
        <h1 className="text-2xl font-bold text-foreground">
          Dashboard de Gerenciamento
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitoramento em tempo real — corridas, motoristas e entregas
        </p>
      </div>

      {/* ── KPI Cards ── */}
      {statsLoading || !stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <KpiCard
            label="Corridas hoje"
            value={`${stats.activeRides + stats.statusBreakdown.concluida}`}
            icon={Car}
            iconBg="bg-primary"
            trend="up"
            trendLabel="+12% vs ontem"
            ocid="dashboard.kpi.corridas"
          />
          <KpiCard
            label="Motoristas online"
            value={`${stats.driversOnline}`}
            icon={User}
            iconBg="bg-blue-600"
            trend="up"
            trendLabel={`${stats.driversAvailable} disponíveis`}
            ocid="dashboard.kpi.motoristas"
          />
          <KpiCard
            label="Usuários cadastrados"
            value={`${totalUsers}`}
            icon={Users}
            iconBg="bg-orange-600"
            trend="up"
            trendLabel="+3 esta semana"
            ocid="dashboard.kpi.usuarios"
          />
          <KpiCard
            label="Faturamento hoje"
            value={formatCurrency(stats.todayRevenue)}
            icon={DollarSign}
            iconBg="bg-green-700"
            trend="up"
            trendLabel="+8% vs ontem"
            ocid="dashboard.kpi.faturamento"
          />
        </div>
      )}

      {/* ── Revenue Chart ── */}
      <div className="mb-6">
        <RevenueChart />
      </div>

      {/* ── Main grid: rides feed + sidebar ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* Rides live feed table */}
        <div
          className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
          data-ocid="dashboard.rides.table"
        >
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">
              Corridas em tempo real
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ao vivo
            </div>
          </div>

          {ridesLoading ? (
            <div className="p-5 space-y-3">
              {["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => (
                <Skeleton key={k} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Origem → Destino
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                      Valor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                      Hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map((ride, i) => (
                    <RideFeedRow key={ride.id} ride={ride} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar: Status breakdown + Alerts */}
        <div className="space-y-4">
          {stats && (
            <div className="bg-card border border-border rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground text-sm mb-3">
                Status da Frota
              </h3>
              <StatusBreakdown breakdown={stats.statusBreakdown} />
            </div>
          )}

          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">
                Alertas Recentes
              </h3>
            </div>
            <div className="px-5" data-ocid="dashboard.alerts.list">
              {stats?.recentAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
