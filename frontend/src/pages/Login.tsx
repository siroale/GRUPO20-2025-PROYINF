import LoginForm from "@/components/LoginForm"

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        <div className="bg-white p-8 rounded-lg shadow">
          <LoginForm />
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
