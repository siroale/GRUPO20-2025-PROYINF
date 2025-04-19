import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye } from "lucide-react";

export default function Home() {
  const [boletines, setBoletines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const boletinesPorPagina = 5;

  useEffect(() => {
    const fetchBoletines = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/boletin/");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setBoletines(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBoletines();
  }, []);

  // Calcular los índices de los boletines a mostrar
  const indexOfLastBoletin = currentPage * boletinesPorPagina;
  const indexOfFirstBoletin = indexOfLastBoletin - boletinesPorPagina;
  const boletinesActuales = boletines.slice(indexOfFirstBoletin, indexOfLastBoletin);
  
  // Calcular número total de páginas
  const totalPaginas = Math.ceil(boletines.length / boletinesPorPagina);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Formatear fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Bienvenido</h2>
      <p className="text-gray-600 mb-8">Aquí podras encontrar boletines con las informaciones agricolas mas relevantes</p>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Boletines Informativos</h3>
        
        {loading && (
          Array(3).fill().map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="h-48 w-full md:w-64" />
              <div className="p-6 w-full space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Error al cargar los datos: {error}
            </AlertDescription>
          </Alert>
        )}
        
        {!loading && boletines.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No se encontraron boletines disponibles.</p>
          </div>
        )}
        
        {boletinesActuales.map((boletin) => (
          <div key={boletin.id_boletin} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:w-64 h-48 bg-gray-200 flex items-center justify-center">
              {boletin.imagen ? (
                <img 
                  src={boletin.imagen} 
                  alt={`Imagen de ${boletin.titulo}`} 
                  className="w-full h-full object-cover"
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
                <h4 className="text-xl font-semibold mb-2 text-blue-800">{boletin.titulo}</h4>
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
                  <span>Autor: {boletin.autor}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{boletin.cuerpo}</p>
              
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <p className="!text-white">Leer más</p>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            >
              <p className="!text-white">Anterior</p>
            </Button>
            
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => paginate(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPaginas))} 
              disabled={currentPage === totalPaginas}
            >
              <p className="!text-white">Siguiente</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}