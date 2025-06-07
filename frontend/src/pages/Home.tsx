import { useState, useEffect, BaseSyntheticEvent } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Home() {
  const [boletines, setBoletines] = useState<any[]>([]);
  const [autores, setAutores] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const boletinesPorPagina = 3;

  useEffect(() => {
    const fetchBoletines = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/boletin/");

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const boletinesArray = Array.isArray(data) ? data : [data];

        // Ordenar boletines por fecha (del más reciente al más antiguo)
        const boletinesOrdenados = [...boletinesArray].sort((a, b) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });

        setBoletines(boletinesOrdenados);

        // Obtener IDs únicos de autores
        const autorIds = [...new Set(boletinesOrdenados.map(b => b.autor))];

        // Obtener información de cada autor
        const autoresInfo: Record<number, any> = {};
        await Promise.all(
          autorIds.map(async (id) => {
            try {
              const autorResponse = await fetch(`http://localhost:8000/api/usuario/${id}/`);
              if (autorResponse.ok) {
                const autorData = await autorResponse.json();
                autoresInfo[id] = autorData;
              }
            } catch (err) {
              console.error(`Error al obtener información del autor ID ${id}:`, err);
            }
          })
        );

        setAutores(autoresInfo);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchBoletines();
  }, []);

  // Filtrar boletines según el término de búsqueda
  const boletinesFiltrados = boletines.filter(boletin => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      boletin.titulo.toLowerCase().includes(searchTermLower) ||
      boletin.cuerpo.toLowerCase().includes(searchTermLower)
    );
  });

  // Restablecer a la primera página cuando cambia el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calcular los índices de los boletines a mostrar
  const indexOfLastBoletin = currentPage * boletinesPorPagina;
  const indexOfFirstBoletin = indexOfLastBoletin - boletinesPorPagina;
  const boletinesActuales = boletinesFiltrados.slice(indexOfFirstBoletin, indexOfLastBoletin);

  // Calcular número total de páginas
  const totalPaginas = Math.ceil(boletinesFiltrados.length / boletinesPorPagina);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Formatear fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtener nombre completo del autor
  const getNombreAutor = (autorId: number) => {
    if (autores[autorId]) {
      return `${autores[autorId].nombre} ${autores[autorId].apellido}`;
    }
    return "Cargando autor...";
  };

  // Función para manejar cambios en la barra de búsqueda
  const handleSearchChange = (e: BaseSyntheticEvent) => {
    setSearchTerm(e.target.value);
  };

  // Generar el componente de paginación con mejor indicación visual
  const renderPagination = () => {
    if (totalPaginas <= 1) return null;

    const paginationItems = [];

    // Lógica para mostrar ellipsis si hay muchas páginas
    const maxVisiblePages = 5;
    let startPage = 1;
    let endPage = totalPaginas;

    if (totalPaginas > maxVisiblePages) {
      const middlePoint = Math.floor(maxVisiblePages / 2);

      if (currentPage <= middlePoint + 1) {
        // Estamos cerca del inicio
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPaginas - middlePoint) {
        // Estamos cerca del final
        startPage = totalPagalias - maxVisiblePages + 1;
      } else {
        // Estamos en el medio
        startPage = currentPage - middlePoint;
        endPage = currentPage + middlePoint;
      }
    }

    // Botón Anterior
    paginationItems.push(
      <Button
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="
          bg-gray-800 text-white hover:bg-gray-700
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
        "
      >
        Anterior
      </Button>
    );

    // Primera página si no es visible
    if (startPage > 1) {
      paginationItems.push(
        <Button
          key={1}
          onClick={() => paginate(1)}
          className="
            w-10 bg-gray-800 text-white hover:bg-gray-700
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
        >
          1
        </Button>
      );

      // Ellipsis si hay salto
      if (startPage > 2) {
        paginationItems.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-600">...</span>
        );
      }
    }

    // Páginas numeradas
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Button
          key={i}
          onClick={() => paginate(i)}
          className={`
            w-10
            ${
              currentPage === i
                ? "bg-black text-white font-bold border-2 border-gray-400 shadow-md scale-105" // Página activa: Negro con borde gris
                : "bg-gray-800 text-white hover:bg-gray-700" // Página inactiva: Gris oscuro
            }
            transition-all duration-200 ease-in-out
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          `}
        >
          {i}
        </Button>
      );
    }

    // Última página si no es visible
    if (endPage < totalPaginas) {
      // Ellipsis si hay salto
      if (endPage < totalPaginas - 1) {
        paginationItems.push(
          <span key="ellipsis2" className="px-2 py-2 text-gray-600">...</span>
        );
      }

      paginationItems.push(
        <Button
          key={totalPaginas}
          onClick={() => paginate(totalPaginas)}
          className="
            w-10 bg-gray-800 text-white hover:bg-gray-700
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
        >
          {totalPaginas}
        </Button>
      );
    }

    // Botón Siguiente
    paginationItems.push(
      <Button
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPaginas))}
        disabled={currentPage === totalPaginas}
        className="
          bg-gray-800 text-white hover:bg-gray-700
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
        "
      >
        Siguiente
      </Button>
    );

    return (
      <div className="flex flex-wrap justify-center mt-8 gap-2">
        {paginationItems}
      </div>
    );
  };

  // Renderizado del esqueleto mientras carga
  const renderSkeletons = () => (
    <div className="space-y-6">
      {Array(3).fill(null).map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="h-48 w-full md:w-64" />
          <div className="p-6 w-full space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  // Renderizado del contenido cuando haya terminado de cargar
  const renderContent = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Últimas Entradas</h3> {/* Título gris oscuro */}
        {boletinesFiltrados.length > 0 && (
          <div className="text-sm text-gray-500">
            Mostrando {indexOfFirstBoletin + 1}-{Math.min(indexOfLastBoletin, boletinesFiltrados.length)} de {boletinesFiltrados.length} boletines
            {searchTerm && <span> (filtrado de {boletines.length} total)</span>}
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Error al cargar los datos: {error}
          </AlertDescription>
        </Alert>
      )}

      {boletinesFiltrados.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-500 mb-2">No se encontraron boletines</p>
          {searchTerm && (
            <p className="text-gray-400 text-sm">
              No hay resultados para "{searchTerm}". Intenta con otros términos.
            </p>
          )}
          {searchTerm && (
            <Button
              onClick={() => setSearchTerm("")}
              className="mt-4 bg-gray-800 text-white hover:bg-gray-700" // Botón Limpiar búsqueda gris oscuro
            >
              Limpiar búsqueda
            </Button>
          )}
        </div>
      )}

      {/* Contenedor con altura fija y scroll */}
      <div className="boletines-container" style={{ height: '71vh', overflowY: 'auto' }}>
        {boletinesActuales.map((boletin) => (
          <div key={boletin.id_boletin} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-4" style={{ minHeight: '200px' }}>
            <div className="md:w-64 h-48 bg-gray-200 flex items-center justify-center">
              {boletin.imagen ? (
                <img
                  src={boletin.imagen}
                  alt={`Imagen de ${boletin.titulo}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2">Sin imagen</p>
                </div>
              )}
            </div>

            <div className="p-6 flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold mb-2 text-gray-800">{boletin.titulo}</h4> {/* Título gris oscuro */}
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye size={16} className="mr-1" />
                  <span>{boletin.vistas}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatearFecha(boletin.fecha)}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{getNombreAutor(boletin.autor)}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{boletin.cuerpo}</p>

              <div className="mt-4">
                <Link to={`/boletin/${boletin.id_boletin}`}>
                  <Button
                    size="default"
                    className="
                      bg-gray-800 text-white hover:bg-gray-700
                      disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
                    "
                  >
                    Leer más
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación mejorada */}
      {renderPagination()}
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Boletines Informativos</h2> {/* Título principal gris oscuro */}
      <p className="text-gray-600 mb-8">Aquí podrás encontrar boletines con las informaciones agrícolas más relevantes</p>

      {/* Barra de búsqueda - siempre visible */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por título o contenido..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 py-2 pr-4 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500" // Focus ring gris
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-6">
        {loading ? renderSkeletons() : renderContent()}
      </div>
    </div>
  );
}