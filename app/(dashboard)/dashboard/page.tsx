import type { Metadata } from "next";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { NextAppointmentCard } from "@/components/dashboard/NextAppointmentCard";
import { TodayAppointmentsList } from "@/components/dashboard/TodayAppointmentsList";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardGreeting />

      <div>
        <p className="mb-3 text-base font-semibold text-neutral-900">
          Próxima Cita
        </p>
        <NextAppointmentCard />
      </div>

      <div>
        <p className="mb-3 text-base font-semibold text-neutral-900">
          Resumen del Día
        </p>
        <StatsGrid />
      </div>

      <TodayAppointmentsList />
    </div>
  );
}
