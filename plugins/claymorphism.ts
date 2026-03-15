import plugin from 'tailwindcss/plugin'
import { clayTokens } from '../lib/claymorph-styles'

export const claymorphismPlugin = plugin(
  function ({ addUtilities }) {
    // Generate clay card utilities
    const clayCardUtilities = {
      '.clay-card-sm': {
        borderRadius: clayTokens.radius.sm,
        boxShadow: clayTokens.shadows.sm.light,
        background: clayTokens.backgrounds.light.primary,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '.clay-card-md': {
        borderRadius: clayTokens.radius.md,
        boxShadow: clayTokens.shadows.md.light,
        background: clayTokens.backgrounds.light.primary,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '.clay-card-lg': {
        borderRadius: clayTokens.radius.lg,
        boxShadow: clayTokens.shadows.lg.light,
        background: clayTokens.backgrounds.light.primary,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '.clay-card-xl': {
        borderRadius: clayTokens.radius.xl,
        boxShadow: clayTokens.shadows.lg.light,
        background: clayTokens.backgrounds.light.primary,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }

    // Dark mode variants
    const clayCardDarkUtilities = {
      '.dark .clay-card-sm': {
        boxShadow: clayTokens.shadows.sm.dark,
        background: clayTokens.backgrounds.dark.primary,
      },
      '.dark .clay-card-md': {
        boxShadow: clayTokens.shadows.md.dark,
        background: clayTokens.backgrounds.dark.primary,
      },
      '.dark .clay-card-lg': {
        boxShadow: clayTokens.shadows.lg.dark,
        background: clayTokens.backgrounds.dark.primary,
      },
      '.dark .clay-card-xl': {
        boxShadow: clayTokens.shadows.lg.dark,
        background: clayTokens.backgrounds.dark.primary,
      },
    }

    // Button utilities
    const clayButtonUtilities = {
      '.clay-button': {
        borderRadius: clayTokens.radius.md,
        boxShadow: clayTokens.shadows.sm.light,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      },
      '.clay-button:hover': {
        transform: clayTokens.hover.transform,
        boxShadow: clayTokens.shadows.md.light,
      },
      '.clay-button:active': {
        transform: clayTokens.active.transform,
        boxShadow: clayTokens.shadows.sm.light,
      },
    }

    // Input utilities
    const clayInputUtilities = {
      '.clay-input': {
        borderRadius: clayTokens.radius.sm,
        boxShadow: `inset ${clayTokens.shadows.sm.light}`,
        background: 'rgba(255, 255, 255, 0.5)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '.clay-input:focus': {
        boxShadow: `inset ${clayTokens.shadows.md.light}, 0 0 0 4px rgba(139, 92, 246, 0.1)`,
        outline: 'none',
      },
      '.dark .clay-input': {
        boxShadow: `inset ${clayTokens.shadows.sm.dark}`,
        background: 'rgba(0, 0, 0, 0.3)',
      },
      '.dark .clay-input:focus': {
        boxShadow: `inset ${clayTokens.shadows.md.dark}, 0 0 0 4px rgba(139, 92, 246, 0.2)`,
      },
    }

    // Inset variant
    const clayInsetUtilities = {
      '.clay-inset-sm': {
        borderRadius: clayTokens.radius.sm,
        boxShadow: `
          inset 0 4px 8px rgba(0, 0, 0, 0.1),
          inset 0 8px 16px rgba(0, 0, 0, 0.05)
        `,
      },
      '.clay-inset-md': {
        borderRadius: clayTokens.radius.md,
        boxShadow: `
          inset 0 6px 12px rgba(0, 0, 0, 0.12),
          inset 0 12px 24px rgba(0, 0, 0, 0.08)
        `,
      },
      '.clay-inset-lg': {
        borderRadius: clayTokens.radius.lg,
        boxShadow: `
          inset 0 8px 16px rgba(0, 0, 0, 0.15),
          inset 0 16px 32px rgba(0, 0, 0, 0.1)
        `,
      },
    }

    // Hard variant (with border)
    const clayHardUtilities = {
      '.clay-hard-sm': {
        borderRadius: clayTokens.radius.sm,
        boxShadow: `
          0 0 0 2px rgba(0, 0, 0, 0.1),
          ${clayTokens.shadows.sm.light}
        `,
      },
      '.clay-hard-md': {
        borderRadius: clayTokens.radius.md,
        boxShadow: `
          0 0 0 2px rgba(0, 0, 0, 0.1),
          ${clayTokens.shadows.md.light}
        `,
      },
      '.clay-hard-lg': {
        borderRadius: clayTokens.radius.lg,
        boxShadow: `
          0 0 0 2px rgba(0, 0, 0, 0.1),
          ${clayTokens.shadows.lg.light}
        `,
      },
    }

    addUtilities({
      ...clayCardUtilities,
      ...clayCardDarkUtilities,
      ...clayButtonUtilities,
      ...clayInputUtilities,
      ...clayInsetUtilities,
      ...clayHardUtilities,
    })
  },
  {
    theme: {
      extend: {
        colors: {
          clay: {
            50: '#F5F7FA',
            100: '#EEF2F6',
            200: '#E5EAF0',
            300: '#CDD5DF',
            400: '#9AA5B5',
            500: '#6B7583',
            600: '#4A5361',
            700: '#2D3540',
            800: '#1A1F28',
            900: '#0F1419',
          },
        },
        boxShadow: {
          'clay-sm': clayTokens.shadows.sm.light,
          'clay-md': clayTokens.shadows.md.light,
          'clay-lg': clayTokens.shadows.lg.light,
          'clay-sm-dark': clayTokens.shadows.sm.dark,
          'clay-md-dark': clayTokens.shadows.md.dark,
          'clay-lg-dark': clayTokens.shadows.lg.dark,
        },
        borderRadius: {
          'clay-sm': clayTokens.radius.sm,
          'clay-md': clayTokens.radius.md,
          'clay-lg': clayTokens.radius.lg,
          'clay-xl': clayTokens.radius.xl,
        },
      },
    },
  }
)

export default claymorphismPlugin
