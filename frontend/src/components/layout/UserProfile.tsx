// src/components/layout/UserProfile.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface UserData {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rango: string;
  foto?: string;
}

interface UserProfileProps {
  userData: UserData;
  onLogout: () => void;
}

function UserProfile({ userData, onLogout }: UserProfileProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Perfil de Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          {userData.foto ? (
            <img 
              src={userData.foto}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={40} className="text-gray-500" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1">
            <p className="font-semibold">Nombre:</p>
            <p className="col-span-2">{userData.nombre} {userData.apellido}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <p className="font-semibold">Correo:</p>
            <p className="col-span-2">{userData.correo}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <p className="font-semibold">Rango:</p>
            <p className="col-span-2">{userData.rango}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <p className="font-semibold">ID:</p>
            <p className="col-span-2">{userData.id_usuario}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onLogout}>
          <p className="text-white">Cerrar sesión</p>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserProfile