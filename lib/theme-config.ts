/**
 * Dark Mode Theme Configuration
 * 
 * CSS custom properties for theme switching
 * Works with next-themes
 */

export const themeConfig = {
  // Color tokens
  colors: {
    light: {
      // Backgrounds
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#F5F7FA',
      'bg-tertiary': '#E5E9F0',
      
      // Text
      'text-primary': '#0A0A0A',
      'text-secondary': '#4A5568',
      'text-tertiary': '#718096',
      
      // Borders
      'border-primary': 'rgba(0, 0, 0, 0.1)',
      'border-secondary': 'rgba(0, 0, 0, 0.05)',
      
      // Accents
      'accent-blue': '#0066FF',
      'accent-cyan': '#00F0FF',
      
      // Claymorphism
      'clay-bg': 'rgba(255, 255, 255, 0.95)',
      'clay-border': 'rgba(0, 0, 0, 0.08)',
      'clay-highlight': 'rgba(255, 255, 255, 0.2)',
      'clay-shadow': 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      // Backgrounds
      'bg-primary': '#0A0A0A',
      'bg-secondary': '#141419',
      'bg-tertiary': '#1E1E23',
      
      // Text
      'text-primary': '#FFFFFF',
      'text-secondary': '#A0AEC0',
      'text-tertiary': '#718096',
      
      // Borders
      'border-primary': 'rgba(255, 255, 255, 0.1)',
      'border-secondary': 'rgba(255, 255, 255, 0.05)',
      
      // Accents
      'accent-blue': '#0066FF',
      'accent-cyan': '#00F0FF',
      
      // Claymorphism
      'clay-bg': 'rgba(20, 20, 25, 0.95)',
      'clay-border': 'rgba(255, 255, 255, 0.08)',
      'clay-highlight': 'rgba(255, 255, 255, 0.1)',
      'clay-shadow': 'rgba(0, 0, 0, 0.5)',
    },
  },

  // Transition config
  transitions: {
    theme: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: [
        'background-color',
        'border-color',
        'color',
        'fill',
        'stroke',
        'box-shadow',
      ],
    },
  },

  // Animation keyframes
  animations: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
  },
}

/**
 * Generate CSS custom properties for theme
 */
export function generateThemeVars(theme: 'light' | 'dark') {
  const colors = themeConfig.colors[theme]
  const vars: Record<string, string> = {}

  Object.entries(colors).forEach(([key, value]) => {
    vars[`--color-${key}`] = value
  })

  return vars
}

/**
 * CSS class for theme transition
 */
export const themeTransitionClass = `
  transition-colors
  duration-200
  ease-in-out
`

/**
 * Tailwind config extension
 */
export const tailwindThemeExtension = {
  colors: {
    'bg-primary': 'var(--color-bg-primary)',
    'bg-secondary': 'var(--color-bg-secondary)',
    'bg-tertiary': 'var(--color-bg-tertiary)',
    'text-primary': 'var(--color-text-primary)',
    'text-secondary': 'var(--color-text-secondary)',
    'text-tertiary': 'var(--color-text-tertiary)',
    'border-primary': 'var(--color-border-primary)',
    'border-secondary': 'var(--color-border-secondary)',
    'accent-blue': 'var(--color-accent-blue)',
    'accent-cyan': 'var(--color-accent-cyan)',
    'clay-bg': 'var(--color-clay-bg)',
    'clay-border': 'var(--color-clay-border)',
    'clay-highlight': 'var(--color-clay-highlight)',
    'clay-shadow': 'var(--color-clay-shadow)',
  },
}
