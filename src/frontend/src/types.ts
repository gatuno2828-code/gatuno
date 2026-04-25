// ─── Domain Types ────────────────────────────────────────────────────────────

export type RideStatus =
  | "procurando"
  | "a_caminho"
  | "em_andamento"
  | "concluida"
  | "cancelada";

export type RideType = "corrida" | "entrega";

export interface Ride {
  id: string;
  clientName: string;
  driverName: string;
  origin: string;
  destination: string;
  status: RideStatus;
  type: RideType;
  fare: number;
  distanceKm: number;
  durationMinutes: number;
  createdAt: number; // Unix ms
  updatedAt: number;
}

export type DriverStatus = "online" | "offline" | "em_corrida";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  rating: number;
  totalRides: number;
  status: DriverStatus;
  lat: number;
  lng: number;
  neighborhood: string;
  joinedAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  totalSpent: number;
  rating: number;
  blocked: boolean;
  joinedAt: number;
  neighborhood: string;
}

export interface DashboardStats {
  activeRides: number;
  driversOnline: number;
  driversAvailable: number;
  todayRevenue: number;
  avgResponseMinutes: number;
  statusBreakdown: Record<RideStatus, number>;
  recentAlerts: Alert[];
}

export interface Alert {
  id: string;
  message: string;
  timestamp: number;
  severity: "info" | "warning" | "error";
}

export interface Settings {
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  serviceFeePercent: number;
  minFare: number;
  platformCommission: number;
  searchRadiusKm: number;
  acceptanceTimeoutSec: number;
  cancellationFeePercent: number;
  scheduledRide: boolean;
  shareRoute: boolean;
  multipleDestinations: boolean;
  showFareBeforeAccept: boolean;
  maintenanceMode: boolean;
}
