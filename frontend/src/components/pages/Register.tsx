// src/components/pages/Register.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "@/components/layout/RegisterForm"

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Registro de Usuario</h1>
        <div className="bg-white p-8 rounded-lg shadow">
          <RegisterForm />
          <div className="mt-4 text-center">
            <p className="text-sm">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register