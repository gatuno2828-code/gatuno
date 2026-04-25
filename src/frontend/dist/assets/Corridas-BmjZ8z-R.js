import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, a as cn, S as Skeleton, C as Car, o, g as getRideStatusLabel, d as getRideStatusColor, f as formatCurrency, e as formatDate, X, h as Clock, i as calcFare } from "./index-Cnf9ohm-.js";
import { B as Badge } from "./badge-poSiDK2f.js";
import { B as Button, S as Separator } from "./separator-BikIZFIf.js";
import { I as Input } from "./input-DPYUSPlB.js";
import { a as useRides } from "./useBackend-BZl6GTZ-.js";
import { S as Search, C as ChevronUp, a as ChevronDown } from "./search-0B5r71qY.js";
import { U as User } from "./user-COjc6MXj.js";
import "./index-O5T0hZUd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
];
const Route = createLucideIcon("route", __iconNode);
const PAGE_SIZE = 10;
const STATUS_FILTERS = [
  { value: "todos", label: "Todas" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "a_caminho", label: "A caminho" },
  { value: "procurando", label: "Procurando" },
  { value: "concluida", label: "Finalizadas" },
  { value: "cancelada", label: "Canceladas" }
];
function TypeIcon({ type }) {
  return type === "entrega" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-blue-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 13, className: "shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Entrega" })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 13, className: "shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Corrida" })
  ] });
}
function DetailRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: value })
  ] });
}
function FareBreakdown({ ride }) {
  const base = 5;
  const kmCost = ride.distanceKm * 2.5;
  const timeCost = ride.durationMinutes * 0.5;
  const total = calcFare(ride.distanceKm, ride.durationMinutes);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 border border-border rounded-lg p-3 space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Detalhamento da Tarifa" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tarifa base" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatCurrency(base) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "Distância (",
        ride.distanceKm.toFixed(1),
        " km × R$ 2,50)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatCurrency(kmCost) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "Tempo (",
        ride.durationMinutes,
        " min × R$ 0,50)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatCurrency(timeCost) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1 bg-border/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(total) })
    ] })
  ] });
}
function ExpandedDetails({
  ride,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-0 pb-0 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/10 border-t border-b border-border px-6 py-5 animate-in slide-in-from-top-2 duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
        "Detalhes da Corrida",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground text-xs", children: [
          "#",
          ride.id
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Fechar detalhes",
          "data-ocid": "corridas.details.close_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "text-primary mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Cliente", value: ride.clientName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Car,
          {
            size: 14,
            className: "text-muted-foreground mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailRow,
          {
            label: "Motorista",
            value: ride.driverName || "Não atribuído"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Route,
          {
            size: 14,
            className: "text-muted-foreground mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailRow,
          {
            label: "Distância",
            value: `${ride.distanceKm.toFixed(1)} km`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Clock,
          {
            size: 14,
            className: "text-muted-foreground mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailRow,
          {
            label: "Duração",
            value: `${ride.durationMinutes} min`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-green-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Origem", value: ride.origin })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-red-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Destino", value: ride.destination })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FareBreakdown, { ride }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Criado em: ",
        formatDate(ride.createdAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Atualizado: ",
        formatDate(ride.updatedAt)
      ] })
    ] })
  ] }) }) });
}
function Corridas() {
  const { data: rides, isLoading } = useRides();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "todos"
  );
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const filtered = (rides ?? []).filter((ride) => {
    const matchesStatus = statusFilter === "todos" || ride.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || ride.id.includes(q) || ride.clientName.toLowerCase().includes(q) || ride.driverName.toLowerCase().includes(q) || ride.origin.toLowerCase().includes(q) || ride.destination.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  function handleFilterChange(val) {
    setStatusFilter(val);
    setPage(1);
    setExpandedId(null);
  }
  function handleSearchChange(val) {
    setSearch(val);
    setPage(1);
    setExpandedId(null);
  }
  function toggleRow(id) {
    setExpandedId((prev) => prev === id ? null : id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "corridas.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Corridas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Histórico e monitoramento de todas as corridas e entregas" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 15,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Buscar por ID, cliente, motorista, endereço...",
          value: search,
          onChange: (e) => handleSearchChange(e.target.value),
          className: "pl-9 bg-card border-border",
          "data-ocid": "corridas.search_input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1.5 flex-wrap mb-5",
        "data-ocid": "corridas.filter.tab",
        children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleFilterChange(f.value),
            "data-ocid": `corridas.filter.${f.value}`,
            className: cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border",
              statusFilter === f.value ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/60"
            ),
            children: f.label
          },
          f.value
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "corridas.loading_state", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-3",
        "data-ocid": "corridas.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 40, className: "text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Nenhuma corrida encontrada" }),
          statusFilter !== "todos" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleFilterChange("todos"),
              className: "text-xs text-primary hover:underline",
              children: "Limpar filtro"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "corridas.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[100px]", children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[90px]", children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "Cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell", children: "Origem → Destino" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[130px]", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-medium text-muted-foreground w-[100px]", children: "Valor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden lg:table-cell w-[130px]", children: "Data/Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 w-8" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.map((ride, i) => {
        const isExpanded = expandedId === ride.id;
        const rowIndex = (safePage - 1) * PAGE_SIZE + i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "border-b border-border last:border-0 transition-colors",
                isExpanded ? "bg-muted/30 border-b-0" : "hover:bg-muted/20"
              ),
              "data-ocid": `corridas.item.${rowIndex}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { type: ride.type }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                  "#",
                  ride.id
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: ride.clientName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[110px]", children: ride.origin }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 shrink-0", children: "→" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[110px]", children: ride.destination })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: getRideStatusColor(ride.status), children: getRideStatusLabel(ride.status) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium tabular-nums text-foreground", children: formatCurrency(ride.fare) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-xs text-muted-foreground whitespace-nowrap hidden lg:table-cell", children: formatDate(ride.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleRow(ride.id),
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleRow(ride.id);
                      }
                    },
                    className: "text-muted-foreground hover:text-foreground transition-colors p-0.5",
                    "aria-label": isExpanded ? "Fechar detalhes" : "Ver detalhes",
                    "aria-expanded": isExpanded,
                    "data-ocid": `corridas.expand_button.${rowIndex}`,
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14 })
                  }
                ) })
              ]
            }
          ),
          isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExpandedDetails,
            {
              ride,
              onClose: () => setExpandedId(null)
            },
            `${ride.id}-details`
          )
        ] }, ride.id);
      }) })
    ] }) }) }),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          filtered.length,
          " corridas"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Total:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatCurrency(filtered.reduce((sum, r) => sum + r.fare, 0)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs py-0", children: "Ao vivo" })
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: safePage <= 1,
            className: "text-xs h-7 px-3",
            "data-ocid": "corridas.pagination_prev",
            children: "Anterior"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
          safePage,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: safePage >= totalPages,
            className: "text-xs h-7 px-3",
            "data-ocid": "corridas.pagination_next",
            children: "Próxima"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Corridas
};
