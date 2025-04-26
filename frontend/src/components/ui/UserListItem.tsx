// components/ui/UserListItem.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Save, Edit, X } from "lucide-react";
import { updateUsuario, deleteUsuario } from "@/services/UserManagementService";

interface Usuario {
  id_usuario: number;
  rango: number;
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  foto?: string;
}

interface UserListItemProps {
  usuario: Usuario;
  onUpdate: () => void;
  onDelete: () => void;
}

export function UserListItem({ usuario, onUpdate, onDelete }: UserListItemProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    rango: usuario.rango,
  });

  const getRangoText = (rango: number) => {
    switch (rango) {
      case 1: return "Administrador";
      case 2: return "Editor";
      case 3: return "Usuario";
      default: return "Desconocido";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "rango" ? parseInt(value) : value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await updateUsuario(usuario.id_usuario, userData);
      setEditing(false);
      onUpdate();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al actualizar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
      setLoading(true);
      setError(null);
      
      try {
        await deleteUsuario(usuario.id_usuario);
        onDelete();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al eliminar usuario");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-800 p-2 rounded-md border border-red-200 mb-3 text-sm">
          {error}
        </div>
      )}
      
      {editing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-6">Nombre</label>
              <Input
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Apellido</label>
              <Input
                name="apellido"
                value={userData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Correo</label>
            <Input
              name="correo"
              value={userData.correo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 mb-6">Rol</label>
            <select
              name="rango"
              value={userData.rango}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Editor</option>
              <option value={3}>Usuario</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(false)}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
            >
              <Save size={16} />
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">
                {usuario.nombre} {usuario.apellido}
              </h3>
              <p className="text-gray-600">{usuario.correo}</p>
              <p className="mt-1">
                <span className={`text-sm px-2 py-1 rounded-full ${
                  usuario.rango === 1 ? 'bg-purple-100 text-purple-800' : 
                  usuario.rango === 2 ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getRangoText(usuario.rango)}
                </span>
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(true)}
                className="h-9 w-9 p-0 flex items-center justify-center"
              >
                <Edit size={16} />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={loading}
                className="h-9 w-9 p-0 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}