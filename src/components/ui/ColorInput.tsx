import type { InputHTMLAttributes } from 'react';
import { forwardRef, useState, useEffect } from 'react';

/**
 * Props del componente ColorInput
 */
interface ColorInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

/**
 * Componente ColorInput reutilizable
 * Input para códigos de color HEX con preview
 */
export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ label, error, value, onChange, className = '', ...props }, ref) => {
    const [colorValue, setColorValue] = useState<string>((value as string) || '#000000');

    // Sincronizar con el valor externo
    useEffect(() => {
      if (value && typeof value === 'string') {
        setColorValue(value);
      }
    }, [value]);

    /**
     * Valida si es un color HEX válido
     */
    const isValidHex = (hex: string): boolean => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    };

    /**
     * Maneja el cambio del input de texto
     */
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      
      // Agregar # si no lo tiene
      if (newValue && !newValue.startsWith('#')) {
        newValue = '#' + newValue;
      }
      
      setColorValue(newValue);
      
      // Crear evento sintético para onChange
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    };

    /**
     * Maneja el cambio del color picker
     */
    const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorValue(e.target.value);
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

        {/* Input container */}
        <div className="relative flex items-center">
          {/* Color picker (oculto visualmente pero accesible) */}
          <input
            type="color"
            value={isValidHex(colorValue) ? colorValue : '#000000'}
            onChange={handleColorPickerChange}
            className="absolute left-3 w-6 h-6 cursor-pointer border-0 p-0 rounded"
            style={{ 
              backgroundColor: isValidHex(colorValue) ? colorValue : '#ffffff',
            }}
          />

          {/* Input de texto */}
          <input
            ref={ref}
            type="text"
            value={colorValue}
            onChange={handleTextChange}
            placeholder="#000000"
            maxLength={7}
            className={`
              w-full pl-12 pr-4 py-2.5 
              border border-gray-300 rounded-lg
              text-gray-900 placeholder-gray-400 font-mono
              focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all duration-200
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />

          {/* Preview del color */}
          <div
            className="absolute right-3 w-6 h-6 rounded border border-gray-300"
            style={{ 
              backgroundColor: isValidHex(colorValue) ? colorValue : '#ffffff',
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
