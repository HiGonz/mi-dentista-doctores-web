export interface Doctor {
  id: string
  nombre: string
  apellidos: string | null
  email: string
  telefono: string | null
  especialidad: string | null
  cedulaProfesional: string | null
  foto: string | null
  universidad: string | null
  anoEgreso: number | null
  clinica: { id: string; nombre: string; logo: string | null }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: Doctor
}
