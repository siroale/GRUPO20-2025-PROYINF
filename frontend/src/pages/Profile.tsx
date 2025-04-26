import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserProfile from "@/components/user/UserProfile"

interface UserData {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rango: string;
  foto?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Obtener datos del usuario desde localStorage al cargar la página
    const userDataStr = localStorage.getItem("user")
    if (userDataStr) {
      try {
        const user = JSON.parse(userDataStr)
        setUserData(user)
      } catch (error) {
        console.error("Error parsing user data:", error)
        navigate("/login")
      }
    } else {
      // Si no hay datos de usuario, redirigir al login
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // Redirigir al login
    navigate("/login")
  }

  if (!userData) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Mi Perfil</h1>
        <UserProfile userData={userData} onLogout={handleLogout} />
      </div>
    </div>
  )
}

export default Profile
