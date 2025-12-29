import type { ReactNode } from 'react';

/**
 * Props del componente Badge
 */
interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

/**
 * Componente Badge
 * Etiqueta para mostrar estados (Activo, Inactivo, etc.)
 */
export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  // Estilos por variante
  const variantStyles = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
