import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Search } from 'lucide-react';

/**
 * Props del componente SearchInput
 */
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

/**
 * Componente SearchInput
 * Input de búsqueda con icono
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = '', onSearch, onChange, ...props }, ref) => {
    /**
     * Maneja el cambio de valor
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onSearch?.(e.target.value);
    };

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={ref}
          type="text"
          className={`
            w-full pl-10 pr-4 py-2 
            border border-gray-300 rounded-lg
            text-sm text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent
            transition-all duration-200
            ${className}
          `}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
