import { c as createLucideIcon, j as jsxRuntimeExports, L as Layout, S as Skeleton, C as Car, U as Users, D as DollarSign, f as formatCurrency, a as cn, b as formatRelativeTime, g as getRideStatusLabel, d as getRideStatusColor } from "./index-Cnf9ohm-.js";
import { u as useDashboardStats, a as useRides, b as useUsers } from "./useBackend-BZl6GTZ-.js";
import { U as User } from "./user-COjc6MXj.js";
import { T as TrendingUp } from "./trending-up-D79_DyPl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function KpiCard({
  label,
  value,
  icon: Icon,
  iconBg,
  trend,
  trendLabel,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth flex flex-col gap-3",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-lg", iconBg), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground tracking-tight leading-none", children: value }),
        trend && trendLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1 text-xs font-medium",
              trend === "up" ? "text-green-400" : "text-red-400"
            ),
            children: [
              trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: trendLabel })
            ]
          }
        )
      ]
    }
  );
}
const WEEK_DATA = [
  { day: "Seg", value: 980 },
  { day: "Ter", value: 1120 },
  { day: "Qua", value: 870 },
  { day: "Qui", value: 1340 },
  { day: "Sex", value: 1580 },
  { day: "Sáb", value: 1820 },
  { day: "Dom", value: 1251 }
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
    x: PAD.left + i / (WEEK_DATA.length - 1) * chartW,
    y: PAD.top + (1 - (d.value - minVal) / range) * chartH,
    value: d.value,
    day: d.day
  }));
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = [
    `M ${pts[0].x} ${PAD.top + chartH}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${PAD.top + chartH}`,
    "Z"
  ].join(" ");
  const yLevels = [0, 0.5, 1].map((t) => ({
    y: PAD.top + t * chartH,
    label: maxVal - t * range
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl shadow-card overflow-hidden",
      "data-ocid": "dashboard.revenue.chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Última semana" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Faturamento diário" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: `0 0 ${W} ${H}`,
            className: "w-full",
            style: { height: H },
            "aria-label": "Gráfico de faturamento — últimos 7 dias",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "revenueGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "0%",
                    stopColor: "var(--color-primary)",
                    stopOpacity: "0.28"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "100%",
                    stopColor: "var(--color-primary)",
                    stopOpacity: "0"
                  }
                )
              ] }) }),
              yLevels.map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: PAD.left,
                    y1: lvl.y,
                    x2: W - PAD.right,
                    y2: lvl.y,
                    stroke: "currentColor",
                    strokeOpacity: "0.08",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: PAD.left - 6,
                    y: lvl.y + 4,
                    textAnchor: "end",
                    fontSize: "9",
                    fill: "currentColor",
                    fillOpacity: "0.45",
                    children: `R$ ${Math.round(lvl.label)}`
                  }
                )
              ] }, lvl.y)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: "url(#revenueGrad)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "polyline",
                {
                  points: polyline,
                  fill: "none",
                  stroke: "var(--color-primary)",
                  strokeWidth: "2.5",
                  strokeLinejoin: "round",
                  strokeLinecap: "round"
                }
              ),
              pts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: p.x, cy: p.y, r: 4, fill: "var(--color-primary)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: 7,
                    fill: "var(--color-primary)",
                    fillOpacity: "0.18"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: p.x,
                    y: H - 4,
                    textAnchor: "middle",
                    fontSize: "10",
                    fill: "currentColor",
                    fillOpacity: "0.55",
                    children: p.day
                  }
                )
              ] }, p.day))
            ]
          }
        ) })
      ]
    }
  );
}
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: getRideStatusColor(status), children: getRideStatusLabel(status) });
}
function RideFeedRow({ ride, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/30 transition-colors animate-fade-in",
      "data-ocid": `dashboard.ride.item.${index + 1}`,
      style: { animationDelay: `${index * 40}ms` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground font-medium truncate max-w-[120px]", children: ride.clientName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[90px]", children: ride.origin.split(" - ")[1] ?? ride.origin.split(",")[0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 mx-1", children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[90px]", children: ride.destination.split(" - ")[1] ?? ride.destination.split(",")[0] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-semibold text-foreground tabular-nums text-right", children: formatCurrency(ride.fare) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ride.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatRelativeTime(ride.createdAt) })
      ]
    }
  );
}
function StatusBreakdown({
  breakdown
}) {
  const items = [
    { label: "Em andamento", key: "em_andamento", color: "bg-yellow-500" },
    { label: "A caminho", key: "a_caminho", color: "bg-blue-500" },
    { label: "Procurando", key: "procurando", color: "bg-orange-500" },
    { label: "Concluídas", key: "concluida", color: "bg-primary" },
    { label: "Canceladas", key: "cancelada", color: "bg-red-500" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 text-xs text-muted-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-2 h-2 rounded-full shrink-0", item.color) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: breakdown[item.key] })
      ]
    },
    item.key
  )) });
}
function AlertItem({ alert }) {
  const Icon = alert.severity === "warning" ? CircleAlert : Info;
  const iconClass = alert.severity === "warning" ? "text-yellow-500" : "text-blue-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, className: iconClass }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed line-clamp-2", children: alert.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: formatRelativeTime(alert.timestamp) })
    ] })
  ] });
}
function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: rides, isLoading: ridesLoading } = useRides();
  const { data: users } = useUsers();
  const recentRides = (rides == null ? void 0 : rides.slice(0, 10)) ?? [];
  const totalUsers = (users == null ? void 0 : users.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "dashboard.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Dashboard de Gerenciamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Monitoramento em tempo real — corridas, motoristas e entregas" })
    ] }),
    statsLoading || !stats ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Corridas hoje",
          value: `${stats.activeRides + stats.statusBreakdown.concluida}`,
          icon: Car,
          iconBg: "bg-primary",
          trend: "up",
          trendLabel: "+12% vs ontem",
          ocid: "dashboard.kpi.corridas"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Motoristas online",
          value: `${stats.driversOnline}`,
          icon: User,
          iconBg: "bg-blue-600",
          trend: "up",
          trendLabel: `${stats.driversAvailable} disponíveis`,
          ocid: "dashboard.kpi.motoristas"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Usuários cadastrados",
          value: `${totalUsers}`,
          icon: Users,
          iconBg: "bg-orange-600",
          trend: "up",
          trendLabel: "+3 esta semana",
          ocid: "dashboard.kpi.usuarios"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Faturamento hoje",
          value: formatCurrency(stats.todayRevenue),
          icon: DollarSign,
          iconBg: "bg-green-700",
          trend: "up",
          trendLabel: "+8% vs ontem",
          ocid: "dashboard.kpi.faturamento"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueChart, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl shadow-card overflow-hidden",
          "data-ocid": "dashboard.rides.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Corridas em tempo real" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-primary font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                "Ao vivo"
              ] })
            ] }),
            ridesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: ["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "Cliente" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "Origem → Destino" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-medium text-muted-foreground", children: "Valor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "Hora" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentRides.map((ride, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RideFeedRow, { ride, index: i }, ride.id)) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-3", children: "Status da Frota" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBreakdown, { breakdown: stats.statusBreakdown })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Alertas Recentes" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", "data-ocid": "dashboard.alerts.list", children: stats == null ? void 0 : stats.recentAlerts.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertItem, { alert }, alert.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard
};
