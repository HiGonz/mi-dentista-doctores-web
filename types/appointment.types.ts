export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Appointment {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  duracion: number;
  status: AppointmentStatus;
  motivo: string;
  notas: string | null;
  saldo: number;
  paciente: {
    id: string;
    nombre: string;
    apellidos: string | null;
    foto: string | null;
    telefono: string | null;
  };
  servicios: { id: string; nombre: string; precio: number }[];
}
