/**
 * Claymorphism Design Tokens
 * 
 * Multi-layer shadow system for clay aesthetic
 * Inspired by Neubrutalism + Glassmorphism
 */

export const clayTokens = {
  // Shadow layers for depth
  shadows: {
    sm: {
      light: `
        0 2px 4px rgba(0, 0, 0, 0.05),
        0 4px 8px rgba(0, 0, 0, 0.03),
        inset 0 -1px 2px rgba(255, 255, 255, 0.1)
      `,
      dark: `
        0 2px 4px rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(0, 0, 0, 0.2),
        inset 0 -1px 2px rgba(255, 255, 255, 0.05)
      `,
    },
    md: {
      light: `
        0 4px 8px rgba(0, 0, 0, 0.08),
        0 8px 16px rgba(0, 0, 0, 0.05),
        0 16px 32px rgba(0, 0, 0, 0.03),
        inset 0 -2px 4px rgba(255, 255, 255, 0.15),
        inset 0 2px 4px rgba(0, 0, 0, 0.05)
      `,
      dark: `
        0 4px 8px rgba(0, 0, 0, 0.4),
        0 8px 16px rgba(0, 0, 0, 0.3),
        0 16px 32px rgba(0, 0, 0, 0.2),
        inset 0 -2px 4px rgba(255, 255, 255, 0.08),
        inset 0 2px 4px rgba(0, 0, 0, 0.1)
      `,
    },
    lg: {
      light: `
        0 8px 16px rgba(0, 0, 0, 0.1),
        0 16px 32px rgba(0, 0, 0, 0.08),
        0 24px 48px rgba(0, 0, 0, 0.05),
        inset 0 -3px 6px rgba(255, 255, 255, 0.2),
        inset 0 3px 6px rgba(0, 0, 0, 0.08)
      `,
      dark: `
        0 8px 16px rgba(0, 0, 0, 0.5),
        0 16px 32px rgba(0, 0, 0, 0.4),
        0 24px 48px rgba(0, 0, 0, 0.3),
        inset 0 -3px 6px rgba(255, 255, 255, 0.1),
        inset 0 3px 6px rgba(0, 0, 0, 0.15)
      `,
    },
  },

  // Border radius for soft clay feel
  radius: {
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
  },

  // Background colors with slight gradient
  backgrounds: {
    light: {
      primary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%)',
      secondary: 'linear-gradient(135deg, rgba(240, 242, 245, 0.95) 0%, rgba(230, 235, 240, 0.95) 100%)',
      accent: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 240, 255, 0.1) 100%)',
    },
    dark: {
      primary: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(15, 15, 20, 0.95) 100%)',
      secondary: 'linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(25, 25, 30, 0.95) 100%)',
      accent: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 240, 255, 0.2) 100%)',
    },
  },

  // Hover states
  hover: {
    transform: 'translateY(-4px)',
    shadowMultiplier: 1.3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Active/pressed states
  active: {
    transform: 'translateY(2px) scale(0.98)',
    shadowMultiplier: 0.6,
    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

/**
 * Utility function to generate clay card styles
 */
export function getClayStyles(
  size: 'sm' | 'md' | 'lg' = 'md',
  theme: 'light' | 'dark' = 'light'
) {
  return {
    borderRadius: clayTokens.radius[size],
    boxShadow: clayTokens.shadows[size][theme],
    background: clayTokens.backgrounds[theme].primary,
    transition: clayTokens.hover.transition,
  }
}

/**
 * Utility function for hover states
 */
export function getClayHoverStyles() {
  return {
    transform: clayTokens.hover.transform,
    transition: clayTokens.hover.transition,
  }
}

/**
 * Utility function for active/pressed states
 */
export function getClayActiveStyles() {
  return {
    transform: clayTokens.active.transform,
    transition: clayTokens.active.transition,
  }
}

/**
 * CSS-in-JS class generator for Tailwind
 */
export const clayClasses = {
  card: {
    sm: 'rounded-[12px] transition-all duration-300 ease-in-out',
    md: 'rounded-[20px] transition-all duration-300 ease-in-out',
    lg: 'rounded-[32px] transition-all duration-300 ease-in-out',
    xl: 'rounded-[48px] transition-all duration-300 ease-in-out',
  },
  hover: 'hover:-translate-y-1 hover:shadow-2xl',
  active: 'active:translate-y-0.5 active:scale-[0.98]',
}
