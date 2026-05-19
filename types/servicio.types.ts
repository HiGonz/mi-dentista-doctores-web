export interface ServicioCategoria {
  id: number
  nombre: string
}

export interface Servicio {
  id: string | number
  nombre: string
  precio?: number
  duracion?: number
  descripcion?: string | null
  imagen?: string | null
  branchId?: number | null
  categoria?: ServicioCategoria | null
}
