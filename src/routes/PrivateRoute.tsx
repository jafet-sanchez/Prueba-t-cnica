import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context';

/**
 * Componente PrivateRoute
 * Protege las rutas que requieren autenticación
 * Redirige al login si no hay token
 */
export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  
  // Si no está autenticado, redirigir al login
  // Guardamos la ubicación actual para redirigir después del login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Si está autenticado, renderizar las rutas hijas
  return <Outlet />;
};

export default PrivateRoute;
