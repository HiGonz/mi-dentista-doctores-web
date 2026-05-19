import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { NextAppointmentCard } from '@/components/dashboard/NextAppointmentCard'
import { TodayAppointmentsList } from '@/components/dashboard/TodayAppointmentsList'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Resumen de tu actividad de hoy"
      />
      <StatsGrid />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <NextAppointmentCard />
        </div>
        <div className="lg:col-span-2">
          <TodayAppointmentsList />
        </div>
      </div>
    </div>
  )
}
