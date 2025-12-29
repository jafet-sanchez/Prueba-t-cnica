import { forwardRef, useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

/**
 * Props del componente FileUpload
 */
interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  value?: File | null;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Componente FileUpload reutilizable
 * Permite seleccionar y previsualizar archivos
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ 
    label, 
    error, 
    accept = 'image/*', 
    onChange, 
    value,
    disabled = false,
    placeholder = 'Cargar archivo',
  }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Maneja la selección de archivo
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      
      if (file) {
        // Crear preview si es imagen
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
        onChange?.(file);
      }
    };

    /**
     * Elimina el archivo seleccionado
     */
    const handleRemove = () => {
      setPreview(null);
      onChange?.(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    /**
     * Abre el selector de archivos
     */
    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        {/* Input oculto */}
        <input
          ref={(node) => {
            // Manejar ambos refs
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        {/* Área de upload */}
        {!value && !preview ? (
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
              w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg
              flex items-center justify-between
              text-gray-500 hover:border-[#1e3a5f] hover:text-[#1e3a5f]
              transition-colors duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${error ? 'border-red-500' : ''}
            `}
          >
            <span className="text-sm">{placeholder}</span>
            <Upload className="w-5 h-5" />
          </button>
        ) : (
          /* Preview del archivo */
          <div className="relative flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
            {/* Thumbnail */}
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-400" />
              </div>
            )}

            {/* Nombre del archivo */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {value?.name || 'Archivo seleccionado'}
              </p>
              {value && (
                <p className="text-xs text-gray-500">
                  {(value.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>

            {/* Botón eliminar */}
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 
                      rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

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

FileUpload.displayName = 'FileUpload';

export default FileUpload;
