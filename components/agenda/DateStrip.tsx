'use client'

import { cn } from '@/lib/utils'
import { format, addDays, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DateStripProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DateStrip({ selectedDate, onDateChange }: DateStripProps) {
  const today = new Date()
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i - 3))

  const scroll = (direction: 'left' | 'right') => {
    const offset = direction === 'left' ? -1 : 1
    onDateChange(addDays(selectedDate, offset))
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => scroll('left')} aria-label="Día anterior">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 gap-1 overflow-x-auto scrollbar-hide pb-1">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate)
          const isToday = isSameDay(day, today)
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateChange(day)}
              className={cn(
                'flex min-w-[52px] flex-col items-center rounded-lg px-2 py-2 text-center transition-colors',
                isSelected
                  ? 'bg-primary text-white'
                  : isToday
                  ? 'border border-primary text-primary hover:bg-primary-light'
                  : 'hover:bg-neutral-100 text-neutral-600'
              )}
            >
              <span className="text-xs font-medium capitalize">
                {format(day, 'EEE', { locale: es }).slice(0, 3)}
              </span>
              <span className="text-lg font-bold leading-tight">{format(day, 'd')}</span>
            </button>
          )
        })}
      </div>

      <Button variant="ghost" size="icon" onClick={() => scroll('right')} aria-label="Día siguiente">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
