// src/components/layout/LoginForm.tsx
import { useState, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: (data: any) => void;
}

interface FormData {
  correo: string;
  contrasena: string;
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState<FormData>({
    correo: "",
    contrasena: ""
  })
  const [error, setError] = useState<string>("")
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
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:8000/api/login/", formData)
      onLoginSuccess(response.data)
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err)
      if (err.response) {
        if (err.response.status === 404) {
          setError("Usuario no encontrado")
        } else if (err.response.status === 401) {
          setError("Credenciales inválidas")
        } else {
          setError("Error al iniciar sesión")
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </>
        ) : (
          "Iniciar sesión"
        )}
      </Button>
    </form>
  )
}

export default LoginForm