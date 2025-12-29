// Tipos para el módulo de acciones

export interface Action {
  id: string | number;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  status: 'active' | 'inactive' | string;
  createdAt: string;
  updatedAt?: string;
  logo?: string;
  imageUrl?: string;
}

export interface ActionFormData {
  name: string;
  description: string;
  color?: string;
  isActive?: boolean;
  logo?: File | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  items?: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}
