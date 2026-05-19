export interface ContactoEmergencia {
  nombre: string
  relacion: string
  telefono: string
}

export interface Patient {
  id: string
  nombre: string
  apellidos: string | null
  email: string | null
  telefono: string | null
  fechaNacimiento: string | null
  genero: 'M' | 'F' | 'otro' | null
  foto: string | null
  tipoSangre: string | null
  ultimaVisita: string | null
  proximaCita: string | null
  totalVisitas: number | null
  saldo: number
  expediente: string | null
  contactoEmergencia: ContactoEmergencia | null
  creadoEn: string
}

export interface Alergia {
  sustancia: string
  reaccion: string
  severidad: string
  notas: string | null
}

export interface Medicamento {
  nombre: string
  dosis: string
  frecuencia: string
  inicio: string
  fin: string | null
  notas: string | null
}

export interface Condicion {
  nombre: string
  status: string
  fechaDiagnostico: string
  notas: string | null
}

export interface Habito {
  tipo: string
  descripcion: string
  frecuencia: string
  desde: string
}

export interface NotaClinica {
  id: number
  nota: string
  importancia: string
  fecha: string
}

export interface FotoClinica {
  id: number
  url: string
  categoria: string
  notas: string | null
  fecha: string | null
}

export interface SignosVitales {
  presionArterial: string
  frecuenciaCardiaca: string
  glucosa: string
  peso: string
  registradoEn: string
}

export interface ExpedienteClinico {
  id: number
  status: string
  actualizadoEn: string
  alergias: Alergia[]
  medicamentos: Medicamento[]
  condiciones: Condicion[]
  habitos: Habito[]
  notasClinicas: NotaClinica[]
  fotos: FotoClinica[]
  ultimosSignosVitales: SignosVitales | null
}

export interface PatientDetail extends Patient {
  notas: { id: number; nota: string; importancia: 'alta' | 'media' | 'baja'; fecha: string }[]
  expedienteClinico: ExpedienteClinico | null
}
