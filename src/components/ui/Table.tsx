import type { ReactNode } from 'react';

/**
 * Props del componente Table
 */
interface TableProps {
  children: ReactNode;
}

/**
 * Props del componente TableHead
 */
interface TableHeadProps {
  children: ReactNode;
}

/**
 * Props del componente TableBody
 */
interface TableBodyProps {
  children: ReactNode;
}

/**
 * Props del componente TableRow
 */
interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * Props del componente TableHeader
 */
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

/**
 * Props del componente TableCell
 */
interface TableCellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Componente Table principal
 */
export const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
};

/**
 * Componente TableHead
 */
export const TableHead = ({ children }: TableHeadProps) => {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
};

/**
 * Componente TableBody
 */
export const TableBody = ({ children }: TableBodyProps) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {children}
    </tbody>
  );
};

/**
 * Componente TableRow
 */
export const TableRow = ({ children, onClick, className = '' }: TableRowProps) => {
  return (
    <tr
      onClick={onClick}
      className={`
        ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}
        transition-colors duration-150
        ${className}
      `}
    >
      {children}
    </tr>
  );
};

/**
 * Componente TableHeader (celda de encabezado)
 */
export const TableHeader = ({
  children,
  className = '',
  sortable = false,
  sorted = null,
  onSort,
}: TableHeaderProps) => {
  return (
    <th
      onClick={sortable ? onSort : undefined}
      className={`
        px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
        ${sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && (
          <span className="text-gray-400">
            {sorted === 'asc' && '↑'}
            {sorted === 'desc' && '↓'}
            {!sorted && '↕'}
          </span>
        )}
      </div>
    </th>
  );
};

/**
 * Componente TableCell (celda de datos)
 */
export const TableCell = ({ children, className = '' }: TableCellProps) => {
  return (
    <td className={`px-4 py-4 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
};

export default Table;
