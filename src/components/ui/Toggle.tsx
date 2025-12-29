import { forwardRef } from 'react';

/**
 * Props del componente Toggle
 */
interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
}

/**
 * Componente Toggle (Switch) reutilizable
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, checked = false, onChange, disabled = false, name }, ref) => {
    /**
     * Maneja el cambio del toggle
     */
    const handleChange = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <label className="flex items-center gap-3 cursor-pointer select-none">
        {/* Switch */}
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />
          
          {/* Track */}
          <div
            className={`
              w-11 h-6 rounded-full transition-colors duration-200
              ${checked ? 'bg-[#1e3a5f]' : 'bg-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          
          {/* Thumb */}
          <div
            className={`
              absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
              shadow-md transition-transform duration-200
              ${checked ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </div>

        {/* Label */}
        {label && (
          <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
