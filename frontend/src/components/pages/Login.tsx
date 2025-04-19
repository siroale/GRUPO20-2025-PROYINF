// src/components/pages/Login.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "@/components/layout/LoginForm"

const Login = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = (data: any) => {
    // Guardar token y datos de usuario en localStorage
    localStorage.setItem("token", data.access)
    localStorage.setItem("user", JSON.stringify(data.usuario))
    // Redirigir al perfil
    navigate("/profile")
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        <div className="bg-white p-8 rounded-lg shadow">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <div className="mt-4 text-center">
            <p className="text-sm">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login