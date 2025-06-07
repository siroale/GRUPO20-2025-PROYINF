// BoletinDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Eye, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

// Interfaces para los tipos de datos
interface Boletin {
  id_boletin: number;
  titulo: string;
  fecha: string;
  vistas: number;
  imagen: string | null;
  ruta: string | null;
  estado: number;
  cuerpo: string;
  desde: string;
  hasta: string;
  instruccion: string | null;
  autor: number;
}

interface Autor {
  id: number;
  nombre: string;
  apellido: string;
}

export default function BoletinDetail() {
  const { id } = useParams<{ id: string }>();
  const [boletin, setBoletin] = useState<Boletin | null>(null);
  const [autor, setAutor] = useState<Autor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoletinDetail = async () => {
      try {
        // Obtener detalles del boletín
        const response = await fetch(`http://localhost:8000/api/boletin/${id}/`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Boletin = await response.json();
        setBoletin(data);

        // Obtener información del autor
        if (data.autor) {
          try {
            const autorResponse = await fetch(`http://localhost:8000/api/usuario/${data.autor}/`);
            if (autorResponse.ok) {
              const autorData: Autor = await autorResponse.json();
              setAutor(autorData);
            }
          } catch (err) {
            console.error(`Error al obtener información del autor:`, err);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos del boletín:", err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchBoletinDetail();
  }, [id]);

  // Incrementar contador de vistas
  const incrementarVistas = async () => {
    if (!boletin) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/boletin/${boletin.id_boletin}/incrementar-vistas/`
      );

      if (response.status === 200) {
        // Actualizar el estado local con el nuevo contador de vistas
        setBoletin({
          ...boletin,
          vistas: response.data.vistas
        });
      }
    } catch (error) {
      console.error("Error al incrementar vistas:", error);
    }
  };

  // Formatear fecha
  const formatearFecha = (fechaStr: string | undefined): string => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtener nombre completo del autor
  const getNombreAutor = (): string => {
    if (autor) {
      return `${autor.nombre} ${autor.apellido}`;
    }
    return "Cargando autor...";
  };

  // Manejar la descarga del PDF
  const handleDownload = async (): Promise<void> => {
    if (boletin && boletin.ruta) {
      // Incrementar contador de vistas
      await incrementarVistas();

      // Crear un enlace temporal y simular el clic
      const link = document.createElement('a');
      link.href = boletin.ruta;

      // Extraer el nombre del archivo de la ruta
      const fileName = boletin.ruta.split('/').pop() || 'boletin.pdf';
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Manejar la vista previa del PDF
  const handlePreview = async (): Promise<void> => {
    if (boletin && boletin.ruta) {
      // Incrementar contador de vistas
      await incrementarVistas();

      // Abrir el PDF en una nueva pestaña
      window.open(boletin.ruta, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
        <Alert variant="destructive">
          <AlertDescription>
            Error al cargar los datos del boletín: {error}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link to="/">
            {/* Botón de error: Usar un color de fondo visible */}
            <Button className="flex items-center bg-blue-600 text-white hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a boletines
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!boletin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
        <Alert>
          <AlertDescription>
            No se encontró el boletín solicitado
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link to="/">
            {/* Botón de no encontrado: Usar un color de fondo visible */}
            <Button className="flex items-center bg-blue-600 text-white hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a boletines
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="mb-6">
        <Link to="/">
          {/* Botón "Volver": Usar un color de fondo visible */}
          <Button className="flex items-center bg-gray-600 text-white hover:bg-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a boletines
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">{boletin.titulo}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatearFecha(boletin.fecha)}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{getNombreAutor()}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-1" />
              <span>{boletin.vistas} vistas</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-blue-800 font-medium">La información contenida en este boletín abarca el periodo: {formatearFecha(boletin.desde)} - {formatearFecha(boletin.hasta)}</p>
          </div>

          {boletin.imagen && (
            <div className="mb-6">
              <img
                src={boletin.imagen}
                alt={`Imagen de ${boletin.titulo}`}
                className="w-full max-h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-line">{boletin.cuerpo}</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Botón de Vista Previa: Usar un color de fondo claro y texto oscuro */}
            <Button
              // Eliminado variant="secondary" para tomar control total con className
              size="lg"
              className="flex items-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              onClick={handlePreview}
              disabled={!boletin.ruta}
            >
              <FileText className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>

            {/* Botón Descargar PDF: Usar un color de fondo claro y texto oscuro */}
            <Button
              // Eliminado variant="secondary" para tomar control total con className
              size="lg"
              className="flex items-center bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              onClick={handleDownload}
              disabled={!boletin.ruta}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}