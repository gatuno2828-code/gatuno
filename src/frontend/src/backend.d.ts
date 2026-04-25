import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Ride {
    id: bigint;
    status: RideStatus;
    destination: string;
    clientName: string;
    fare: number;
    origin: string;
    distanceKm: number;
    durationMinutes: number;
    timestamp: bigint;
}
export interface SettingsPublic {
    serviceFeePercent: number;
    features: Features;
    searchRadiusKm: number;
    minimumFare: number;
    acceptTimeoutSeconds: bigint;
    cancellationFee: number;
    perKm: number;
    perMinute: number;
    baseFare: number;
}
export interface DriverPublic {
    id: bigint;
    name: string;
    isOnline: boolean;
    earnings: number;
    vehicle: string;
    rating: number;
    totalRides: bigint;
}
export interface User {
    id: bigint;
    name: string;
    email: string;
    totalSpent: number;
    registrationDate: bigint;
    totalRides: bigint;
}
export interface DashboardStats {
    onlineDrivers: bigint;
    ridesToday: bigint;
    revenueToday: number;
    totalUsers: bigint;
}
export interface Features {
    shareRoute: boolean;
    showPriceBeforeAccept: boolean;
    scheduledRides: boolean;
    multipleDestinations: boolean;
}
export enum RideStatus {
    cancelada = "cancelada",
    concluida = "concluida",
    em_andamento = "em_andamento",
    searching = "searching",
    em_rota = "em_rota"
}
export interface backendInterface {
    getDashboardStats(): Promise<DashboardStats>;
    getDrivers(): Promise<Array<DriverPublic>>;
    getRides(): Promise<Array<Ride>>;
    getSettings(): Promise<SettingsPublic>;
    getUsers(): Promise<Array<User>>;
    toggleDriverOnline(id: bigint): Promise<boolean>;
    updateSettings(update: SettingsPublic): Promise<void>;
}
