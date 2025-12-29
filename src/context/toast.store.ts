import { create } from 'zustand';
import type { ToastType } from '../components/ui/Toast';

/**
 * Interface de un toast individual
 */
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

/**
 * Interface del estado de toasts
 */
interface ToastState {
  toasts: ToastItem[];

  // Acciones
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

/**
 * Store de toasts usando Zustand
 * Maneja el estado global de las notificaciones toast
 */
export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  /**
   * Muestra un toast con configuración personalizada
   */
  showToast: (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, message, type, duration },
      ],
    }));

    // Auto-remover después de la duración
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  /**
   * Muestra un toast de éxito
   */
  success: (message: string, duration = 3000) => {
    get().showToast(message, 'success', duration);
  },

  /**
   * Muestra un toast de error
   */
  error: (message: string, duration = 5000) => {
    get().showToast(message, 'error', duration);
  },

  /**
   * Muestra un toast de advertencia
   */
  warning: (message: string, duration = 4000) => {
    get().showToast(message, 'warning', duration);
  },

  /**
   * Muestra un toast informativo
   */
  info: (message: string, duration = 3000) => {
    get().showToast(message, 'info', duration);
  },

  /**
   * Remueve un toast específico
   */
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  /**
   * Limpia todos los toasts
   */
  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;
