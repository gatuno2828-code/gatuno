import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RideStatus } from "../types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Currency ─────────────────────────────────────────────────────────────────
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ─── Date ─────────────────────────────────────────────────────────────────────
export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "Agora mesmo";
  if (minutes < 60) return `${minutes} min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  return formatDate(timestamp);
}

// ─── Ride status labels ───────────────────────────────────────────────────────
const statusLabels: Record<RideStatus, string> = {
  procurando: "Procurando",
  a_caminho: "A caminho",
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export function getRideStatusLabel(status: RideStatus): string {
  return statusLabels[status] ?? status;
}

export function getRideStatusColor(status: RideStatus): string {
  switch (status) {
    case "procurando":
      return "badge-pending";
    case "a_caminho":
      return "badge-info";
    case "em_andamento":
      return "badge-warning";
    case "concluida":
      return "badge-success";
    case "cancelada":
      return "badge-cancel";
    default:
      return "badge-status";
  }
}

// ─── Fare calculation ─────────────────────────────────────────────────────────
export function calcFare(km: number, minutes: number): number {
  return 5 + km * 2.5 + minutes * 0.5;
}
