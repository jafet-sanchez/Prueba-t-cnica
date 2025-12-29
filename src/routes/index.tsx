import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// Lazy loading de páginas para mejor rendimiento
import { lazy, Suspense } from 'react';
import { Loader } from '../components/ui';

// Importación lazy de las páginas
const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));

/**
 * Wrapper para lazy loading con suspense
 */
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader fullScreen text="Cargando..." />}>
    {children}
  </Suspense>
);

/**
 * Configuración del router de la aplicación
 */
export const router = createBrowserRouter([
  {
    // Rutas públicas (solo accesibles sin autenticación)
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    // Rutas privadas (requieren autenticación)
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    // Redirigir la raíz al dashboard o login según autenticación
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    // Cualquier otra ruta redirige al dashboard
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
