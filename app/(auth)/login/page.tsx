import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary flex-col justify-between p-12 text-white">
        <div>
          <h1 className="text-3xl font-display font-bold">MiDentista</h1>
          <p className="text-primary-light text-sm mt-1 font-semibold tracking-wide uppercase">
            Doctores
          </p>
        </div>
        <div>
          <h2 className="text-4xl font-display font-bold leading-tight">
            Bienvenido de vuelta, doctor
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Accede a tu agenda, pacientes y estadísticas en un solo lugar.
          </p>
        </div>
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} MiDentista. Todos los derechos reservados.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-neutral-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden text-center">
            <h1 className="text-2xl font-display font-bold text-primary">MiDentista Doctores</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-neutral-900">Iniciar sesión</h2>
            <p className="mt-1 text-neutral-500">Ingresa tus credenciales para continuar</p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-neutral-500">
            ¿Problemas para acceder?{' '}
            <a href="/forgot-password" className="text-primary font-medium hover:underline">
              Recuperar contraseña
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
