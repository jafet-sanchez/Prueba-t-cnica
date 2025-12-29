import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Modal,
  Input,
  Textarea,
  FileUpload,
  ColorInput,
  Toggle,
  Button,
  Alert,
} from '../ui';
import { useActionsStore } from '../../context';

/**
 * Schema de validación para el formulario de crear acción
 */
const createActionSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  color: z
    .string()
    .optional(),
  isActive: z.boolean(),
  logo: z.custom<File | null>().optional(),
});

type CreateActionFormData = z.infer<typeof createActionSchema>;

/**
 * Componente CreateActionModal
 * Modal con formulario para crear una nueva acción
 */
export const CreateActionModal = () => {
  // Estado global
  const {
    isModalOpen,
    closeModal,
    createAction,
    isCreating,
    createError,
    clearCreateStatus,
  } = useActionsStore();

  // Configuración del formulario
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateActionFormData>({
    resolver: zodResolver(createActionSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#1e3a5f',
      isActive: true,
      logo: null,
    },
  });

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!isModalOpen) {
      reset();
      clearCreateStatus();
    }
  }, [isModalOpen, reset, clearCreateStatus]);

  /**
   * Maneja el envío del formulario
   */
  const onSubmit = async (data: CreateActionFormData) => {
    const success = await createAction({
      name: data.name,
      description: data.description,
      color: data.color || undefined,
      isActive: data.isActive,
      logo: data.logo || null,
    });

    if (success) {
      reset();
      // El modal se cierra automáticamente en el store
    }
  };

  /**
   * Maneja el cierre del modal
   */
  const handleClose = () => {
    if (!isCreating) {
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Crear categoría"
      size="md"
    >
      {/* Mensaje de error */}
      {createError && (
        <div className="mb-4">
          <Alert
            type="error"
            message={createError}
            onClose={clearCreateStatus}
          />
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nombre */}
        <Input
          label="Nombre de la categoría*"
          placeholder="Escribe el nombre de la buena acción"
          error={errors.name?.message}
          disabled={isCreating}
          {...register('name')}
        />

        {/* Descripción */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Descripción de la buena acción*"
              placeholder="Agrega descripción"
              rows={4}
              showCount
              maxLength={500}
              error={errors.description?.message}
              disabled={isCreating}
              {...field}
            />
          )}
        />

        {/* Logo */}
        <Controller
          name="logo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FileUpload
              label="Logo*"
              placeholder="Cargar archivo"
              accept="image/*"
              value={value}
              onChange={onChange}
              error={errors.logo?.message}
              disabled={isCreating}
            />
          )}
        />

        {/* Color */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorInput
              label="Color*"
              placeholder="Registra color código HEX"
              error={errors.color?.message}
              disabled={isCreating}
              {...field}
            />
          )}
        />

        {/* Toggle Activo */}
        <Controller
          name="isActive"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Toggle
              label="Activo"
              checked={value}
              onChange={onChange}
              disabled={isCreating}
            />
          )}
        />

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isCreating}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isCreating}
            className="flex-1"
          >
            {isCreating ? 'Creando...' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateActionModal;
