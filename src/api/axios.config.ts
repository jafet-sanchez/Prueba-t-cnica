import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Cliente para autenticación (subdominio diferente)
export const authApi = axios.create({
  baseURL: 'https://dev.apinetbo.bekindnetwork.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para las demás operaciones (acciones)
export const api = axios.create({
  baseURL: 'https://dev.api.bekindnetwork.com',
  headers: {
    'Content-Type': 'application/json',
  },
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
