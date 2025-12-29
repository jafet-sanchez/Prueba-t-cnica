import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../context';
import { Button, Input, Alert, Loader, Logo } from '../components/ui';

/**
 * Schema de validación para el formulario de login
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Página de Login
 * Implementa el diseño del Figma con círculos decorativos
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  
  // Configuración del formulario con react-hook-form y zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Limpiar error al desmontar
  useEffect(() => {
    return () => clearError();
  }, [clearError]);
  
  /**
   * Maneja el envío del formulario
   */
  const onSubmit = async (data: LoginFormData) => {
    // La contraseña del API está encriptada, pero enviamos tal cual
    // según la documentación del endpoint
    const success = await login({
      username: data.email,
      password: data.password,
    });
    
    if (success) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  };
  
  return (
    <div className="min-h-screen login-background flex items-center justify-center p-4">
      {/* Círculos decorativos */}
      <div className="circle-green" />
      <div 
        className="absolute bottom-[20%] left-[5%] w-[150px] h-[150px] rounded-full"
        style={{ background: 'rgba(147, 197, 253, 0.3)' }}
      />
      
      {/* Card de Login */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>
        
        {/* Título */}
        <h1 className="text-center text-lg font-medium text-[#1e3a5f] mb-8">
          ¡Empieza a conectar tu comunidad ante<br />buenas acciones!
        </h1>
        
        {/* Mensaje de error */}
        {error && (
          <div className="mb-4">
            <Alert 
              type="error" 
              message={error}
              onClose={clearError}
            />
          </div>
        )}
        
        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Correo Electrónico*"
            type="email"
            placeholder="Ingresar correo"
            error={errors.email?.message}
            disabled={isLoading}
            {...register('email')}
          />
          
          <Input
            label="Contraseña*"
            type="password"
            placeholder="Ingresa tu contraseña"
            showPasswordToggle
            error={errors.password?.message}
            disabled={isLoading}
            {...register('password')}
          />
          
          {/* Enlace recuperar contraseña */}
          <div className="text-right">
            <a 
              href="#" 
              className="text-sm text-[#1e3a5f] hover:underline font-medium"
            >
              Recuperar contraseña
            </a>
          </div>
          
          {/* Botón de ingresar */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            size="lg"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
      
      {/* Loader de pantalla completa */}
      {isLoading && (
        <Loader fullScreen text="Autenticando..." />
      )}
    </div>
  );
};

export default LoginPage;
