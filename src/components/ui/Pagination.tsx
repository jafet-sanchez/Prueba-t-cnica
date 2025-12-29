import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Props del componente Pagination
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

/**
 * Componente Pagination
 * Control de paginación con selector de tamaño de página
 */
export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: PaginationProps) => {
  // Calcular rango de items mostrados
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  // Verificar si los botones deben estar deshabilitados
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200">
      {/* Selector de tamaño de página */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Resultados por página</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Información de rango */}
      <div className="text-sm text-gray-600">
        {startItem}-{endItem} de {totalCount}
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center gap-1">
        {/* Primera página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors"
          aria-label="Primera página"
        >
          <ChevronsLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Página anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Número de página actual */}
        <span className="px-3 py-1 text-sm font-medium text-gray-700">
          {currentPage} / {totalPages || 1}
        </span>

        {/* Página siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Última página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 
                  disabled:cursor-not-allowed transition-colors"
          aria-label="Última página"
        >
          <ChevronsRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
