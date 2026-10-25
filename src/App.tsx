/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { storage } from './services/storage';
import { User, Task, TaskPriority, TaskStatus, TaskStats } from './types';
import { Navbar } from './components/Navbar';
import { WelcomeHero } from './components/WelcomeHero';
import { AuthModal } from './components/AuthModal';
import { TaskCard } from './components/TaskCard';
import { TaskFormModal } from './components/TaskFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { TestPlanViewer } from './components/TestPlanViewer';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CheckSquare,
  Sparkles,
  Layers,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => storage.getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(() => storage.getUsers());
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todas' | 'pendiente' | 'completada'>('todas');
  const [priorityFilter, setPriorityFilter] = useState<'todas' | TaskPriority>('todas');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isTestPlanOpen, setIsTestPlanOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3200);
  };

  // Sync tasks when current user changes (guaranteeing RF-12 strict isolation)
  const refreshTasks = () => {
    if (currentUser) {
      const userTasks = storage.getTasks(currentUser.uid);
      setTasks(userTasks);
    } else {
      setTasks([]);
    }
    setAllUsers(storage.getUsers());
  };

  useEffect(() => {
    refreshTasks();
  }, [currentUser]);

  // Auth actions
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    showToast(`¡Bienvenido a LISTO, ${user.nombre}!`);
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    showToast('Has cerrado sesión correctamente.', 'info');
  };

  const handleSwitchUser = (uid: string) => {
    const switched = storage.switchUser(uid);
    if (switched) {
      setCurrentUser(switched);
      showToast(`Cambiaste a la cuenta de ${switched.nombre}.`);
    }
  };

  const handleQuickDemoLogin = (email: string) => {
    const user = storage.loginWithEmail(email);
    setCurrentUser(user);
    showToast(`Sesión iniciada como ${user.nombre}`);
  };

  // Task CRUD actions
  const handleCreateOrUpdateTask = (data: {
    titulo: string;
    descripcion: string;
    prioridad: TaskPriority;
    estado?: TaskStatus;
    fechaLimite: string | null;
  }) => {
    if (!currentUser) return;

    try {
      if (taskToEdit) {
        storage.updateTask(currentUser.uid, taskToEdit.taskId, data);
        showToast('Tarea actualizada correctamente.');
      } else {
        storage.createTask(currentUser.uid, {
          titulo: data.titulo,
          descripcion: data.descripcion,
          prioridad: data.prioridad,
          fechaLimite: data.fechaLimite,
        });
        showToast('Tarea creada y guardada con éxito.');
      }
      refreshTasks();
      setTaskToEdit(null);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error al guardar la tarea', 'error');
    }
  };

  const handleToggleStatus = (taskId: string) => {
    if (!currentUser) return;
    try {
      const updated = storage.toggleTaskStatus(currentUser.uid, taskId);
      refreshTasks();
      if (updated.estado === 'completada') {
        showToast('¡Tarea marcada como completada! 🎉');
      } else {
        showToast('Tarea reactivada como pendiente.');
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error al actualizar estado', 'error');
    }
  };

  const handleDeleteTask = () => {
    if (!currentUser || !taskToDelete) return;
    try {
      storage.deleteTask(currentUser.uid, taskToDelete.taskId);
      refreshTasks();
      showToast('Tarea eliminada correctamente.');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error al eliminar tarea', 'error');
    }
  };

  const handleResetDemoData = () => {
    storage.resetToDemoData();
    const user = storage.getCurrentUser();
    setCurrentUser(user);
    refreshTasks();
    showToast('Datos de demostración restablecidos.');
  };

  // Filtered and searched tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Search
      const matchesSearch =
        t.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchesStatus = statusFilter === 'todas' || t.estado === statusFilter;

      // Priority
      const matchesPriority = priorityFilter === 'todas' || t.prioridad === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Statistics
  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    const completadas = tasks.filter((t) => t.estado === 'completada').length;
    const pendientes = total - completadas;
    const porcentajeCompletado = total > 0 ? Math.round((completadas / total) * 100) : 0;
    const alta = tasks.filter((t) => t.prioridad === 'alta' && t.estado === 'pendiente').length;
    const media = tasks.filter((t) => t.prioridad === 'media' && t.estado === 'pendiente').length;
    const baja = tasks.filter((t) => t.prioridad === 'baja' && t.estado === 'pendiente').length;

    const today = new Date().toISOString().split('T')[0];
    const vencidas = tasks.filter(
      (t) => t.fechaLimite && t.fechaLimite < today && t.estado === 'pendiente'
    ).length;

    return {
      total,
      pendientes,
      completadas,
      porcentajeCompletado,
      alta,
      media,
      baja,
      vencidas,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-[#101714] text-[#F5F7F5] flex flex-col font-sans selection:bg-[#35C878]/30 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        user={currentUser}
        allUsers={allUsers}
        onLogout={handleLogout}
        onSwitchUser={handleSwitchUser}
        onOpenTestPlan={() => setIsTestPlanOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 sm:pb-12">
        {!currentUser ? (
          /* Visitor View (RF-01, Section 8.1 & 15.1) */
          <WelcomeHero
            onLoginClick={() => setIsAuthModalOpen(true)}
            onQuickDemoLogin={handleQuickDemoLogin}
          />
        ) : (
          /* Registered User View (RF-05, Section 8.2 & 15.2) */
          <div className="space-y-6 animate-fadeIn">
            {/* Top Greeting & Quick Create */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#1B2620] via-[#1E2B24] to-[#1B2620] p-5 sm:p-6 rounded-3xl border border-[#26382E] shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Hola, {currentUser.nombre.split(' ')[0]} 👋
                  </h2>
                  <span className="hidden sm:inline-flex text-[11px] px-2 py-0.5 rounded-full bg-[#101714] text-[#35C878] border border-[#26382E] font-medium">
                    {currentUser.correo}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#B6C1BA]">
                  Tienes <strong className="text-white">{stats.pendientes}</strong> actividades pendientes para hoy.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setTaskToEdit(null);
                    setIsTaskFormOpen(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] font-bold text-sm shadow-md shadow-[#35C878]/20 transition active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Nueva Tarea</span>
                </button>
              </div>
            </div>

            {/* Metrics & Progress Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Total Card */}
              <div className="p-4 rounded-2xl bg-[#1B2620] border border-[#26382E] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#B6C1BA]">Total de Tareas</p>
                  <p className="text-2xl font-black text-white mt-0.5">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#101714] border border-[#26382E] flex items-center justify-center text-[#B6C1BA]">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              {/* Pendientes Card */}
              <div className="p-4 rounded-2xl bg-[#1B2620] border border-[#26382E] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#B6C1BA]">Pendientes</p>
                  <p className="text-2xl font-black text-[#F2B84B] mt-0.5">{stats.pendientes}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F2B84B]/10 border border-[#F2B84B]/30 flex items-center justify-center text-[#F2B84B]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Completadas Card */}
              <div className="p-4 rounded-2xl bg-[#1B2620] border border-[#26382E] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#B6C1BA]">Completadas</p>
                  <p className="text-2xl font-black text-[#35C878] mt-0.5">{stats.completadas}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#35C878]/10 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              {/* Progress Card */}
              <div className="p-4 rounded-2xl bg-[#1B2620] border border-[#26382E] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-medium text-[#B6C1BA]">
                  <span>Cumplimiento</span>
                  <span className="font-bold text-[#35C878]">{stats.porcentajeCompletado}%</span>
                </div>
                <div className="mt-2 w-full h-2.5 rounded-full bg-[#101714] overflow-hidden border border-[#26382E]">
                  <div
                    className="h-full bg-gradient-to-r from-[#35C878] to-[#4EEDB6] rounded-full transition-all duration-500"
                    style={{ width: `${stats.porcentajeCompletado}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar (RF-10) */}
            <div className="p-4 rounded-2xl bg-[#1B2620] border border-[#26382E] space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#B6C1BA] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar tarea por título o descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-xs sm:text-sm text-white placeholder-[#B6C1BA]/50 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#B6C1BA] hover:text-white"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Priority filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#B6C1BA] hidden sm:inline">Prioridad:</span>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-xs font-medium text-white focus:outline-none focus:border-[#35C878] cursor-pointer"
                  >
                    <option value="todas">Todas las prioridades</option>
                    <option value="alta">Prioridad Alta</option>
                    <option value="media">Prioridad Media</option>
                    <option value="baja">Prioridad Baja</option>
                  </select>
                </div>
              </div>

              {/* Status pills filter */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                <button
                  onClick={() => setStatusFilter('todas')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                    statusFilter === 'todas'
                      ? 'bg-[#35C878] text-[#101714] font-bold shadow-sm'
                      : 'bg-[#101714] text-[#B6C1BA] hover:text-white hover:bg-[#26382E] border border-[#26382E]'
                  }`}
                >
                  Todas ({stats.total})
                </button>
                <button
                  onClick={() => setStatusFilter('pendiente')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                    statusFilter === 'pendiente'
                      ? 'bg-[#F2B84B] text-[#101714] font-bold shadow-sm'
                      : 'bg-[#101714] text-[#B6C1BA] hover:text-white hover:bg-[#26382E] border border-[#26382E]'
                  }`}
                >
                  Pendientes ({stats.pendientes})
                </button>
                <button
                  onClick={() => setStatusFilter('completada')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                    statusFilter === 'completada'
                      ? 'bg-[#35C878] text-[#101714] font-bold shadow-sm'
                      : 'bg-[#101714] text-[#B6C1BA] hover:text-white hover:bg-[#26382E] border border-[#26382E]'
                  }`}
                >
                  Completadas ({stats.completadas})
                </button>

                {stats.vencidas > 0 && (
                  <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E85D5D]/15 text-[#E85D5D] border border-[#E85D5D]/30 shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{stats.vencidas} vencida{stats.vencidas > 1 ? 's' : ''}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Task Cards List */}
            <div className="space-y-3">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    onToggleStatus={handleToggleStatus}
                    onEdit={(t) => {
                      setTaskToEdit(t);
                      setIsTaskFormOpen(true);
                    }}
                    onDelete={(t) => {
                      setTaskToDelete(t);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                ))
              ) : (
                /* Empty state */
                <div className="py-12 px-4 text-center rounded-2xl bg-[#1B2620]/60 border border-dashed border-[#26382E] space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#101714] border border-[#26382E] flex items-center justify-center text-[#B6C1BA] mx-auto">
                    <CheckSquare className="w-6 h-6 text-[#35C878]" />
                  </div>
                  <h3 className="font-bold text-base text-white">No hay tareas que mostrar</h3>
                  <p className="text-xs text-[#B6C1BA] max-w-sm mx-auto">
                    {searchQuery || statusFilter !== 'todas' || priorityFilter !== 'todas'
                      ? 'No encontramos tareas que coincidan con los filtros seleccionados.'
                      : 'Aún no has registrado ninguna tarea. ¡Comienza creando tu primera actividad!'}
                  </p>
                  {(searchQuery || statusFilter !== 'todas' || priorityFilter !== 'todas') ? (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('todas');
                        setPriorityFilter('todas');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-xs font-semibold text-white transition cursor-pointer"
                    >
                      Restablecer filtros
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTaskToEdit(null);
                        setIsTaskFormOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Crear Tarea Ahora</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile Create */}
      {currentUser && (
        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsTaskFormOpen(true);
          }}
          className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#35C878] hover:bg-[#3ce187] text-[#101714] flex items-center justify-center shadow-2xl shadow-[#35C878]/40 active:scale-95 transition cursor-pointer"
          title="Crear nueva tarea"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}

      {/* Offline Connectivity Notification */}
      <OfflineIndicator />

      {/* Toast notification */}
      {toastMessage && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-2.5 rounded-xl shadow-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn ${
            toastMessage.type === 'error'
              ? 'bg-[#E85D5D] text-white border-[#E85D5D]'
              : toastMessage.type === 'info'
              ? 'bg-[#1B2620] text-white border-[#26382E]'
              : 'bg-[#35C878] text-[#101714] border-[#35C878]'
          }`}
        >
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleCreateOrUpdateTask}
        taskToEdit={taskToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        task={taskToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
      />

      <TestPlanViewer
        isOpen={isTestPlanOpen}
        onClose={() => setIsTestPlanOpen(false)}
        onResetDemo={handleResetDemoData}
      />
    </div>
  );
}
