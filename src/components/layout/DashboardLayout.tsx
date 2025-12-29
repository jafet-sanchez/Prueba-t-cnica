import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * Props del componente DashboardLayout
 */
interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Componente DashboardLayout
 * Layout principal del dashboard con sidebar y header
 */
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Contenido de la página */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
