import React, { useState, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Power,
  PowerOff,
  ChevronRight,
  ChevronDown,
  User,
  X,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  fetchTodosBoletines,
  deleteBoletin,
  updateBoletin,
  Boletin
} from '@/services/BoletinManagementService';
import {
  fetchUsuarios,
  Usuario
} from '@/services/UserManagementService';

import BoletinEditor from './EditarBoletin';

// Modal de confirmación
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bulletinTitle, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirmar eliminación
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-white hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-2">
            ¿Estás seguro de que deseas eliminar este boletín?
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-gray-900 truncate">
              {bulletinTitle}
            </p>
          </div>
          <p className="text-sm text-red-600">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Eliminar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const BulletinAdmin = () => {
  const [bulletins, setBulletins] = useState<Boletin[]>([]);
  const [users, setUsers] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    bulletinId: null,
    bulletinTitle: '',
    isDeleting: false
  });
  // Nuevo estado para el boletín que se está editando directamente en la tabla
  const [editingBoletinIdInTable, setEditingBoletinIdInTable] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [bulletinsData, usersData] = await Promise.all([
        fetchTodosBoletines(),
        fetchUsuarios()
      ]);
      setBulletins(bulletinsData);
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (bulletin: Boletin) => {
    setDeleteModal({
      isOpen: true,
      bulletinId: bulletin.id_boletin,
      bulletinTitle: bulletin.titulo,
      isDeleting: false
    });
  };

  const closeDeleteModal = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({
        isOpen: false,
        bulletinId: null,
        bulletinTitle: '',
        isDeleting: false
      });
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleteModal(prev => ({ ...prev, isDeleting: true }));

      await deleteBoletin(deleteModal.bulletinId);
      setBulletins(bulletins.filter(b => b.id_boletin !== deleteModal.bulletinId));

      setDeleteModal({
        isOpen: false,
        bulletinId: null,
        bulletinTitle: '',
        isDeleting: false
      });
    } catch (err) {
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
      alert('Error al eliminar el boletín');
    }
  };

  const handleToggleStatus = async (bulletin: Boletin) => {
    try {
      const newStatus = bulletin.estado === 1 ? 0 : 1;
      await updateBoletin(bulletin.id_boletin, { estado: newStatus });
      setBulletins(bulletins.map(b =>
        b.id_boletin === bulletin.id_boletin
          ? { ...b, estado: newStatus }
          : b
      ));
    } catch (err) {
      alert('Error al cambiar el estado del boletín');
    }
  };

  const handleDownload = (bulletin: Boletin) => {
    if (bulletin.ruta) {
      window.open(bulletin.ruta, '_blank');
    } else {
      alert('No hay archivo disponible para descargar');
    }
  };

  // Esta función ahora abre el editor directamente en la tabla
  const handleEdit = (bulletin: Boletin) => {
    setEditingBoletinIdInTable(bulletin.id_boletin);
    setExpandedRows(prev => ({ // Asegúrate de que la fila esté expandida
      ...prev,
      [bulletin.id_boletin]: true
    }));
  };

  const handleSaveBoletin = (updatedBoletin: Boletin) => {
    setBulletins(bulletins.map(b =>
      b.id_boletin === updatedBoletin.id_boletin ? updatedBoletin : b
    ));
    // Cierra el editor en la tabla después de guardar
    setEditingBoletinIdInTable(null);
  };

  // Modificado para alternar expansión O iniciar edición si es el caso
  const toggleExpand = (id: number) => {
    // Si ya está en modo edición, no hagas nada con la expansión al hacer clic en la fila
    if (editingBoletinIdInTable === id) {
      setEditingBoletinIdInTable(null); // Si se hace clic en la fila mientras se edita, cierra el editor
    } else {
      setEditingBoletinIdInTable(null); // Asegura que no haya otro editor abierto
      setExpandedRows(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const getStatusBadge = (estado: number) => {
    return estado === 1
      ? <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full text-center min-w-[60px]">Activo</span>
      : <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full text-center min-w-[60px]">Inactivo</span>;
  };

  const getDocumentIcon = (titulo: string) => {
    return <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorInfo = (autorId: number) => {
    const user = users.find(u => u.id_usuario === autorId);
    return {
      name: user ? `${user.nombre} ${user.apellido}` : `Usuario ${autorId}`,
      avatar: user?.foto || `https://images.unsplash.com/photo-1494790108755-2616b9c03d4c?w=40&h=40&fit=crop&crop=face`
    };
  };

  const filteredBulletins = bulletins.filter(bulletin => {
    const authorInfo = getAuthorInfo(bulletin.autor);
    const matchesSearch = bulletin.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && bulletin.estado === 1) ||
      (statusFilter === 'inactive' && bulletin.estado === 0);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="ml-4 text-lg">Cargando boletines...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-lg mb-4">
            {error}
          </div>
          <Button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Boletines</h1>
        <p className="text-gray-600">Aquí se muestran todos los boletines del sistema y las acciones realizables sobre estos</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar boletines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Detalle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Autor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Vistas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBulletins.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No se encontraron boletines.
                </td>
              </tr>
            ) : (
              filteredBulletins.map((bulletin) => (
                <React.Fragment key={bulletin.id_boletin}>
                  {/* Fila principal */}
                  <tr
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(bulletin.id_boletin)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expandedRows[bulletin.id_boletin] || editingBoletinIdInTable === bulletin.id_boletin ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                          src={getAuthorInfo(bulletin.autor).avatar}
                          alt={getAuthorInfo(bulletin.autor).name}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {getAuthorInfo(bulletin.autor).name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center min-w-0">
                        {getDocumentIcon(bulletin.titulo)}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {bulletin.titulo}
                          </div>
                          <div className="text-xs text-gray-500">PDF Document</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {formatDate(bulletin.fecha)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {bulletin.vistas.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(bulletin.estado)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => { e.stopPropagation(); handleDownload(bulletin); }}
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-green-600 hover:bg-green-700"
                          onClick={(e) => { e.stopPropagation(); handleEdit(bulletin); }}
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-gray-600 hover:bg-gray-700"
                          onClick={(e) => { e.stopPropagation(); handleToggleStatus(bulletin); }}
                          title={bulletin.estado === 1 ? "Desactivar" : "Activar"}
                        >
                          {bulletin.estado === 1 ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-red-600 hover:bg-red-700"
                          onClick={(e) => { e.stopPropagation(); handleDeleteClick(bulletin); }}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Fila expandida para detalles O editor */}
                  {(expandedRows[bulletin.id_boletin] && editingBoletinIdInTable !== bulletin.id_boletin) && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Período:</span>
                            <p className="text-gray-600 mt-1">
                              {bulletin.desde && bulletin.hasta
                                ? `${formatDate(bulletin.desde)} - ${formatDate(bulletin.hasta)}`
                                : 'No especificado'
                              }
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Instrucciones:</span>
                            <p className="text-gray-600 mt-1">{bulletin.instruccion || 'Sin instrucciones'}</p>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">Contenido:</span>
                            <p className="text-gray-600 mt-1">{bulletin.cuerpo || 'Sin descripción'}</p>
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">Archivo:</span>
                            <p className="text-gray-600 mt-1">{bulletin.ruta || 'Sin archivo'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {/* Fila de edición */}
                  {editingBoletinIdInTable === bulletin.id_boletin && (
                    <tr className="bg-white border-b border-gray-200">
                      <td colSpan={7} className="p-0"> {/* Ocupa toda la fila */}
                        <BoletinEditor
                          isOpen={true} // Siempre abierto cuando editingBoletinIdInTable coincide
                          onClose={() => setEditingBoletinIdInTable(null)} // Cierra el editor
                          boletinId={bulletin.id_boletin}
                          onSave={handleSaveBoletin}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Mostrando {filteredBulletins.length} de {bulletins.length} boletines
      </div>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        bulletinTitle={deleteModal.bulletinTitle}
        isDeleting={deleteModal.isDeleting}
      />
    </div>
  );
};

export default BulletinAdmin;