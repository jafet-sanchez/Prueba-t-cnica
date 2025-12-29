import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

/**
 * Props del componente Alert
 */
interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
}

/**
 * Componente Alert reutilizable
 * Muestra mensajes de éxito, error, advertencia o información
 */
export const Alert = ({ type = 'info', message, title, onClose, children }: AlertProps) => {
  // Configuración por tipo
  const config = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500',
    },
  };
  
  const { bg, border, text, icon: Icon, iconColor } = config[type];
  
  return (
    <div className={`${bg} ${border} border rounded-lg p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      
      <div className="flex-1">
        {title && (
          <h4 className={`font-medium ${text} mb-1`}>{title}</h4>
        )}
        <p className={`text-sm ${text}`}>{message}</p>
        {children}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className={`${text} hover:opacity-70 focus:outline-none`}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
