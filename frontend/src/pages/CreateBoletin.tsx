import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminRouteGuard } from "@/components/AdminRouteGuard";

import { Calendar, Plus, X, Search } from "lucide-react";

interface Fuente {
  id_fuente: number;
  nombre: string;
  link: string;
  categoria: string;
}

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
}

export default function CreateBoletinAI() {
  const [titulo, setTitulo] = useState("");
  const [promptIA, setPromptIA] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [fuentes, setFuentes] = useState<Fuente[]>([]);
  const [fuentesSeleccionadas, setFuentesSeleccionadas] = useState<number[]>([]);
  const [modalFuentesOpen, setModalFuentesOpen] = useState(false);
  const [busquedaFuente, setBusquedaFuente] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const navigate = useNavigate();

  // Cargar fuentes disponibles
  useEffect(() => {
    const fetchFuentes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/fuente/");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setFuentes(data);
      } catch (err) {
        console.error("Error al cargar fuentes:", err);
        setError("No se pudieron cargar las fuentes disponibles");
      }
    };

    fetchFuentes();
  }, []);

  // Filtrar fuentes según el término de búsqueda
  const fuentesFiltradas = fuentes.filter(fuente =>
    fuente.nombre.toLowerCase().includes(busquedaFuente.toLowerCase()) ||
    fuente.link.toLowerCase().includes(busquedaFuente.toLowerCase()) ||
    fuente.categoria.toLowerCase().includes(busquedaFuente.toLowerCase())
  );

  const generateContent = async () => {
    if (!promptIA) {
      setError("Por favor ingresa un prompt para la IA");
      return;
    }

    if (fuentesSeleccionadas.length === 0) {
      setError("Por favor selecciona al menos una fuente de información");
      return;
    }

    setGeneratingContent(true);
    setError(null);

    try {
      // Aquí se implementará la llamada a la IA (simulación por ahora)
      // En una implementación real, esta sería una llamada a tu API que se comunica con un modelo de IA
      console.log("Generando contenido con prompt:", promptIA);
      console.log("Fuentes seleccionadas:", fuentesSeleccionadas);

      // Simulamos una espera de la respuesta de la IA
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Por ahora, generamos un contenido de ejemplo
      const contenidoGenerado = `# Contenido generado basado en el prompt: "${promptIA}"

Este es un contenido de ejemplo que simula lo que generaría la IA basado en la consulta realizada.

El boletín contiene información obtenida de las fuentes seleccionadas, analizada y estructurada para presentar un resumen coherente y útil sobre el tema solicitado.

## Puntos principales:
- Primer punto importante derivado del análisis de las fuentes
- Segundo punto importante con datos relevantes
- Tercer punto destacado con conclusiones

## Análisis detallado
Aquí se incluiría un análisis más profundo de la información obtenida, con citas y referencias a las fuentes consultadas.

Este contenido es solo un ejemplo y será reemplazado por el contenido real generado por la IA una vez implementada.`;

      setGeneratedContent(contenidoGenerado);

      // Si no hay título, generamos uno basado en el prompt
      if (!titulo) {
        setTitulo(`Boletín sobre ${promptIA.split(' ').slice(0, 3).join(' ')}...`);
      }

    } catch (err) {
      console.error("Error al generar contenido con IA:", err);
      setError("No se pudo generar el contenido. Por favor intenta de nuevo.");
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !generatedContent || !fecha) {
      setError("Por favor completa todos los campos obligatorios y genera contenido");
      return;
    }

    if (!usuario) {
      setError("Debes iniciar sesión para crear un boletín");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Crear el boletín
      const boletinData = {
        titulo,
        cuerpo: generatedContent,
        fecha,
        imagen: "/media/boletin/default_pic.png", // Imagen por defecto
        ruta: "/media/boletin/VeranoInvencible.pdf",
        estado: 1, // Asumiendo 1 para activo
        vistas: 0,
        instruccion: promptIA,
        autor: usuario.id_usuario,
      };

      const response = await fetch("http://localhost:8000/api/boletin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boletinData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const nuevoBoletin = await response.json();
      const idBoletin = nuevoBoletin.id_boletin;

      // 2. Vincular las fuentes al boletín
      if (fuentesSeleccionadas.length > 0) {
        for (const idFuente of fuentesSeleccionadas) {
          const fuenteBoletinData = {
            id_boletin: idBoletin,
            id_fuente: idFuente
          };

          const fuenteResponse = await fetch("http://localhost:8000/api/boletin_fuente/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fuenteBoletinData),
          });

          if (!fuenteResponse.ok) {
            console.warn(`Error al vincular fuente ${idFuente} con boletín ${idBoletin}`);
          }
        }
      }

      setSuccess(true);
      setTimeout(() => {
        navigate(`/boletin/${idBoletin}`);
      }, 2000);
    } catch (err) {
      console.error("Error al crear boletín:", err);
      setError("No se pudo crear el boletín");
    } finally {
      setLoading(false);
    }
  };

  const handleFuenteSelect = (idFuente: number) => {
    if (fuentesSeleccionadas.includes(idFuente)) {
      setFuentesSeleccionadas(fuentesSeleccionadas.filter(id => id !== idFuente));
    } else {
      setFuentesSeleccionadas([...fuentesSeleccionadas, idFuente]);
    }
  };

  const getFuentesSeleccionadasInfo = () => {
    return fuentes.filter(fuente => fuentesSeleccionadas.includes(fuente.id_fuente));
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Creación de Boletín con IA</h1>

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Boletín creado exitosamente. Redirigiendo...
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full"
              placeholder="Título del boletín"
            />
          </div>

          <div>
            <Label htmlFor="promptIA">Instrucción para la IA</Label>
            <Textarea
              id="promptIA"
              value={promptIA}
              onChange={(e) => setPromptIA(e.target.value)}
              className="w-full min-h-[120px]"
              placeholder="Escribe un prompt detallado para que la IA genere el contenido del boletín. Ejemplo: 'Crea un boletín sobre técnicas modernas de cultivo hidropónico, incluyendo ventajas, desventajas y aplicaciones prácticas.'"
            />
          </div>

          <div>
            <Label htmlFor="fecha">Fecha de publicación</Label>
            <div className="flex gap-2 items-center">
              <Calendar className="h-5 w-5 text-gray-500" />
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <Label>Fuentes de información</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {getFuentesSeleccionadasInfo().map(fuente => (
                  <div
                    key={fuente.id_fuente}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md"
                  >
                    <span>{fuente.nombre}</span>
                    <button
                      type="button"
                      onClick={() => handleFuenteSelect(fuente.id_fuente)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalFuentesOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Seleccionar Fuentes
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="button"
              onClick={generateContent}
              disabled={generatingContent || !promptIA || fuentesSeleccionadas.length === 0}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {generatingContent ? "Generando contenido..." : "Generar contenido con IA"}
            </Button>
          </div>

          {generatedContent && (
            <div className="border rounded-md p-4 bg-gray-50">
              <Label className="mb-2 block">Vista previa del contenido generado:</Label>
              <div className="prose max-w-none">
                <div className="bg-white border rounded-md p-4 max-h-[300px] overflow-y-auto">
                  {generatedContent.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !generatedContent}
              className="bg-black text-white hover:bg-gray-800"
            >
              {loading ? "Guardando..." : "Guardar boletín"}
            </Button>
          </div>
        </form>

        {/* Modal para seleccionar fuentes */}
        {modalFuentesOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Selecciona las fuentes deseadas</h3>
                <button
                  onClick={() => setModalFuentesOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar fuentes..."
                  value={busquedaFuente}
                  onChange={(e) => setBusquedaFuente(e.target.value)}
                  className="w-full pl-10"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {fuentesFiltradas.length > 0 ? (
                  fuentesFiltradas.map(fuente => (
                    <div
                      key={fuente.id_fuente}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id={`fuente-${fuente.id_fuente}`}
                          checked={fuentesSeleccionadas.includes(fuente.id_fuente)}
                          onChange={() => handleFuenteSelect(fuente.id_fuente)}
                          className="h-5 w-5"
                        />
                        <label htmlFor={`fuente-${fuente.id_fuente}`} className="flex-1">
                          <div className="font-medium">{fuente.nombre}</div>
                          <div className="text-sm text-gray-500 truncate">{fuente.link}</div>
                        </label>
                      </div>
                      <div className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
                        {fuente.categoria}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No se encontraron fuentes que coincidan con la búsqueda
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setModalFuentesOpen(false)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminRouteGuard>
  );
}
