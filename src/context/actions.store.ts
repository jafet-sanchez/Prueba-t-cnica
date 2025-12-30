import { create } from 'zustand';
import { actionsService } from '../api';
import type { Action, ActionFormData, PaginationParams } from '../types';

/**
 * Type guards para verificar la estructura de la respuesta
 */
const hasNestedData = (response: unknown): response is { data: { data: Action[]; totalElements: number; totalPages: number; pageNumber: number } } => {
  return typeof response === 'object' && response !== null &&
    'data' in response &&
    typeof response.data === 'object' && response.data !== null &&
    'data' in response.data &&
    Array.isArray(response.data.data);
};

const hasFlatData = (response: unknown): response is { data: Action[]; totalElements?: number; totalCount?: number; totalPages?: number; pageNumber?: number } => {
  return typeof response === 'object' && response !== null &&
    'data' in response &&
    Array.isArray(response.data);
};

/**
 * Interface del estado de acciones
 */
interface ActionsState {
  // Estado
  actions: Action[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;

  // Estado del modal de crear
  isModalOpen: boolean;
  isCreating: boolean;
  createError: string | null;
  createSuccess: boolean;

  // Acciones
  fetchActions: (params?: PaginationParams) => Promise<void>;
  createAction: (data: ActionFormData) => Promise<boolean>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  openModal: () => void;
  closeModal: () => void;
  clearCreateStatus: () => void;
}

/**
 * Store de acciones usando Zustand
 * Maneja el estado global del listado de acciones
 */
export const useActionsStore = create<ActionsState>((set, get) => ({
  // Estado inicial
  actions: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  error: null,

  // Estado del modal de crear
  isModalOpen: false,
  isCreating: false,
  createError: null,
  createSuccess: false,

  /**
   * Obtiene la lista de acciones con paginación
   */
  fetchActions: async (params?: PaginationParams) => {
    const { currentPage, pageSize } = get();
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await actionsService.getAll({
        pageNumber: params?.pageNumber || currentPage,
        pageSize: params?.pageSize || pageSize,
      });

      // Manejar la estructura específica del API
      let actionsData: Action[] = [];
      let total = 0;
      let pages = 1;
      let page = currentPage;

      // Estructura: { data: { data: [], totalElements, totalPages, pageNumber } }
      if (hasNestedData(response)) {
        actionsData = response.data.data;
        total = response.data.totalElements || actionsData.length;
        pages = response.data.totalPages || 1;
        page = (response.data.pageNumber || 0) + 1; // API usa 0-indexed
      }
      // Estructura: { data: [], totalElements, totalPages }
      else if (hasFlatData(response)) {
        actionsData = response.data;
        total = response.totalElements || response.totalCount || actionsData.length;
        pages = response.totalPages || 1;
        page = (response.pageNumber || 0) + 1;
      }
      // Si la respuesta es directamente un array
      else if (Array.isArray(response)) {
        actionsData = response;
        total = response.length;
      }
      
      set({
        actions: actionsData,
        totalCount: total,
        totalPages: pages,
        currentPage: page,
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al cargar las acciones';
      
      set({
        isLoading: false,
        error: errorMessage,
        actions: [],
      });
    }
  },

  /**
   * Crea una nueva acción
   */
  createAction: async (data: ActionFormData): Promise<boolean> => {
    set({ isCreating: true, createError: null, createSuccess: false });
    
    try {
      await actionsService.create(data);
      
      set({
        isCreating: false,
        createSuccess: true,
        isModalOpen: false,
      });
      
      // Refrescar el listado
      get().fetchActions();
      
      return true;
    } catch (error: unknown) {
      const errorMessage = 
        error instanceof Error 
          ? error.message 
          : 'Error al crear la acción';
      
      set({
        isCreating: false,
        createError: errorMessage,
      });
      return false;
    }
  },

  /**
   * Cambia la página actual
   */
  setPage: (page: number) => {
    set({ currentPage: page });
    get().fetchActions({ pageNumber: page, pageSize: get().pageSize });
  },

  /**
   * Cambia el tamaño de página
   */
  setPageSize: (size: number) => {
    set({ pageSize: size, currentPage: 1 });
    get().fetchActions({ pageNumber: 1, pageSize: size });
  },

  /**
   * Abre el modal de crear
   */
  openModal: () => {
    set({ isModalOpen: true, createError: null, createSuccess: false });
  },

  /**
   * Cierra el modal de crear
   */
  closeModal: () => {
    set({ isModalOpen: false, createError: null });
  },

  /**
   * Limpia el estado de creación
   */
  clearCreateStatus: () => {
    set({ createError: null, createSuccess: false });
  },
}));

export default useActionsStore;
