import { useState, useEffect } from "react";
import { AdminRouteGuard } from "@/components/AdminRouteGuard";

const ActivityLogTable = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    user: "",
    logType: "",
    fromDate: "",
    toDate: "",
  });

  // Simulacion de datos (Hay que hacer bien esto en la base de datos)
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Datos de ejemplo para visualización
        const mockData = [
          {
            id: 10,
            date: "2025-05-18T14:30:15",
            logType: "create",
            bulletin: "Boletín mensual",
            doneBy: {
              name: "Maria Rodriguez",
              email: "maria@ejemplo.com"
            }
          },
          {
            id: 9,
            date: "2025-05-18T14:28:16",
            logType: "edit",
            bulletin: "Boletín semanal",
            doneBy: {
              name: "Carlos Mendez",
              email: "carlos@ejemplo.com"
            }
          },
          {
            id: 8,
            date: "2025-05-18T14:27:36",
            logType: "edit",
            bulletin: "Boletín especial",
            doneBy: {
              name: "Ana Suarez",
              email: "ana@ejemplo.com"
            }
          },
          {
            id: 7,
            date: "2025-05-18T14:27:13",
            logType: "delete",
            bulletin: "Boletín trimestral",
            doneBy: {
              name: "Juan Perez",
              email: "juan@ejemplo.com"
            }
          },
          {
            id: 6,
            date: "2025-05-18T14:26:57",
            logType: "edit",
            bulletin: "Boletín mensual",
            doneBy: {
              name: "Maria Rodriguez",
              email: "maria@ejemplo.com"
            }
          },
          {
            id: 5,
            date: "2025-05-18T14:26:46",
            logType: "delete",
            bulletin: "Boletín antiguo",
            doneBy: {
              name: "Carlos Mendez",
              email: "carlos@ejemplo.com"
            }
          },
        ];
        
        setActivities(mockData);
        setFilteredActivities(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Aplicar filtros a los datos
  const handleFilter = () => {
    setLoading(true);
    
    // Filtrar los datos según los criterios seleccionados
    const filtered = activities.filter(activity => {
      // Filtro por usuario (nombre o correo)
      const userMatch = filters.user === "" || 
        activity.doneBy.name.toLowerCase().includes(filters.user.toLowerCase()) || 
        activity.doneBy.email.toLowerCase().includes(filters.user.toLowerCase());
      
      // Filtro por tipo de log
      const logTypeMatch = filters.logType === "" || activity.logType === filters.logType;
      
      // Filtro por fecha (desde)
      let fromDateMatch = true;
      if (filters.fromDate) {
        const activityDate = new Date(activity.date);
        const fromDate = new Date(filters.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        fromDateMatch = activityDate >= fromDate;
      }
      
      // Filtro por fecha (hasta)
      let toDateMatch = true;
      if (filters.toDate) {
        const activityDate = new Date(activity.date);
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999);
        toDateMatch = activityDate <= toDate;
      }
      
      return userMatch && logTypeMatch && fromDateMatch && toDateMatch;
    });
    
    setFilteredActivities(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Reiniciar filtros
  const resetFilters = () => {
    setFilters({
      user: "",
      logType: "",
      fromDate: "",
      toDate: "",
    });
    setFilteredActivities(activities);
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Función para calcular tiempo relativo (hace X minutos)
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return `${diffInSeconds} segundos atrás`;
      
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''} atrás`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} día${diffInDays > 1 ? 's' : ''} atrás`;
    } catch (e) {
      return "";
    }
  };

  // Función para renderizar el badge del tipo de log con el color adecuado
  const getLogTypeBadge = (logType) => {
    const styles = {
      create: "bg-blue-500 text-white px-2 py-1 rounded-md text-xs",
      edit: "bg-orange-400 text-white px-2 py-1 rounded-md text-xs",
      delete: "bg-red-500 text-white px-2 py-1 rounded-md text-xs",
    };
    
    return (
      <span className={styles[logType] || "bg-gray-500 text-white px-2 py-1 rounded-md text-xs"}>
        {logType}
      </span>
    );
  };

  return (
    <AdminRouteGuard>
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold">Registro de Actividad de Boletines</h2>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">USUARIO</label>
            <input
              type="text"
              placeholder="Nombre o correo"
              value={filters.user}
              onChange={(e) => setFilters({...filters, user: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TIPO DE LOG</label>
            <select
              value={filters.logType}
              onChange={(e) => setFilters({...filters, logType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Todos</option>
              <option value="create">Crear</option>
              <option value="edit">Editar</option>
              <option value="delete">Eliminar</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DESDE</label>
            <div className="flex">
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HASTA</label>
            <div className="flex">
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2">
            <button 
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow-sm flex-1"
              onClick={handleFilter}
            >
              FILTRAR
            </button>
            <button 
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 font-medium rounded-md shadow-sm"
              onClick={resetFilters}
            >
              LIMPIAR
            </button>
          </div>
        </div>
        
        {/* Tabla de actividades */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-2 text-sm text-gray-500">
            Mostrando 1 a {filteredActivities.length} de {activities.length} registros
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  FECHA
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  TIPO DE LOG
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  BOLETÍN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  REALIZADO POR
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Cargando datos...
                  </td>
                </tr>
              ) : filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron registros de actividad
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(activity.date)} - {getRelativeTime(activity.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getLogTypeBadge(activity.logType)}
                      {activity.bulletin && <span className="ml-2 text-gray-500">en boletines</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.bulletin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{activity.doneBy.name}</div>
                      <div className="text-sm text-gray-500">{activity.doneBy.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        VER
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminRouteGuard>
  );
};

export default ActivityLogTable;