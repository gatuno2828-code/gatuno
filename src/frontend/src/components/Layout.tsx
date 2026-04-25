import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-6 lg:p-8 max-w-screen-2xl w-full mx-auto">
          {children}
        </main>
        <footer className="px-6 lg:px-8 py-4 border-t border-border bg-card/40">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Gatuno. Desenvolvido com{" "}
            <span className="text-destructive">♥</span> usando{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
