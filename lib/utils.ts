import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

export function formatDate(dateString: string, formatStr = 'dd MMM yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr, { locale: es })
  } catch {
    return dateString
  }
}

export function formatTime(timeString: string): string {
  try {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10))
    return format(date, 'hh:mm a')
  } catch {
    return timeString
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    if (isToday(date)) return 'Hoy'
    if (isTomorrow(date)) return 'Mañana'
    if (isYesterday(date)) return 'Ayer'
    return formatDistanceToNow(date, { locale: es, addSuffix: true })
  } catch {
    return dateString
  }
}

export function formatFullDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  } catch {
    return dateString
  }
}

export function getInitials(nombre: string, apellidos?: string | null): string {
  const first = nombre.charAt(0).toUpperCase()
  const last = apellidos ? apellidos.charAt(0).toUpperCase() : nombre.charAt(1)?.toUpperCase() ?? ''
  return `${first}${last}`
}

export function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

export function capitalizeFirst(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}
