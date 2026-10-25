import { User, Task } from '../types';

const STORAGE_KEY_TASKS = 'listo_tasks_v1';
const STORAGE_KEY_USERS = 'listo_users_v1';
const STORAGE_KEY_CURRENT_USER = 'listo_current_user_v1';

export const DEMO_USERS: User[] = [
  {
    uid: 'user_carlos_01',
    nombre: 'Carlos Méndez',
    correo: 'carlos.mendez@estudiante.edu',
    rol: 'usuario',
    estado: 'activo',
    fechaCreacion: '2026-10-20T10:00:00.000Z',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  {
    uid: 'user_laura_02',
    nombre: 'Laura Gómez',
    correo: 'laura.gomez@trabajo.com',
    rol: 'usuario',
    estado: 'activo',
    fechaCreacion: '2026-10-22T14:30:00.000Z',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
];

const INITIAL_TASKS: Task[] = [
  {
    taskId: 'task_001',
    ownerUid: 'user_carlos_01',
    titulo: 'Entregar reporte del MVP de LISTO',
    descripcion: 'Subir documentación final en formato PDF con capturas y diagramas de arquitectura.',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaLimite: '2026-10-26',
    fechaCreacion: '2026-10-24T09:00:00.000Z',
    fechaActualizacion: '2026-10-24T09:00:00.000Z',
  },
  {
    taskId: 'task_002',
    ownerUid: 'user_carlos_01',
    titulo: 'Revisar pruebas de accesibilidad y contraste',
    descripcion: 'Verificar la paleta verde #101714 y #35C878 en pantalla móvil y tamaño de fuente.',
    prioridad: 'media',
    estado: 'pendiente',
    fechaLimite: '2026-10-28',
    fechaCreacion: '2026-10-24T10:15:00.000Z',
    fechaActualizacion: '2026-10-24T10:15:00.000Z',
  },
  {
    taskId: 'task_003',
    ownerUid: 'user_carlos_01',
    titulo: 'Configurar Service Worker y Manifest PWA',
    descripcion: 'Validar registro en VitePWA con iconos 192x192 y 512x512 para instalación.',
    prioridad: 'alta',
    estado: 'completada',
    fechaLimite: '2026-10-24',
    fechaCreacion: '2026-10-23T11:00:00.000Z',
    fechaActualizacion: '2026-10-24T12:00:00.000Z',
  },
  {
    taskId: 'task_004',
    ownerUid: 'user_carlos_01',
    titulo: 'Comprar materiales para maqueta de laboratorio',
    descripcion: 'Comprar cartulina, marcadores y regla graduada.',
    prioridad: 'baja',
    estado: 'pendiente',
    fechaLimite: '2026-10-31',
    fechaCreacion: '2026-10-24T11:30:00.000Z',
    fechaActualizacion: '2026-10-24T11:30:00.000Z',
  },
  // Tasks for Laura to verify isolation (RF-12, PT-10)
  {
    taskId: 'task_005',
    ownerUid: 'user_laura_02',
    titulo: 'Preparar reunión mensual de equipo',
    descripcion: 'Revisar métricas de avance y coordinar prioridades del sprint.',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaLimite: '2026-10-25',
    fechaCreacion: '2026-10-24T08:00:00.000Z',
    fechaActualizacion: '2026-10-24T08:00:00.000Z',
  },
  {
    taskId: 'task_006',
    ownerUid: 'user_laura_02',
    titulo: 'Actualizar plantilla de presupuesto 2026',
    descripcion: 'Ajustar proyección de costos y licencias de software.',
    prioridad: 'media',
    estado: 'completada',
    fechaLimite: '2026-10-23',
    fechaCreacion: '2026-10-22T09:00:00.000Z',
    fechaActualizacion: '2026-10-23T16:00:00.000Z',
  },
];

class StorageService {
  private getStorageItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  private setStorageItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public initialize(): void {
    const existingUsers = this.getStorageItem<User[] | null>(STORAGE_KEY_USERS, null);
    if (!existingUsers || existingUsers.length === 0) {
      this.setStorageItem(STORAGE_KEY_USERS, DEMO_USERS);
    }

    const existingTasks = this.getStorageItem<Task[] | null>(STORAGE_KEY_TASKS, null);
    if (!existingTasks || existingTasks.length === 0) {
      this.setStorageItem(STORAGE_KEY_TASKS, INITIAL_TASKS);
    }
  }

  public getCurrentUser(): User | null {
    return this.getStorageItem<User | null>(STORAGE_KEY_CURRENT_USER, null);
  }

  public setCurrentUser(user: User | null): void {
    this.setStorageItem(STORAGE_KEY_CURRENT_USER, user);
  }

  public getUsers(): User[] {
    return this.getStorageItem<User[]>(STORAGE_KEY_USERS, DEMO_USERS);
  }

  public loginWithEmail(email: string, nombre?: string): User {
    const users = this.getUsers();
    let user = users.find(u => u.correo.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      user = {
        uid: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        nombre: nombre?.trim() || email.split('@')[0],
        correo: email.trim().toLowerCase(),
        rol: 'usuario',
        estado: 'activo',
        fechaCreacion: new Date().toISOString(),
      };
      users.push(user);
      this.setStorageItem(STORAGE_KEY_USERS, users);
    }

    this.setCurrentUser(user);
    return user;
  }

  public loginWithGoogle(nombre = 'Usuario Google', correo = 'usuario.google@gmail.com'): User {
    return this.loginWithEmail(correo, nombre);
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
  }

  public switchUser(uid: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.uid === uid);
    if (user) {
      this.setCurrentUser(user);
      return user;
    }
    return null;
  }

  // Tasks Management with Strict User Isolation (RF-12, PT-10)
  public getTasks(ownerUid: string): Task[] {
    const allTasks = this.getStorageItem<Task[]>(STORAGE_KEY_TASKS, INITIAL_TASKS);
    return allTasks
      .filter(t => t.ownerUid === ownerUid)
      .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
  }

  public createTask(ownerUid: string, data: {
    titulo: string;
    descripcion?: string;
    prioridad: 'baja' | 'media' | 'alta';
    fechaLimite?: string | null;
  }): Task {
    if (!data.titulo || !data.titulo.trim()) {
      throw new Error('El título de la tarea es obligatorio (Regla de negocio 1).');
    }

    const allTasks = this.getStorageItem<Task[]>(STORAGE_KEY_TASKS, INITIAL_TASKS);
    const now = new Date().toISOString();
    const newTask: Task = {
      taskId: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ownerUid,
      titulo: data.titulo.trim(),
      descripcion: (data.descripcion || '').trim(),
      prioridad: data.prioridad,
      estado: 'pendiente',
      fechaLimite: data.fechaLimite || null,
      fechaCreacion: now,
      fechaActualizacion: now,
    };

    allTasks.unshift(newTask);
    this.setStorageItem(STORAGE_KEY_TASKS, allTasks);
    return newTask;
  }

  public updateTask(ownerUid: string, taskId: string, updates: Partial<Omit<Task, 'taskId' | 'ownerUid' | 'fechaCreacion'>>): Task {
    const allTasks = this.getStorageItem<Task[]>(STORAGE_KEY_TASKS, INITIAL_TASKS);
    const index = allTasks.findIndex(t => t.taskId === taskId && t.ownerUid === ownerUid);
    
    if (index === -1) {
      throw new Error('No tienes permiso para modificar esta tarea o no existe (RF-12).');
    }

    if (updates.titulo !== undefined && !updates.titulo.trim()) {
      throw new Error('El título no puede estar vacío.');
    }

    const updatedTask: Task = {
      ...allTasks[index],
      ...updates,
      titulo: updates.titulo !== undefined ? updates.titulo.trim() : allTasks[index].titulo,
      descripcion: updates.descripcion !== undefined ? updates.descripcion.trim() : allTasks[index].descripcion,
      fechaActualizacion: new Date().toISOString(),
    };

    allTasks[index] = updatedTask;
    this.setStorageItem(STORAGE_KEY_TASKS, allTasks);
    return updatedTask;
  }

  public toggleTaskStatus(ownerUid: string, taskId: string): Task {
    const allTasks = this.getStorageItem<Task[]>(STORAGE_KEY_TASKS, INITIAL_TASKS);
    const index = allTasks.findIndex(t => t.taskId === taskId && t.ownerUid === ownerUid);

    if (index === -1) {
      throw new Error('No tienes permiso para modificar esta tarea (RF-12).');
    }

    const current = allTasks[index];
    const newStatus = current.estado === 'pendiente' ? 'completada' : 'pendiente';
    
    current.estado = newStatus;
    current.fechaActualizacion = new Date().toISOString();

    allTasks[index] = current;
    this.setStorageItem(STORAGE_KEY_TASKS, allTasks);
    return current;
  }

  public deleteTask(ownerUid: string, taskId: string): boolean {
    const allTasks = this.getStorageItem<Task[]>(STORAGE_KEY_TASKS, INITIAL_TASKS);
    const initialLen = allTasks.length;
    const filtered = allTasks.filter(t => !(t.taskId === taskId && t.ownerUid === ownerUid));
    
    if (filtered.length === initialLen) {
      throw new Error('No tienes permiso para eliminar esta tarea o no existe (RF-12).');
    }

    this.setStorageItem(STORAGE_KEY_TASKS, filtered);
    return true;
  }

  public resetToDemoData(): void {
    this.setStorageItem(STORAGE_KEY_USERS, DEMO_USERS);
    this.setStorageItem(STORAGE_KEY_TASKS, INITIAL_TASKS);
    this.setCurrentUser(DEMO_USERS[0]);
  }
}

export const storage = new StorageService();
storage.initialize();
