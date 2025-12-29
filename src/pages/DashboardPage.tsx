import { useEffect, useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { DashboardLayout } from '../components/layout';
import { Button, SearchInput, Pagination } from '../components/ui';
import { ActionsTable, CreateActionModal } from '../components/forms';
import { useActionsStore, useToastStore } from '../context';

/**
 * Tabs disponibles en el dashboard
 */
const tabs = [
  { id: 'categorias', label: 'Categorías' },
  { id: 'tipos', label: 'Tipos' },
  { id: 'evidencias', label: 'Evidencias' },
];

/**
 * Página de Dashboard
 * Muestra el listado paginado de acciones
 */
const DashboardPage = () => {
  // Estado local
  const [activeTab, setActiveTab] = useState('categorias');
  const [searchTerm, setSearchTerm] = useState('');

  // Estado global del store de acciones
  const {
    actions,
    isLoading,
    error,
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    fetchActions,
    setPage,
    setPageSize,
    openModal,
    createSuccess,
    clearCreateStatus,
  } = useActionsStore();

  // Store de toasts
  const { showToast } = useToastStore();

  // Cargar acciones al montar el componente
  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  // Mostrar toast de éxito al crear
  useEffect(() => {
    if (createSuccess) {
      showToast('¡Acción creada exitosamente!', 'success');
      clearCreateStatus();
    }
  }, [createSuccess, clearCreateStatus, showToast]);
  /**
   * Filtra las acciones según el término de búsqueda
   */
  const filteredActions = searchTerm
    ? actions.filter(
        (action) =>
          action.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          action.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : actions;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Acciones</h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  pb-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-[#1e3a5f] text-[#1e3a5f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* Búsqueda y filtros */}
          <div className="flex gap-3">
            <SearchInput
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Botón crear */}
          <Button onClick={openModal} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Crear tipo de categoría
          </Button>
        </div>

        {/* Tabla de acciones */}
        <ActionsTable
          actions={filteredActions}
          isLoading={isLoading}
          error={error}
        />

        {/* Paginación */}
        {!isLoading && !error && actions.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* Modal de crear acción */}
      <CreateActionModal />
    </DashboardLayout>
  );
};

export default DashboardPage;
