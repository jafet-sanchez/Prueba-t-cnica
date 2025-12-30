import api from './axios.config';
import type { Action, ActionFormData, PaginationParams } from '../types';
import { AxiosError } from 'axios';

/**
 * Estructura anidada del API con paginación
 */
interface ApiNestedResponse {
  data: {
    data: Action[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
  };
}

/**
 * Estructura plana del API con paginación
 */
interface ApiFlatResponse {
  data: Action[];
  totalElements?: number;
  totalCount?: number;
  totalPages?: number;
  pageNumber?: number;
}

/**
 * Respuesta simple como array
 */
type ApiArrayResponse = Action[];

/**
 * Tipos posibles de respuesta del API
 * El API puede devolver diferentes estructuras según el endpoint
 */
type ApiResponse = ApiNestedResponse | ApiFlatResponse | ApiArrayResponse;

/**
 * Servicio para gestionar las Acciones
 * Maneja el CRUD de acciones y la paginación
 */
export const actionsService = {
  /**
   * Obtiene la lista paginada de acciones
   * @param params - Parámetros de paginación
   * @returns Respuesta del API (estructura variable)
   */
  getAll: async (params: PaginationParams): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>(
      '/api/v1/actions/admin-list',
      {
        params: {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        },
      }
    );
    return response.data;
  },

  /**
   * @param data - Datos del formulario de la acción
   * @returns La acción creada
   */
  create: async (data: ActionFormData): Promise<Action> => {
    try {
      // Usamos FormData para enviar el archivo
      const formData = new FormData();
      
      // Campos requeridos según la estructura del API
      formData.append('name', data.name);
      formData.append('description', data.description);
      
      // Color en formato HEX
      if (data.color) {
        formData.append('color', data.color);
      }
      
      // Status como número (1 = activo, 0 = inactivo)
      formData.append('status', data.isActive ? '1' : '0');
      
      // El campo de imagen se llama 'icon' según el API
      if (data.logo) {
        formData.append('icon', data.logo);
      }

      const response = await api.post<Action>(
        '/api/v1/actions/admin-add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      // Capturar el error real del API
      if (error instanceof AxiosError && error.response) {
        // Extraer mensaje de error del API
        const apiError = error.response.data;
        let errorMessage = `Error ${error.response.status}`;
        
        if (typeof apiError === 'string') {
          errorMessage = apiError;
        } else if (apiError?.message) {
          errorMessage = apiError.message;
        } else if (apiError?.error) {
          errorMessage = apiError.error;
        } else if (apiError?.title) {
          errorMessage = apiError.title;
        } else if (apiError?.errors) {
          // Errores de validación
          const errors = Object.values(apiError.errors).flat();
          errorMessage = errors.join(', ');
        }
        
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
};

export default actionsService;
