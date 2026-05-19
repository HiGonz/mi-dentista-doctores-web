"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuthStore } from "@/store/auth.store";
import { Avatar } from "@/components/ui/Avatar";
import { capitalizeFirst } from "@/lib/utils";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export function DashboardGreeting() {
  const { user } = useAuthStore();
  const today = capitalizeFirst(
    format(new Date(), "EEEE d 'de' MMMM, yyyy", { locale: es }),
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-neutral-500">{getGreeting()},</p>
        <h1 className="text-2xl font-bold text-neutral-900">
          Dr. {user?.apellidos ?? user?.nombre ?? ""}
        </h1>
        <p className="mt-0.5 text-sm text-neutral-400">{today}</p>
      </div>
      {user && (
        <Avatar
          nombre={user.nombre}
          apellidos={user.apellidos}
          foto={user.foto}
          size="lg"
        />
      )}
    </div>
  );
}
