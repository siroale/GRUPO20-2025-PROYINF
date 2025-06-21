import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
// Removidas las importaciones de Dialog
import { FileText, Save, Eye, Upload, Trash2, Download, Edit, X } from 'lucide-react';

// Importar las funciones reales del servicio
import {
  fetchBoletinById,
  updateBoletin,
  Boletin
} from '../services/BoletinManagementService';

interface BoletinEditorProps {
  isOpen: boolean;
  onClose: () => void;
  boletinId?: number;
  onSave?: (boletin: Boletin) => void;
}

// Función para descargar PDF
const downloadPDF = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Función para convertir PDF a Word (mock - necesitarás implementar esto en el backend)
const convertPDFToWord = async (pdfUrl: string, filename: string) => {
  try {
    // Aquí deberías hacer una llamada a tu API para convertir PDF a Word
    // Por ahora, simulamos la descarga
    const response = await fetch('/api/convert-pdf-to-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdfUrl, filename })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename.replace('.pdf', '.docx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error al convertir PDF a Word:', error);
    alert('Error al convertir el archivo. Por favor, intenta de nuevo.');
  }
};

const BoletinEditor: React.FC<BoletinEditorProps> = ({
  isOpen,
  onClose,
  boletinId,
  onSave
}) => {
  const [boletin, setBoletin] = useState<Boletin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && boletinId) {
      loadBoletin(boletinId);
    } else if (!isOpen) { // Limpiar estado cuando se cierra
      setBoletin(null);
      setError(null);
      setSuccess(null);
      setPdfUrl('');
    }
  }, [isOpen, boletinId]);

  const loadBoletin = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBoletinById(id);
      setBoletin(data);
      setPdfUrl(data.ruta || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el boletín');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Boletin, value: any) => {
    if (!boletin) return;
    setBoletin({ ...boletin, [field]: value });
  };

  const handleSave = async () => {
    if (!boletin) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedBoletin = await updateBoletin(boletin.id_boletin, boletin);
      setSuccess('Boletín actualizado correctamente');
      if (onSave) {
        onSave(updatedBoletin);
      }
      // No cerrar el editor automáticamente aquí, el padre lo manejará
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el boletín');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (type: 'imagen' | 'ruta') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'imagen' ? 'image/*' : '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (type === 'ruta' && file.type !== 'application/pdf') {
          setError('Solo se permiten archivos PDF');
          return;
        }

        // Aquí implementarías la subida real del archivo
        // Por ahora, creamos una URL temporal para mostrar el archivo
        const mockUrl = URL.createObjectURL(file);
        handleInputChange(type, mockUrl);
        if (type === 'ruta') {
          setPdfUrl(mockUrl);
        }
      }
    };
    input.click();
  };

  const handleDownloadPDF = () => {
    if (pdfUrl && boletin) {
      downloadPDF(pdfUrl, `${boletin.titulo}.pdf`);
    }
  };

  const handleEditPDF = async () => {
    if (pdfUrl && boletin) {
      await convertPDFToWord(pdfUrl, `${boletin.titulo}.pdf`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full p-6"> {/* Contenedor principal sin ser Dialog */}
      {/* Header flexible que se adapta al espacio */}
      <div className="bg-white border-b border-gray-200 pb-4 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900">Editor de Boletín {boletinId ? `#${boletinId}` : ''}</span>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button onClick={onClose} variant="outline" size="icon"> {/* Usa onClose directamente */}
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Alertas */}
        {error && (
          <Alert className="border-red-200 bg-red-50 mt-4">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 mt-4">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Contenedor scrolleable principal */}
      <div className="overflow-y-auto max-h-[calc(90vh-100px)]"> {/* Ajusta la altura máxima para que sea scrolleable */}
        {loading && !boletin ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Cargando boletín...</div>
          </div>
        ) : boletin ? (
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            {/* Panel de Edición - Ocupa 2 columnas en pantallas muy grandes */}
            <div className="2xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="titulo">Título</Label>
                      <Input
                        id="titulo"
                        value={boletin.titulo}
                        onChange={(e) => handleInputChange('titulo', e.target.value)}
                        placeholder="Título del boletín"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fecha">Fecha</Label>
                      <Input
                        id="fecha"
                        type="date"
                        value={boletin.fecha}
                        onChange={(e) => handleInputChange('fecha', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="desde">Vigente desde</Label>
                      <Input
                        id="desde"
                        type="date"
                        value={boletin.desde || ''}
                        onChange={(e) => handleInputChange('desde', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hasta">Vigente hasta</Label>
                      <Input
                        id="hasta"
                        type="date"
                        value={boletin.hasta || ''}
                        onChange={(e) => handleInputChange('hasta', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={boletin.estado.toString()} onValueChange={(value) => handleInputChange('estado', parseInt(value))}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Inactivo</SelectItem>
                          <SelectItem value="1">Activo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vistas">Vistas</Label>
                      <Input
                        id="vistas"
                        type="number"
                        value={boletin.vistas}
                        onChange={(e) => handleInputChange('vistas', parseInt(e.target.value))}
                        readOnly
                        className="bg-gray-50 w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="autor">Autor (ID)</Label>
                      <Input
                        id="autor"
                        type="number"
                        value={boletin.autor}
                        onChange={(e) => handleInputChange('autor', parseInt(e.target.value))}
                        placeholder="ID del autor"
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contenido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cuerpo">Cuerpo del boletín</Label>
                    <Textarea
                      id="cuerpo"
                      value={boletin.cuerpo || ''}
                      onChange={(e) => handleInputChange('cuerpo', e.target.value)}
                      placeholder="Contenido del boletín..."
                      rows={10}
                      className="w-full resize-vertical"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instruccion">Instrucciones especiales</Label>
                    <Textarea
                      id="instruccion"
                      value={boletin.instruccion || ''}
                      onChange={(e) => handleInputChange('instruccion', e.target.value)}
                      placeholder="Instrucciones adicionales..."
                      rows={6}
                      className="w-full resize-vertical"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Archivos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Imagen de portada</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={boletin.imagen || ''}
                        onChange={(e) => handleInputChange('imagen', e.target.value)}
                        placeholder="URL de la imagen"
                        className="flex-1"
                      />
                      <Button onClick={() => handleFileUpload('imagen')} variant="outline">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    {boletin.imagen && (
                      <div className="mt-3">
                        <img src={boletin.imagen} alt="Vista previa" className="max-w-64 h-40 object-cover rounded border" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Archivo PDF</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={boletin.ruta || ''}
                        onChange={(e) => {
                          handleInputChange('ruta', e.target.value);
                          setPdfUrl(e.target.value);
                        }}
                        placeholder="URL del PDF"
                        className="flex-1"
                      />
                      <Button onClick={() => handleFileUpload('ruta')} variant="outline">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>

                    {pdfUrl && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </Button>
                        <Button onClick={handleEditPDF} variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel de Visualización - Ahora más grande */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Vista Previa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold text-lg mb-2 break-words">{boletin.titulo}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Fecha: {boletin.fecha}</p>
                        <p>Vistas: {boletin.vistas.toLocaleString()}</p>
                        <p>Estado: <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${boletin.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {boletin.estado === 1 ? 'Activo' : 'Inactivo'}
                        </span></p>
                        <p>Autor: {boletin.autor}</p>
                        {boletin.desde && <p>Vigente desde: {boletin.desde}</p>}
                        {boletin.hasta && <p>Vigente hasta: {boletin.hasta}</p>}
                      </div>
                    </div>

                    {boletin.imagen && (
                      <div>
                        <p className="text-sm font-medium mb-2">Imagen de portada:</p>
                        <img src={boletin.imagen} alt="Portada" className="w-full h-40 object-cover rounded border" />
                      </div>
                    )}

                    {boletin.cuerpo && (
                      <div>
                        <p className="text-sm font-medium mb-2">Contenido:</p>
                        <div className="text-sm p-3 bg-white border rounded max-h-40 overflow-y-auto">
                          {boletin.cuerpo}
                        </div>
                      </div>
                    )}

                    {boletin.instruccion && (
                      <div>
                        <p className="text-sm font-medium mb-2">Instrucciones:</p>
                        <div className="text-sm p-3 bg-white border rounded max-h-32 overflow-y-auto">
                          {boletin.instruccion}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Visualizador de PDF - Ahora mucho más grande */}
              <Card>
                <CardHeader>
                  <CardTitle>Visualización PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  {pdfUrl ? (
                    <div className="space-y-2">
                      <iframe
                        src={pdfUrl}
                        className="w-full h-[600px] border rounded"
                        title="Vista previa del PDF"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => window.open(pdfUrl, '_blank')}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Abrir en nueva pestaña
                        </Button>
                        <Button
                          onClick={() => {
                            handleInputChange('ruta', '');
                            setPdfUrl('');
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded">
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No hay PDF seleccionado</p>
                        <Button
                          onClick={() => handleFileUpload('ruta')}
                          variant="outline"
                          className="mt-2"
                        >
                          Subir PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BoletinEditor;