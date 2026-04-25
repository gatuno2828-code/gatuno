import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Car,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Star,
  Tag,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Corridas", href: "/corridas", icon: Car },
  { label: "Motoristas", href: "/motoristas", icon: UserCircle },
  { label: "Usuários", href: "/usuarios", icon: Users },
  { label: "Financeiro", href: "/financeiro", icon: DollarSign },
  { label: "Avaliações", href: "/avaliacoes", icon: Star },
  { label: "Promoções", href: "/promocoes", icon: Tag },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5"
          onClick={onClose}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-elevated">
            <span className="text-lg">🐱</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground">
            <span className="text-primary">G</span>ATUNO
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-sidebar-foreground transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav
        className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto"
        data-ocid="sidebar.nav"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              data-ocid={`sidebar.${item.href.slice(1)}.link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                isActive
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-sidebar-border pt-3">
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="sidebar.logout_button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-smooth"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        data-ocid="sidebar.mobile_menu_button"
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-card lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={20} className="text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Fechar menu"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>
    </>
  );
}
