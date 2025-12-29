import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../context';

/**
 * Componente PublicRoute
 * Rutas accesibles solo cuando NO está autenticado
 * Redirige al dashboard si ya tiene sesión
 */
export const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Si no está autenticado, mostrar las rutas públicas
  return <Outlet />;
};

export default PublicRoute;
