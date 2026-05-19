'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/store/auth.store'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Stethoscope, LogOut } from 'lucide-react'

export default function PerfilPage() {
  const { user } = useAuthStore()
  const { logout: handleLogout } = useAuth()
  const [showLogout, setShowLogout] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const onLogout = async () => {
    setIsLoggingOut(true)
    await handleLogout()
    setIsLoggingOut(false)
    setShowLogout(false)
  }

  if (!user) return null

  return (
    <>
      <div className="space-y-6">
        <PageHeader title="Perfil" description="Tu información como doctor" />

        {/* Profile header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
              <Avatar nombre={user.nombre} apellidos={user.apellidos} foto={user.foto} size="xl" />
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-neutral-900">
                  Dr. {user.nombre} {user.apellidos}
                </h2>
                <p className="text-neutral-500 mt-0.5">{user.especialidad}</p>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="default">Activo</Badge>
                  {user.cedulaProfesional && (
                    <Badge variant="secondary">Cédula: {user.cedulaProfesional}</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowLogout(true)} className="text-danger border-danger hover:bg-danger/10">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Información de contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Correo</span>
                <span className="font-medium text-neutral-800">{user.email}</span>
              </div>
              {user.telefono && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Teléfono</span>
                  <span className="font-medium text-neutral-800">{user.telefono}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary" />
                Información profesional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Especialidad</span>
                <span className="font-medium text-neutral-800">{user.especialidad}</span>
              </div>
              {user.cedulaProfesional && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Cédula profesional</span>
                  <span className="font-medium text-neutral-800">{user.cedulaProfesional}</span>
                </div>
              )}
              {user.universidad && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Universidad</span>
                  <span className="font-medium text-neutral-800">{user.universidad}</span>
                </div>
              )}
              {user.anoEgreso && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Año de egreso</span>
                  <span className="font-medium text-neutral-800">{user.anoEgreso}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout dialog */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cerrar sesión?</DialogTitle>
            <DialogDescription>
              Se cerrará tu sesión y serás redirigido a la pantalla de inicio.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogout(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={onLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
