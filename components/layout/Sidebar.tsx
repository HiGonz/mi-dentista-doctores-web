'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, User, LogOut, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { Avatar } from '@/components/ui/Avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/pacientes', label: 'Pacientes', icon: Users },
  { href: '/perfil', label: 'Perfil', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [logoutOpen, setLogoutOpen] = useState(false)

  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-900">MiDentista</p>
          <p className="text-xs text-neutral-500">Doctores</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-neutral-400')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-neutral-200 p-4">
        {user && (
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar nombre={user.nombre} apellidos={user.apellidos} foto={user.foto} size="sm" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-neutral-900">
                Dr. {user.apellidos ?? user.nombre}
              </p>
              <p className="truncate text-xs text-neutral-500">{user.especialidad ?? 'Dentista'}</p>
            </div>
            <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
              <DialogTrigger asChild>
                <button className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cerrar sesión</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro que deseas cerrar sesión? Deberás iniciar sesión nuevamente.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setLogoutOpen(false)}>Cancelar</Button>
                  <Button variant="destructive" onClick={() => { logout(); setLogoutOpen(false) }}>
                    Cerrar sesión
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </aside>
  )
}
