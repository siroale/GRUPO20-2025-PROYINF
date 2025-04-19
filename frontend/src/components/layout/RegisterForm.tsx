// src/components/layout/RegisterForm.tsx
import { useState, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  confirmar_contrasena: string;
}

function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmar_contrasena: "",
  })
  
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validar contraseñas
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setError("Las contraseñas no coinciden")
      return
    }
    
    setLoading(true)
    setError("")
    
    // Datos a enviar (sin incluir confirmar_contrasena)
    const submitData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      contrasena: formData.contrasena,
      rango: 2 // Por defecto
    }
    
    try {
      await axios.post("http://localhost:8000/api/registro/", submitData)
      setSuccess(true)
      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        confirmar_contrasena: "",
      })
    } catch (err: any) {
      console.error("Error al registrar:", err)
      if (err.response && err.response.data) {
        if (typeof err.response.data === "object") {
          const errorMessages = Object.values(err.response.data).flat()
          setError(errorMessages.join(", "))
        } else {
          setError("Error en el registro")
        }
      } else {
        setError("Error de conexión")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {error && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="bg-green-50">
          <AlertDescription className="text-green-700">
            ¡Usuario registrado exitosamente! Ya puede iniciar sesión.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo">Correo electrónico</Label>
        <Input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contrasena">Contraseña</Label>
        <Input
          id="contrasena"
          name="contrasena"
          type="password"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmar_contrasena">Confirmar contraseña</Label>
        <Input
          id="confirmar_contrasena"
          name="confirmar_contrasena"
          type="password"
          value={formData.confirmar_contrasena}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </>
        ) : (
          "Registrarse"
        )}
      </Button>
    </form>
  )
}

export default RegisterForm