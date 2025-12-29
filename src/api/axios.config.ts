import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

/**
 * Configuración de URLs desde variables de entorno
 * Fallback a URLs de desarrollo si no están definidas
 */
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://dev.apinetbo.bekindnetwork.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://dev.api.bekindnetwork.com';

// Cliente para autenticación (subdominio diferente)
export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Cliente para las demás operaciones (acciones)
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Función para obtener el token del localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      // El formato del token puede variar, ajustar según la respuesta del API
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Si el token expiró o es inválido, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// También aplicamos interceptor al cliente de auth para consistencia
authApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
