import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useEffect } from 'react';
import { useAuthStore } from './context';

/**
 * Componente principal de la aplicación
 * Configura el router y verifica la autenticación inicial
 */
function App() {
  const { checkAuth } = useAuthStore();
  
  // Verificar si hay sesión activa al cargar la app
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return <RouterProvider router={router} />;
}

export default App;
