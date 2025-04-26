// components/ui/UserList.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users } from "lucide-react";
import { UserListItem } from "@/components/ui/UserListItem";
import { fetchUsuarios, Usuario } from "@/services/UserManagementService";

interface UserListProps {
  onCreateUser: () => void;
}

export function UserList({ onCreateUser }: UserListProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadUsuarios = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al cargar usuarios");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = usuarios.filter(
        user =>
          user.nombre.toLowerCase().includes(term) ||
          user.apellido.toLowerCase().includes(term) ||
          user.correo.toLowerCase().includes(term)
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);
    }
  }, [searchTerm, usuarios]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users size={24} />
          Usuarios
        </h2>
        <Button 
          onClick={onCreateUser}
          className="bg-black text-white hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus size={16} />
          Nuevo Usuario
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredUsuarios.length > 0 ? (
        <div className="space-y-2">
          {filteredUsuarios.map((usuario) => (
            <UserListItem
              key={usuario.id_usuario}
              usuario={usuario}
              onUpdate={loadUsuarios}
              onDelete={loadUsuarios}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No se encontraron usuarios
        </div>
      )}
    </div>
  );
}