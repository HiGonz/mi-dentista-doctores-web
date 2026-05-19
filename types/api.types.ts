export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DashboardStats {
  citasHoy: number
  pacientesAtendidos: number
  citasPendientes: number
  ingresosDia: number
  proximaCita: import('./appointment.types').Appointment | null
}
