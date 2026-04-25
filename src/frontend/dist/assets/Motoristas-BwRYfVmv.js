import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, S as Skeleton, U as Users, k as Star, D as DollarSign, f as formatCurrency, h as Clock, C as Car, e as formatDate } from "./index-Cnf9ohm-.js";
import { B as Badge } from "./badge-poSiDK2f.js";
import { I as Input } from "./input-DPYUSPlB.js";
import { S as Switch } from "./switch-DWj7YEhf.js";
import { c as useDrivers, d as useToggleDriverOnline } from "./useBackend-BZl6GTZ-.js";
import { S as Search, C as ChevronUp, a as ChevronDown } from "./search-0B5r71qY.js";
import "./index-O5T0hZUd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
const AVATAR_COLORS = [
  "bg-emerald-600",
  "bg-blue-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-indigo-600",
  "bg-orange-600"
];
function avatarColor(id) {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}
function statusInfo(status) {
  switch (status) {
    case "online":
      return { label: "Online", className: "badge-success" };
    case "em_corrida":
      return { label: "Em corrida", className: "badge-warning" };
    case "offline":
      return {
        label: "Offline",
        className: "badge-status bg-muted text-muted-foreground"
      };
    default:
      return { label: status, className: "badge-status" };
  }
}
function StarRating({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
    [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        size: 12,
        className: i <= Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30 fill-muted-foreground/30"
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-medium ml-0.5", children: value.toFixed(1) })
  ] });
}
function DriverDetail({ driver }) {
  const estimatedEarnings = driver.totalRides * 38.5 * (driver.rating / 5);
  const activeHours = Math.round(driver.totalRides * 0.42);
  const lastRideTs = Date.now() - 1e3 * 60 * (15 + driver.totalRides % 90);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { "data-ocid": `motoristas.detail.${driver.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "bg-muted/40 border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 14, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ganhos Totais" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatCurrency(estimatedEarnings) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, className: "text-blue-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Horas Ativas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
          activeHours,
          "h"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 14, className: "text-amber-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Última Corrida" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatDate(lastRideTs) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14, className: "text-violet-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cadastro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatDate(driver.joinedAt) })
      ] })
    ] })
  ] }) }) });
}
function DriverRow({
  driver,
  index,
  expanded,
  onToggleExpand
}) {
  const toggle = useToggleDriverOnline();
  const { label, className } = statusInfo(driver.status);
  const isOnline = driver.status !== "offline";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border hover:bg-muted/30 transition-colors",
        "data-ocid": `motoristas.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-9 h-9 rounded-full ${avatarColor(driver.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`,
                "aria-hidden": true,
                children: getInitials(driver.name)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: driver.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: driver.phone })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: driver.rating }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground tabular-nums", children: driver.totalRides.toLocaleString("pt-BR") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: driver.vehicle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: driver.plate })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: "px-4 py-3",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              "aria-label": "Alterar status",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: isOnline,
                  onCheckedChange: (checked) => toggle.mutate({ driverId: driver.id, online: checked }),
                  "data-ocid": `motoristas.toggle.${index + 1}`,
                  disabled: driver.status === "em_corrida",
                  "aria-label": `Alterar status de ${driver.name}`,
                  className: "data-[state=checked]:bg-primary"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-muted-foreground hover:text-foreground transition-colors rounded p-1 focus-visible:ring-2 focus-visible:ring-ring",
              "aria-label": expanded ? "Recolher detalhes" : "Ver detalhes",
              "data-ocid": expanded ? `motoristas.collapse.${index + 1}` : `motoristas.expand.${index + 1}`,
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand();
              },
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 })
            }
          ) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(DriverDetail, { driver })
  ] });
}
function StatCard({
  label,
  value,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-full ${accent} flex items-center justify-center shrink-0`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
    ] })
  ] });
}
function Motoristas() {
  const { data: drivers, isLoading } = useDrivers();
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const totalCount = (drivers == null ? void 0 : drivers.length) ?? 0;
  const onlineCount = (drivers == null ? void 0 : drivers.filter((d) => d.status === "online" || d.status === "em_corrida").length) ?? 0;
  const offlineCount = (drivers == null ? void 0 : drivers.filter((d) => d.status === "offline").length) ?? 0;
  const filtered = (drivers ?? []).filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase())
  );
  function toggleExpand(id) {
    setExpandedId((prev) => prev === id ? null : id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold text-foreground",
          "data-ocid": "motoristas.page",
          children: "Motoristas"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Gerenciamento e status da frota de motoristas" })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6",
        "data-ocid": "motoristas.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total de Motoristas",
              value: totalCount,
              accent: "bg-primary/15",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Online / Em corrida",
              value: onlineCount,
              accent: "bg-emerald-500/15",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 18, className: "text-emerald-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Offline",
              value: offlineCount,
              accent: "bg-muted-foreground/15",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 18, className: "text-muted-foreground" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 16,
          className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-10",
          placeholder: "Buscar motorista por nome...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "motoristas.search_input"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden shadow-card",
        "data-ocid": "motoristas.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Motorista" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell", children: "Avaliação" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell", children: "Corridas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell", children: "Veículo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Disponível" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-10" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 text-center",
                "data-ocid": "motoristas.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 24, className: "text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground", children: "Nenhum motorista encontrado" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tente buscar por outro nome" }),
                  search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "mt-4 text-sm text-primary hover:underline",
                      onClick: () => setSearch(""),
                      "data-ocid": "motoristas.clear_search_button",
                      children: "Limpar busca"
                    }
                  )
                ]
              }
            ) }) }) : filtered.map((driver, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DriverRow,
              {
                driver,
                index: i,
                expanded: expandedId === driver.id,
                onToggleExpand: () => toggleExpand(driver.id)
              },
              driver.id
            )) })
          ] }) }),
          filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-3 flex items-center justify-between bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: filtered.length === totalCount ? `${totalCount} motoristas no total` : `${filtered.length} de ${totalCount} motoristas` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mr-1.5 inline-block" }),
                onlineCount,
                " online"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5 inline-block" }),
                offlineCount,
                " offline"
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Motoristas
};
