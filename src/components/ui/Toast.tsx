import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Tipos de toast disponibles
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Props del componente Toast
 */
export interface ToastProps {
  /**
   * Mensaje a mostrar
   */
  message: string;

  /**
   * Tipo de toast (afecta color e icono)
   */
  type?: ToastType;

  /**
   * Duración en ms antes de auto-cerrar (0 = no auto-cerrar)
   */
  duration?: number;

  /**
   * Callback cuando se cierra el toast
   */
  onClose?: () => void;

  /**
   * Si se puede cerrar manualmente
   */
  closable?: boolean;
}


export const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  closable = true,
}: ToastProps) => {
  // Auto-cerrar después de la duración especificada
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Estilos según el tipo
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        flex items-start gap-3 p-4 rounded-lg border shadow-lg
        min-w-[300px] max-w-md
        animate-in slide-in-from-right duration-300
      `}
      role="alert"
    >
      {/* Icono */}
      <div className="flex-shrink-0 mt-0.5">
        {style.icon}
      </div>

      {/* Mensaje */}
      <div className="flex-1">
        <p className="text-sm font-medium leading-relaxed">
          {message}
        </p>
      </div>

      {/* Botón cerrar */}
      {closable && (
        <button
          onClick={onClose}
          className={`
            flex-shrink-0 p-1 rounded-md
            hover:bg-black/5 transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${type === 'success' && 'focus:ring-green-400'}
            ${type === 'error' && 'focus:ring-red-400'}
            ${type === 'warning' && 'focus:ring-yellow-400'}
            ${type === 'info' && 'focus:ring-blue-400'}
          `}
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
