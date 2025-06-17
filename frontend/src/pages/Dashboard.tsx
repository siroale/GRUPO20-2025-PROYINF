import React, { useState, useEffect, useCallback } from 'react'; // Importa useCallback
import {
  Users,
  FileText,
  PlusCircle,
  Settings,
  BarChart3,
  Eye,
  Calendar,
  TrendingUp,
  Activity,
  Menu,
  X,
  ChevronDown,
  Home,
  Bell,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdminRouteGuard } from "@/components/AdminRouteGuard";
import { Separator } from '@/components/ui/separator';

// Importar servicios
import { fetchUsuarios, getCurrentUser, isAdmin } from '@/services/UserManagementService';
import { fetchBoletines, fetchBoletinesRecientes, fetchBoletinesMasVistos, fetchBoletinesVigentes } from '@/services/BoletinManagementService';

// Páginas - Importa tus páginas reales aquí
import CrearBoletinPage from '@/pages/CreateBoletin';
import GestionUsuariosPage from '@/pages/AdminPage';
import ActividadBoletinesPage from '@/pages/BoletinActivity';
import GestionBoletinesPage from '@/pages/BoletinManagement';
import Stats from '@/pages/Stats';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    usuarios: [],
    boletines: [],
    boletinesRecientes: [],
    boletinesMasVistos: [],
    boletinesVigentes: [],
    currentUser: null,
    stats: {
      totalUsuarios: 0,
      totalBoletines: 0,
      boletinesVigentes: 0,
      totalVistas: 0
    }
  });
  const [loading, setLoading] = useState(true);

  // **Paso 1: Crear una función fetchData usando useCallback**
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [usuarios, boletines, recientes, masVistos, vigentes] = await Promise.all([
        fetchUsuarios(),
        fetchBoletines(),
        fetchBoletinesRecientes(5),
        fetchBoletinesMasVistos(10),
        fetchBoletinesVigentes()
      ]);

      const currentUser = getCurrentUser(); // Asume que getCurrentUser es síncrono o cacheado
      const totalVistas = boletines.reduce((acc, boletin) => acc + boletin.vistas, 0);

      setDashboardData({
        usuarios,
        boletines,
        boletinesRecientes: recientes,
        boletinesMasVistos: masVistos,
        boletinesVigentes: vigentes,
        currentUser,
        stats: {
          totalUsuarios: usuarios.length,
          totalBoletines: boletines.length,
          boletinesVigentes: vigentes.length,
          totalVistas
        }
      });
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
      // Opcional: Mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  }, []); // El array de dependencias está vacío porque esta función no depende de ningún estado o prop del componente para ser recreada.

  // **Paso 2: Llamar a loadDashboardData en el useEffect**
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]); // Agrega loadDashboardData al array de dependencias de useEffect.
                          // React garantiza que loadDashboardData (debido a useCallback) no cambiará
                          // a menos que sus propias dependencias cambien, evitando bucles infinitos.


  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'crear_boletin',
      label: 'Crear Boletín',
      icon: PlusCircle,
      path: '/crear_boletin'
    },
    {
      id: 'gestion_boletines',
      label: 'Gestión Boletines',
      icon: FileText,
      path: '/gestion_boletines'
    },
    {
      id: 'gestion_usuarios',
      label: 'Gestión Usuarios',
      icon: Users,
      path: '/gestion_usuarios'
    },
    {
      id: 'actividad_boletines',
      label: 'Actividad Boletines',
      icon: Activity,
      path: '/actividad_boletines'
    },
    {
      id: 'estadisticas',
      label: 'Estadísticas',
      icon: BarChart3,
      path: '/estadisticas'
    }
  ];

  const StatCard = ({ icon: Icon, value, label, description, color = 'text-blue-600' }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const SidebarContent = () => (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Collapse Button - Arriba */}
      <div className="border-b p-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="h-8 w-8 p-0 rounded-md hover:bg-gray-100"
          title={sidebarCollapsed ? "Expandir menú" : "Contraer menú"}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation - Centro */}
      <nav className="flex-1 p-3 overflow-hidden">
        {!sidebarCollapsed && (
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Menú Principal
          </div>
        )}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            const handleMenuItemClick = () => {
              setActiveSection(item.id);
              if (item.id === 'dashboard') { // **Paso 3: Llama a loadDashboardData en el clic del Dashboard**
                loadDashboardData();
              }
              setMobileOpen(false); // Cierra el menú móvil si está abierto
            };

            return (
              <AdminRouteGuard>
                <button
                  key={item.id}
                  onClick={handleMenuItemClick} // Usa la nueva función handleMenuItemClick
                  className={`
                    w-full flex items-center rounded-md transition-all duration-200
                    ${sidebarCollapsed ? 'justify-center p-2 h-10' : 'justify-start px-3 py-2 h-10'}
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                        : 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                    }
                  `}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              </AdminRouteGuard>
            );
          })}
        </div>
      </nav>

      {/* User Profile - Abajo */}
      <div className="border-t p-3">
        {sidebarCollapsed ? (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={dashboardData.currentUser?.foto} />
              <AvatarFallback className="text-xs">
                {dashboardData.currentUser?.nombre?.[0]}{dashboardData.currentUser?.apellido?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center space-x-3 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={dashboardData.currentUser?.foto} />
              <AvatarFallback className="text-xs">
                {dashboardData.currentUser?.nombre?.[0]}{dashboardData.currentUser?.apellido?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">
                {dashboardData.currentUser?.nombre} {dashboardData.currentUser?.apellido}
              </p>
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <p className="text-xs text-muted-foreground">En línea</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando datos...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <AdminRouteGuard>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Vista general del sistema de boletines
                </p>
              </div>

              {/* Estadísticas principales */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  icon={Users}
                  value={dashboardData.stats.totalUsuarios.toLocaleString()}
                  label="Usuarios Activos"
                  description="Total de usuarios registrados"
                  color="text-orange-600"
                />
                <StatCard
                  icon={FileText}
                  value={dashboardData.stats.totalBoletines.toLocaleString()}
                  label="Total Boletines"
                  description="Boletines en el sistema"
                  color="text-blue-600"
                />
                <StatCard
                  icon={Calendar}
                  value={dashboardData.stats.boletinesVigentes.toLocaleString()}
                  label="Boletines Vigentes"
                  description="Actualmente activos"
                  color="text-green-600"
                />
                <StatCard
                  icon={Eye}
                  value={dashboardData.stats.totalVistas.toLocaleString()}
                  label="Total Vistas"
                  description="Visualizaciones totales"
                  color="text-purple-600"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Boletines Recientes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Boletines Recientes</CardTitle>
                    <CardDescription>
                      Últimos boletines publicados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.boletinesRecientes.length > 0 ? (
                        dashboardData.boletinesRecientes.map((boletin) => (
                          <div key={boletin.id_boletin} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{boletin.titulo}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(boletin.fecha).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            <Badge variant={boletin.estado === 1 ? "default" : "secondary"}>
                              {boletin.vistas} vistas
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No hay boletines recientes.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Boletines Más Vistos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Boletines Más Vistos</CardTitle>
                    <CardDescription>
                      Contenido con mayor engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.boletinesMasVistos.slice(0, 5).length > 0 ? (
                        dashboardData.boletinesMasVistos.slice(0, 5).map((boletin, index) => (
                          <div key={boletin.id_boletin} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{boletin.titulo}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(boletin.fecha).toLocaleDateString('es-ES')}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {boletin.vistas.toLocaleString()} vistas
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No hay boletines más vistos.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actividad del Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Sistema</CardTitle>
                  <CardDescription>
                    Estado actual de la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardData.usuarios.filter(u => u.activo === 1).length}
                      </div>
                      <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {dashboardData.usuarios.filter(u => isAdmin(u)).length}
                      </div>
                      <p className="text-sm text-muted-foreground">Administradores</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round(dashboardData.stats.totalVistas / Math.max(dashboardData.stats.totalBoletines, 1))}
                      </div>
                      <p className="text-sm text-muted-foreground">Vistas Promedio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AdminRouteGuard>
        );

      case 'crear_boletin':
        return <CrearBoletinPage />;

      case 'gestion_boletines':
        return <GestionBoletinesPage />;

      case 'gestion_usuarios':
        return <GestionUsuariosPage />;

      case 'actividad_boletines':
        return <ActividadBoletinesPage />;

      case 'estadisticas':
        return (
          <AdminRouteGuard>
            <Stats />
          </AdminRouteGuard>
        );

      default:
        return (
          <AdminRouteGuard>
            <Card>
              <CardHeader>
                <CardTitle>Sección en Desarrollo</CardTitle>
                <CardDescription>
                  Esta funcionalidad está siendo desarrollada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  La sección "{menuItems.find(item => item.id === activeSection)?.label}" estará disponible próximamente.
                </p>
              </CardContent>
            </Card>
          </AdminRouteGuard>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar completamente rediseñado */}
      <div className={`hidden md:block ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out border-r bg-background flex-shrink-0`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="md:hidden">
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-40">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content sin header innecesario */}
      <div className="flex-1 min-w-0 relative">
        {/* Botón móvil flotante */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-md"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Content ocupando toda la altura sin scroll extra */}
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;