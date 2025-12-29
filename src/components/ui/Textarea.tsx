import type { TextareaHTMLAttributes } from 'react';
import { forwardRef, useState, useEffect } from 'react';

/**
 * Props del componente Textarea
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

/**
 * Componente Textarea reutilizable
 * Con soporte para label, error y contador de caracteres
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    showCount = false, 
    maxLength, 
    className = '', 
    value,
    onChange,
    ...props 
  }, ref) => {
    const [charCount, setCharCount] = useState(0);

    // Actualizar contador cuando cambia el valor
    useEffect(() => {
      if (typeof value === 'string') {
        setCharCount(value.length);
      }
    }, [value]);

    /**
     * Maneja el cambio actualizando el contador
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 
            border border-gray-300 rounded-lg
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-none transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />

        {/* Footer: error y contador */}
        <div className="flex justify-between mt-1.5">
          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          
          {/* Spacer si no hay error */}
          {!error && <span />}

          {/* Contador */}
          {showCount && maxLength && (
            <p className={`text-sm ${charCount >= maxLength ? 'text-red-500' : 'text-gray-400'}`}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
