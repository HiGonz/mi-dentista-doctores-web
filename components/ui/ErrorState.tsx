import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Algo salió mal',
  description = 'Ocurrió un error al cargar la información. Por favor intenta de nuevo.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-light">
        <AlertCircle className="h-8 w-8 text-danger" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-neutral-800">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-neutral-500">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} size="sm">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      )}
    </div>
  )
}
