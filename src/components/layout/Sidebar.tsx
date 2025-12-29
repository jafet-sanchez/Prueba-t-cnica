import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  TrendingUp,
  Users,
  Award,
  ShoppingBag,
  Wallet,
  FileText,
  FolderHeart,
  LogOut,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useAuthStore } from '../../context';

/**
 * Items del menú de navegación
 */
const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: TrendingUp, label: 'Impacto Social', path: '/impacto-social' },
  { icon: Users, label: 'Comunidad', path: '/comunidad' },
  { icon: Award, label: 'Sponsors', path: '/sponsors' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: Wallet, label: 'Balance', path: '/balance' },
  { icon: FileText, label: 'Contenidos', path: '/contenidos' },
  { icon: FolderHeart, label: 'Categorías de acciones', path: '/dashboard', active: true },
];

/**
 * Componente Sidebar
 * Menú lateral de navegación del dashboard
 */
export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    // Primero limpiamos el localStorage directamente
    localStorage.removeItem('token');
    // Luego actualizamos el estado
    logout();
    // Finalmente navegamos al login con replace para evitar volver atrás
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-64 min-h-screen bg-[#1e3a5f] flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Logo variant="light" size="md" />
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isActive || item.active
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón cerrar sesión */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium
                     text-red-300 hover:bg-red-500/10 hover:text-red-200
                     transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
