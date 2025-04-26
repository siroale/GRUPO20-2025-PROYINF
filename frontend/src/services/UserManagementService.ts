interface Usuario {
    id_usuario?: number;
    rango: number;
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    foto?: string;
  }
  
  const API_URL = "http://localhost:8000/api";
  
  export async function fetchUsuarios(): Promise<Usuario[]> {
    try {
      const response = await fetch(`${API_URL}/usuario/`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      throw new Error("No se pudieron cargar los usuarios");
    }
  }
  
  export async function createUsuario(userData: Usuario): Promise<Usuario> {
    try {
      const response = await fetch(`${API_URL}/registro/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Error al crear usuario:", err);
      throw new Error("No se pudo crear el usuario");
    }
  }
  
  export async function updateUsuario(id: number, userData: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await fetch(`${API_URL}/usuario/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error(`Error al actualizar usuario ${id}:`, err);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
  
  export async function deleteUsuario(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/usuario/${id}/`, {
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (err) {
      console.error(`Error al eliminar usuario ${id}:`, err);
      throw new Error("No se pudo eliminar el usuario");
    }
  }
  
  export function getCurrentUser(): Usuario | null {
    const usuarioActual = localStorage.getItem("user");
    if (usuarioActual) {
      try {
        return JSON.parse(usuarioActual);
      } catch (e) {
        console.error("Error al parsear datos de usuario:", e);
        return null;
      }
    }
    return null;
  }
  
  export function isAdmin(usuario: Usuario | null): boolean {
    return usuario?.rango === 1;
  }