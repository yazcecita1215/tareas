export type TaskPriority = 'baja' | 'media' | 'alta';
export type TaskStatus = 'pendiente' | 'completada';
export type UserRole = 'usuario' | 'administrador';

export interface User {
  uid: string;
  nombre: string;
  correo: string;
  rol: UserRole;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string; // ISO string
  avatarUrl?: string;
}

export interface Task {
  taskId: string;
  ownerUid: string;
  titulo: string;
  descripcion: string;
  prioridad: TaskPriority;
  estado: TaskStatus;
  fechaLimite: string | null; // Format YYYY-MM-DD
  fechaCreacion: string; // ISO string
  fechaActualizacion: string; // ISO string
}

export interface TaskStats {
  total: number;
  pendientes: number;
  completadas: number;
  porcentajeCompletado: number;
  alta: number;
  media: number;
  baja: number;
  vencidas: number;
}
