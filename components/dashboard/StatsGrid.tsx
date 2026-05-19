'use client'

import { Calendar, Users, Clock, DollarSign } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { StatsGridSkeleton } from '@/components/ui/LoadingSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { useDashboard } from '@/hooks/useDashboard'

export function StatsGrid() {
  const { data, isLoading, error, refetch } = useDashboard()

  if (isLoading) return <StatsGridSkeleton />
  if (error) return <ErrorState onRetry={() => refetch()} />

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Citas hoy"
        value={data?.citasHoy ?? 0}
        icon={Calendar}
        iconColor="text-primary"
        iconBg="bg-primary-light"
      />
      <StatCard
        title="Pacientes atendidos"
        value={data?.pacientesAtendidos ?? 0}
        icon={Users}
        iconColor="text-secondary-dark"
        iconBg="bg-secondary-light"
      />
      <StatCard
        title="Citas pendientes"
        value={data?.citasPendientes ?? 0}
        icon={Clock}
        iconColor="text-accent"
        iconBg="bg-accent-light"
      />
      <StatCard
        title="Ingresos del día"
        value={data?.ingresosDia ?? 0}
        icon={DollarSign}
        iconColor="text-primary-dark"
        iconBg="bg-primary-light"
        isCurrency
      />
    </div>
  )
}
