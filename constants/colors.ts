export const COLORS = {
  primary: {
    DEFAULT: '#1B6CA8',
    light: '#E8F4FD',
    dark: '#0D4F82',
    foreground: '#FFFFFF',
  },
  secondary: {
    DEFAULT: '#2ECC71',
    light: '#E8F8F0',
    dark: '#27ae60',
    foreground: '#FFFFFF',
  },
  accent: {
    DEFAULT: '#F39C12',
    light: '#FEF9EC',
    foreground: '#FFFFFF',
  },
  danger: {
    DEFAULT: '#E74C3C',
    light: '#FDEDEC',
    foreground: '#FFFFFF',
  },
} as const

export const STATUS_COLORS = {
  programada: { bg: 'bg-neutral-100', text: 'text-neutral-600', border: 'border-neutral-300' },
  en_consultorio: { bg: 'bg-primary-light', text: 'text-primary', border: 'border-primary' },
  completada: { bg: 'bg-secondary-light', text: 'text-secondary-dark', border: 'border-secondary' },
} as const
