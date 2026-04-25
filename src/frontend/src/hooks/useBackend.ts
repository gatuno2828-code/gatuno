import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  mockDashboardStats,
  mockDrivers,
  mockRides,
  mockSettings,
  mockUsers,
} from "../mockData";
import type { Driver, Settings } from "../types";

const POLL_INTERVAL = 4000; // 4 seconds for live updates

// ─── Rides ────────────────────────────────────────────────────────────────────
export function useRides() {
  return useQuery({
    queryKey: ["rides"],
    queryFn: async () => mockRides,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0,
  });
}

// ─── Drivers ─────────────────────────────────────────────────────────────────
export function useDrivers() {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => mockDrivers,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0,
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => mockUsers,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0,
  });
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => mockDashboardStats,
    refetchInterval: POLL_INTERVAL,
    staleTime: 0,
  });
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => mockSettings,
    staleTime: 30_000,
  });
}

// ─── Toggle Driver Online ─────────────────────────────────────────────────────
export function useToggleDriverOnline() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      driverId,
      online,
    }: { driverId: string; online: boolean }) => {
      // In production, call actor.toggleDriverOnline(driverId, online)
      return { driverId, online };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}

// ─── Update Settings ──────────────────────────────────────────────────────────
export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: Settings) => {
      // In production, call actor.updateSettings(settings)
      return settings;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

// ─── Update Driver (local mutation) ──────────────────────────────────────────
export function useDriverMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (driver: Partial<Driver> & { id: string }) => driver,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
