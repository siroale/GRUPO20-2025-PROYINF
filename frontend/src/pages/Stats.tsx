import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface FaostatRecord {
  year: number;
  value: number;
  element: string;
  area: string;
  item: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

export default function FaostatDashboard() {
  const [data, setData] = useState<FaostatRecord[]>([]);
  const [filtered, setFiltered] = useState<FaostatRecord[]>([]);
  const [category, setCategory] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sistema de notificaciones personalizado
  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // notificaciones
  const notifyNewData = () => showToast('Nueva información disponible', 'info');

  // 1. Recopilación: fetch de la API Django que envuelve faostat
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/faostat?country=Chile`);
      const json = await res.json();
      setData(json);
      notifyNewData();
    } catch (err) {
      console.error(err);
      showToast('Error al cargar datos', 'error');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000 * 60 * 60); // cada hora
    return () => clearInterval(interval);
  }, []);

  // 2. Filtrado y clasificación
  useEffect(() => {
    let temp = data;
    if (category) temp = temp.filter(d => d.element === category);
    if (year) temp = temp.filter(d => d.year === +year);
    setFiltered(temp);
  }, [data, category, year]);

  // 3. Importación de datos externos (CSV/JSON)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };
  
  const handleFileUpload = () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    fetch('/api/import-data', { method: 'POST', body: form })
      .then(() => showToast('Datos importados correctamente', 'success'))
      .catch(() => showToast('Error al importar', 'error'));
  };

  const getToastStyles = (type: string) => {
    const baseStyles = "fixed right-4 p-4 rounded-lg shadow-lg text-white font-medium z-50 transition-all duration-300";
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500`;
      case 'error':
        return `${baseStyles} bg-red-500`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500`;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Sistema de Toast personalizado */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={getToastStyles(toast.type)}
            style={{ top: `${16 + index * 60}px` }}
          >
            <div className="flex items-center justify-between">
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Panel FAOSTAT - Chile</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros */}
          <div className="flex space-x-2">
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Todos los elementos</option>
              <option value="5510">Producción</option>
              <option value="4710">Área cosechada</option>
              {/* ...más */}
            </select>
            <Input
              type="number"
              placeholder="Año"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
            <Button onClick={() => {setCategory(''); setYear('');}}>Limpiar filtros</Button>
          </div>

          {/* Tabla de datos filtrados */}
          <div className="overflow-auto max-h-96">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Año</th>
                  <th className="text-left p-2">Valor</th>
                  <th className="text-left p-2">Elemento</th>
                  <th className="text-left p-2">Área</th>
                  <th className="text-left p-2">Producto</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, idx) => (
                  <tr key={idx} className="odd:bg-gray-50 border-b">
                    <td className="p-2">{d.year}</td>
                    <td className="p-2">{d.value}</td>
                    <td className="p-2">{d.element}</td>
                    <td className="p-2">{d.area}</td>
                    <td className="p-2">{d.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Importación de datos */}
          <div className="flex items-center space-x-2">
            <Input type="file" accept=".csv,.json,.xlsx" onChange={handleFileChange} />
            <Button onClick={handleFileUpload}>Importar Datos</Button>
          </div>

          {/* Botón de prueba para mostrar las notificaciones */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Prueba el sistema de notificaciones:</p>
            <div className="flex space-x-2">
              <Button onClick={() => showToast('Información de prueba', 'info')} variant="outline">
                Info
              </Button>
              <Button onClick={() => showToast('Operación exitosa', 'success')} variant="outline">
                Éxito
              </Button>
              <Button onClick={() => showToast('Error de prueba', 'error')} variant="outline">
                Error
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}