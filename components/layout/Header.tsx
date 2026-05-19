'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app.store'
import { useAuthStore } from '@/store/auth.store'
import { Avatar } from '@/components/ui/Avatar'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { capitalizeFirst } from '@/lib/utils'

export function Header() {
  const { toggleSidebar } = useAppStore()
  const { user } = useAuthStore()
  const today = capitalizeFirst(format(new Date(), "EEEE, d 'de' MMMM", { locale: es }))

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden sm:block">
          <p className="text-sm text-neutral-500">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Buscar">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </Button>
        {user && (
          <Avatar nombre={user.nombre} apellidos={user.apellidos} foto={user.foto} size="sm" className="ml-2" />
        )}
      </div>
    </header>
  )
}
