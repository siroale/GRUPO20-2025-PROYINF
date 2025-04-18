const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchBoletines() {
  const res = await fetch(`${API_URL}/api/boletines/`);
  return await res.json();
}
