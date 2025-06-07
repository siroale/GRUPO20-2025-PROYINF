export interface Boletin {
  id_boletin: number;
  titulo: string;
  fecha: string; // fechas en formato ISO
  vistas: number;
  imagen?: string;
  ruta?: string;
  estado: number;
  cuerpo?: string;
  desde?: string;
  hasta?: string;
  instruccion?: string;
  autor: number;
}

const API_URL = "http://localhost:8000/api";

// Devuelve todos los boletines activos
export async function fetchBoletines(): Promise<Boletin[]> {
  try {
    const response = await fetch(`${API_URL}/boletin/`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const boletines = await response.json() as Boletin[];
    return boletines.filter(boletin => boletin.estado === 1);
  } catch (err) {
    console.error("Error al obtener boletines:", err);
    throw new Error("No se pudieron cargar los boletines");
  }
}

// Devuelve todos los boletines sin filtrar por estado
export async function fetchTodosBoletines(): Promise<Boletin[]> {
  try {
    const response = await fetch(`${API_URL}/boletin/`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json() as Boletin[];
  } catch (err) {
    console.error("Error al obtener todos los boletines:", err);
    throw new Error("No se pudieron cargar los boletines");
  }
}

// Obtiene un boletín específico por ID
export async function fetchBoletinById(id: number): Promise<Boletin> {
  try {
    const response = await fetch(`${API_URL}/boletin/${id}/`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json() as Boletin;
  } catch (err) {
    console.error(`Error al obtener boletín ${id}:`, err);
    throw new Error("No se pudo cargar el boletín");
  }
}

// Crea un nuevo boletín
export async function createBoletin(boletinData: Omit<Boletin, 'id_boletin'>): Promise<Boletin> {
  try {
    const response = await fetch(`${API_URL}/boletin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boletinData),
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error al crear boletín:", err);
    throw new Error("No se pudo crear el boletín");
  }
}

// Actualiza un boletín existente
export async function updateBoletin(id: number, boletinData: Partial<Boletin>): Promise<Boletin> {
  try {
    const response = await fetch(`${API_URL}/boletin/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boletinData),
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Error al actualizar boletín ${id}:`, err);
    throw new Error("No se pudo actualizar el boletín");
  }
}

// Elimina un boletín
export async function deleteBoletin(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/boletin/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (err) {
    console.error(`Error al eliminar boletín ${id}:`, err);
    throw new Error("No se pudo eliminar el boletín");
  }
}

// Incrementa las vistas de un boletín
export async function incrementarVistas(id: number): Promise<void> {
  try {
    const boletin = await fetchBoletinById(id);
    await updateBoletin(id, { vistas: boletin.vistas + 1 });
  } catch (err) {
    console.error(`Error al incrementar vistas del boletín ${id}:`, err);
    throw new Error("No se pudo actualizar las vistas del boletín");
  }
}

// Obtiene boletines por autor
export async function fetchBoletinesByAutor(autorId: number): Promise<Boletin[]> {
  try {
    const boletines = await fetchTodosBoletines();
    return boletines.filter(boletin => boletin.autor === autorId);
  } catch (err) {
    console.error(`Error al obtener boletines del autor ${autorId}:`, err);
    throw new Error("No se pudieron cargar los boletines del autor");
  }
}

// Obtiene boletines vigentes (dentro del rango de fechas desde/hasta)
export async function fetchBoletinesVigentes(): Promise<Boletin[]> {
  try {
    const boletines = await fetchBoletines();
    const fechaActual = new Date();
    
    return boletines.filter(boletin => {
      if (!boletin.desde && !boletin.hasta) return true;
      
      const fechaDesde = boletin.desde ? new Date(boletin.desde) : null;
      const fechaHasta = boletin.hasta ? new Date(boletin.hasta) : null;
      
      if (fechaDesde && fechaActual < fechaDesde) return false;
      if (fechaHasta && fechaActual > fechaHasta) return false;
      
      return true;
    });
  } catch (err) {
    console.error("Error al obtener boletines vigentes:", err);
    throw new Error("No se pudieron cargar los boletines vigentes");
  }
}

// Busca boletines por título
export async function searchBoletinesByTitulo(titulo: string): Promise<Boletin[]> {
  try {
    const boletines = await fetchBoletines();
    return boletines.filter(boletin => 
      boletin.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  } catch (err) {
    console.error("Error al buscar boletines:", err);
    throw new Error("No se pudo realizar la búsqueda");
  }
}

// Obtiene los boletines más vistos
export async function fetchBoletinesMasVistos(limite: number = 10): Promise<Boletin[]> {
  try {
    const boletines = await fetchBoletines();
    return boletines
      .sort((a, b) => b.vistas - a.vistas)
      .slice(0, limite);
  } catch (err) {
    console.error("Error al obtener boletines más vistos:", err);
    throw new Error("No se pudieron cargar los boletines más vistos");
  }
}

// Obtiene boletines recientes
export async function fetchBoletinesRecientes(limite: number = 10): Promise<Boletin[]> {
  try {
    const boletines = await fetchBoletines();
    return boletines
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, limite);
  } catch (err) {
    console.error("Error al obtener boletines recientes:", err);
    throw new Error("No se pudieron cargar los boletines recientes");
  }
}