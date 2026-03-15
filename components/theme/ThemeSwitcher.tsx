'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { ClayButton } from '@/components/ui/ClayButton'

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-12 h-12 rounded-full
        bg-gradient-to-br from-gray-100 to-gray-200
        dark:from-gray-800 dark:to-gray-700
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        flex items-center justify-center
        group
      "
      aria-label="Toggle theme"
      title={`Current theme: ${resolvedTheme}`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
      
      {/* Icon */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
        {resolvedTheme === 'dark' ? (
          <Moon className="w-6 h-6 text-purple-400" strokeWidth={2} />
        ) : (
          <Sun className="w-6 h-6 text-yellow-500" strokeWidth={2} />
        )}
      </div>

      {/* Pulsing indicator */}
      <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping opacity-0 group-hover:opacity-75" />
    </button>
  )
}

export function ThemeSwitcherDetailed() {
  const { theme, setTheme } = useTheme()

  const themes: Array<{ value: 'light' | 'dark' | 'system'; label: string; icon: typeof Sun }> = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
      {themes.map((t) => {
        const Icon = t.icon
        const isActive = theme === t.value

        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`
              px-4 py-2 rounded-full
              transition-all duration-300
              flex items-center gap-2
              ${
                isActive
                  ? 'bg-white dark:bg-gray-700 shadow-lg scale-105'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'
              }
            `}
            aria-label={`Switch to ${t.label} theme`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
