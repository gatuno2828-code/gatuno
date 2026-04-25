import { Layout } from "@/components/Layout";
import { Clock } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
        data-ocid="placeholder.section"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center shadow-card">
          <Clock size={36} className="text-primary" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Em breve
        </div>
      </div>
    </Layout>
  );
}
