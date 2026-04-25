import { Skeleton } from "@/components/ui/skeleton";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy pages ───────────────────────────────────────────────────────────────
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const Corridas = lazy(() =>
  import("@/pages/Corridas").then((m) => ({ default: m.Corridas })),
);
const Motoristas = lazy(() =>
  import("@/pages/Motoristas").then((m) => ({ default: m.Motoristas })),
);
const Usuarios = lazy(() =>
  import("@/pages/Usuarios").then((m) => ({ default: m.Usuarios })),
);
const Configuracoes = lazy(() =>
  import("@/pages/Configuracoes").then((m) => ({ default: m.Configuracoes })),
);

// ─── Loading fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  ),
});

const corridasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corridas",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Corridas />
    </Suspense>
  ),
});

const motoristasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/motoristas",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Motoristas />
    </Suspense>
  ),
});

const usuariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/usuarios",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Usuarios />
    </Suspense>
  ),
});

const financeiroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/financeiro",
  component: () => (
    <PlaceholderPage
      title="Financeiro"
      description="Relatórios de receita, repasse para motoristas e histórico de pagamentos estarão disponíveis em breve."
    />
  ),
});

const avaliacoesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/avaliacoes",
  component: () => (
    <PlaceholderPage
      title="Avaliações"
      description="Sistema de avaliações de motoristas e clientes estará disponível em breve."
    />
  ),
});

const promocoesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/promocoes",
  component: () => (
    <PlaceholderPage
      title="Promoções"
      description="Gerenciamento de cupons e promoções para clientes estará disponível em breve."
    />
  ),
});

const configuracoesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/configuracoes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Configuracoes />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  corridasRoute,
  motoristasRoute,
  usuariosRoute,
  financeiroRoute,
  avaliacoesRoute,
  promocoesRoute,
  configuracoesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
