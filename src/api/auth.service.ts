import { authApi } from './axios.config';
import type { LoginCredentials, LoginResponse } from '../types';

/**
 * Servicio de autenticación
 * Maneja el login y operaciones relacionadas con la sesión
 */
export const authService = {
  /**
   * Realiza el login del usuario
   * @param credentials - Email y contraseña del usuario
   * @returns Promesa con la respuesta del login (token)
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApi.post<LoginResponse>(
      '/api/Authentication/Login',
      credentials
    );
    return response.data;
  },

  /**
   * Cierra la sesión del usuario
   * Limpia el token del localStorage
   */
  logout: (): void => {
    localStorage.removeItem('token');
  },

  /**
   * Verifica si hay una sesión activa
   * @returns true si hay un token guardado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtiene el token actual
   * @returns El token o null si no existe
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Guarda el token en localStorage
   * @param token - Token JWT a guardar
   */
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },
};

export default authService;
