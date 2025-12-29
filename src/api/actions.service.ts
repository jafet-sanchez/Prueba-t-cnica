import api from './axios.config';
import type { Action, ActionFormData, PaginationParams } from '../types';
import { AxiosError } from 'axios';

/**
 * Tipo genérico para respuesta del API
 * El API puede devolver diferentes estructuras
 */
type ApiResponse = any;

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

      // Log para debug
      console.log('Creating action with payload:');
      formData.forEach((value, key) => {
        console.log(`  ${key}:`, value);
      });

      const response = await api.post<Action>(
        '/api/v1/actions/admin-add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('Action created successfully:', response.data);
      return response.data;
    } catch (error) {
      // Capturar el error real del API
      if (error instanceof AxiosError && error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('API Error Status:', error.response.status);
        
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

  /**
   * Obtiene una acción por su ID
   * @param id - ID de la acción
   * @returns La acción encontrada
   */
  getById: async (id: string | number): Promise<Action> => {
    const response = await api.get<Action>(`/api/v1/actions/${id}`);
    return response.data;
  },
};

export default actionsService;
