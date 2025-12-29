import { Image } from 'lucide-react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Badge,
  EmptyState,
  Loader,
} from '../ui';
import type { Action } from '../../types';

/**
 * Props del componente ActionsTable
 */
interface ActionsTableProps {
  actions: Action[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Formatea una fecha ISO a formato legible
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * Determina la variante del badge según el estado
 */
const getStatusVariant = (status: string | number): 'success' | 'warning' | 'error' | 'default' => {
  const statusLower = String(status)?.toLowerCase();
  if (statusLower === 'active' || statusLower === 'activo' || statusLower === '1') return 'success';
  if (statusLower === 'inactive' || statusLower === 'inactivo' || statusLower === '0') return 'warning';
  if (statusLower === 'deleted' || statusLower === 'eliminado') return 'error';
  return 'default';
};

/**
 * Traduce el estado al español
 */
const translateStatus = (status: string | number): string => {
  const statusLower = String(status)?.toLowerCase();
  if (statusLower === 'active' || statusLower === '1') return 'Activo';
  if (statusLower === 'inactive' || statusLower === '0') return 'Inactivo';
  return String(status);
};

/**
 * Componente ActionsTable
 * Tabla que muestra el listado de acciones
 */
export const ActionsTable = ({
  actions,
  isLoading,
  error,
}: ActionsTableProps) => {
  // Asegurar que actions sea un array
  const safeActions = Array.isArray(actions) ? actions : [];
  
  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <Loader size="lg" text="Cargando acciones..." />
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <EmptyState
          title="Error al cargar"
          description={error}
          icon={<span className="text-3xl">⚠️</span>}
        />
      </div>
    );
  }

  // Estado vacío
  if (safeActions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <EmptyState
          title="No hay acciones"
          description="Aún no se han creado acciones. Crea la primera para comenzar."
        />
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Nombre de la categoría</TableHeader>
          <TableHeader>Icono de la categoría</TableHeader>
          <TableHeader>Estado</TableHeader>
          <TableHeader>Descripción</TableHeader>
          <TableHeader>Fecha de creación</TableHeader>
        </TableRow>
      </TableHead>

      <TableBody>
        {safeActions.map((action) => (
          <TableRow key={action.id}>
            {/* Nombre */}
            <TableCell>
              <span className="font-medium text-gray-900">
                {action.name}
              </span>
            </TableCell>

            {/* Icono */}
            <TableCell>
              {action.imageUrl || action.logo || action.icon ? (
                <img
                  src={action.imageUrl || action.logo || action.icon}
                  alt={action.name}
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Image className="w-5 h-5 text-red-400" />
                </div>
              )}
            </TableCell>

            {/* Estado */}
            <TableCell>
              <Badge variant={getStatusVariant(action.status)}>
                {translateStatus(action.status)}
              </Badge>
            </TableCell>

            {/* Descripción */}
            <TableCell>
              <p className="text-gray-600 line-clamp-2 max-w-xs">
                {action.description || 'Sin descripción'}
              </p>
            </TableCell>

            {/* Fecha de creación */}
            <TableCell>
              <span className="text-gray-500">
                {formatDate(action.createdAt)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActionsTable;
