import { create } from 'zustand';
import { authService } from '../api';
import type { User, LoginCredentials } from '../types';

/**
 * Interface del estado de autenticación
 */
interface AuthState {
  // Estado
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => void;
}

/**
 * Store de autenticación usando Zustand
 * Maneja el estado global de la sesión del usuario
 */
export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  /**
   * Realiza el login del usuario
   * @param credentials - Email y contraseña
   * @returns true si el login fue exitoso
   */
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      
      // Guardamos el token (ajustar según la estructura de respuesta del API)
      const token = response.token || (response as unknown as string);
      
      if (token) {
        authService.setToken(token);
        set({
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error: unknown) {
      const errorMessage = 
        error instanceof Error 
          ? error.message 
          : 'Error al iniciar sesión. Verifica tus credenciales.';
      
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
        token: null,
      });
      return false;
    }
  },

  /**
   * Cierra la sesión del usuario
   */
  logout: () => {
    authService.logout();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  /**
   * Limpia el mensaje de error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Verifica si hay una sesión activa al cargar la app
   */
  checkAuth: () => {
    const token = authService.getToken();
    set({
      token,
      isAuthenticated: !!token,
    });
  },
}));

export default useAuthStore;
