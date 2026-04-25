import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, U as Users, S as Skeleton, o, a as cn, e as formatDate, f as formatCurrency, k as Star } from "./index-Cnf9ohm-.js";
import { I as Input } from "./input-DPYUSPlB.js";
import { b as useUsers } from "./useBackend-BZl6GTZ-.js";
import { T as TrendingUp } from "./trending-up-D79_DyPl.js";
import { S as Search, C as ChevronUp, a as ChevronDown } from "./search-0B5r71qY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
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
  "bg-pink-600"
];
function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = hash * 31 + name.charCodeAt(i) & 4294967295;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}
function StatCard({ label, value, icon, sub }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-primary/10 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums leading-tight", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function ExpandedRow({
  totalRides,
  totalSpent,
  rating,
  phone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 pb-4 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 pl-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Total de Corridas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold text-sm tabular-nums", children: [
        totalRides,
        " corridas"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Total Gasto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold text-sm tabular-nums", children: formatCurrency(totalSpent) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Avaliação Média" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-yellow-400 font-semibold text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, fill: "currentColor" }),
        rating.toFixed(1)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Telefone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-foreground font-semibold text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12, className: "text-muted-foreground" }),
        phone
      ] })
    ] })
  ] }) }) });
}
function Usuarios() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const totalUsers = (users == null ? void 0 : users.length) ?? 0;
  const oneWeekAgo = Date.now() - 1e3 * 60 * 60 * 24 * 7;
  const newThisWeek = reactExports.useMemo(
    () => (users ?? []).filter((u) => u.joinedAt >= oneWeekAgo).length,
    [users, oneWeekAgo]
  );
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users ?? [];
    return (users ?? []).filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);
  function toggleExpand(id) {
    setExpandedId((prev) => prev === id ? null : id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "usuarios.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Usuários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Base de clientes cadastrados na plataforma" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total de Usuários",
          value: isLoading ? "—" : totalUsers,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18 }),
          sub: "clientes na plataforma"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Novos esta Semana",
          value: isLoading ? "—" : newThisWeek,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
          sub: "cadastros nos últimos 7 dias"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 15,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Buscar por nome ou e-mail...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 bg-card border-border",
          "data-ocid": "usuarios.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "usuarios.loading_state", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-3",
        "data-ocid": "usuarios.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 40, className: "text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Nenhum usuário encontrado" }),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Tente buscar com outro nome ou e-mail" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "usuarios.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground w-[280px]", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap", children: "Data de Cadastro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-medium text-muted-foreground", children: "Corridas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-medium text-muted-foreground w-10" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((user, i) => {
        const isExpanded = expandedId === user.id;
        const avatarBg = getAvatarColor(user.name);
        const initial = user.name.charAt(0).toUpperCase();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "border-b border-border transition-colors cursor-pointer",
                isExpanded ? "bg-muted/20" : "hover:bg-muted/10 last:border-0"
              ),
              onClick: () => toggleExpand(user.id),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ")
                  toggleExpand(user.id);
              },
              tabIndex: 0,
              "aria-expanded": isExpanded,
              "data-ocid": `usuarios.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                        avatarBg
                      ),
                      "aria-hidden": "true",
                      children: initial
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: user.name }),
                    user.blocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-cancel text-[10px] px-1.5 py-0.5", children: "Bloqueado" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground truncate max-w-[200px]", children: user.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatDate(user.joinedAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-muted-foreground text-sm font-medium", children: user.totalRides }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": isExpanded ? "Recolher" : "Expandir",
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    "data-ocid": `usuarios.expand.${i + 1}`,
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
                  }
                ) })
              ]
            },
            user.id
          ),
          isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExpandedRow,
            {
              totalRides: user.totalRides,
              totalSpent: user.totalSpent,
              rating: user.rating,
              phone: user.phone
            },
            `${user.id}-expanded`
          )
        ] }, user.id);
      }) })
    ] }) }) }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        filtered.length,
        " de ",
        totalUsers,
        " usuários"
      ] }),
      search && filtered.length !== totalUsers && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "text-primary hover:underline",
            "data-ocid": "usuarios.clear_search",
            children: "Limpar busca"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Usuarios
};
