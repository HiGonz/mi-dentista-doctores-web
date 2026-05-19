import Image from 'next/image'
import { cn, getInitials, getAvatarColor } from '@/lib/utils'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
}

const pixelSizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 96,
}

interface AvatarProps {
  nombre: string
  apellidos?: string | null
  foto?: string | null
  size?: AvatarSize
  className?: string
}

export function Avatar({ nombre, apellidos, foto, size = 'md', className }: AvatarProps) {
  const initials = getInitials(nombre, apellidos)
  const colorClass = getAvatarColor(nombre)
  const px = pixelSizes[size]

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
    >
      {foto ? (
        <Image
          src={foto}
          alt={`${nombre} ${apellidos ?? ''}`}
          width={px}
          height={px}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={cn('flex h-full w-full items-center justify-center rounded-full font-semibold text-white', colorClass)}>
          {initials}
        </div>
      )}
    </div>
  )
}
