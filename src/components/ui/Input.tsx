import type { InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, type LucideIcon } from 'lucide-react';

/**
 * Props del componente Input
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, showPasswordToggle = false, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    // Determinar el tipo de input
    const inputType = showPasswordToggle 
      ? (showPassword ? 'text' : 'password')
      : type;
    
    // Determinar el icono según el tipo
    const getIcon = () => {
      if (Icon) return Icon;
      if (type === 'email') return Mail;
      if (type === 'password' || showPasswordToggle) return Lock;
      return null;
    };
    
    const IconComponent = getIcon();
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {/* Icono izquierdo */}
          {IconComponent && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconComponent className="w-5 h-5" />
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full px-4 py-2.5 
              ${IconComponent ? 'pl-10' : ''} 
              ${showPasswordToggle ? 'pr-10' : ''} 
              border border-gray-300 rounded-lg
              text-gray-900 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all duration-200
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          
          {/* Toggle de contraseña */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <p className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
