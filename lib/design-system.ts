/**
 * SolveXAI Premium SaaS Design System
 * Reference: Linear, Stripe, Vercel
 */

export const spacing = {
  section: {
    vertical: 'clamp(4rem, 10vw, 8rem)',    // 64-128px
    horizontal: 'clamp(2rem, 5vw, 4rem)'    // 32-64px
  },
  content: {
    gap: 'clamp(3rem, 6vw, 5rem)'           // 48-80px
  },
  element: {
    margin: 'clamp(1.5rem, 3vw, 2.5rem)'    // 24-40px
  }
}

export const containers = {
  text: '680px',      // Linear-style narrow for readability
  content: '1120px',  // Stripe-style balanced
  full: '1440px'      // Vercel-style wide for showcases
}

export const typography = {
  h1: 'clamp(2.5rem, 6vw, 4rem)',      // 40-64px
  h2: 'clamp(2rem, 4.5vw, 3rem)',      // 32-48px
  h3: 'clamp(1.5rem, 3vw, 2.25rem)',   // 24-36px
  h4: 'clamp(1.25rem, 2.5vw, 1.75rem)', // 20-28px
  body: 'clamp(1rem, 2vw, 1.125rem)',   // 16-18px
  small: 'clamp(0.875rem, 1.5vw, 1rem)' // 14-16px
}

export const colors = {
  bg: {
    primary: '#0a0a0a',      // Deepest black
    secondary: '#111111',    // Elevated surfaces
    tertiary: '#1a1a1a',     // Cards/panels
    quaternary: '#222222'    // Hover states
  },
  brand: {
    primary: '#8B5CF6',      // Purple
    secondary: '#3B82F6',    // Blue
    accent: '#00F0FF'        // Cyan
  },
  text: {
    primary: '#FFFFFF',           // Headings
    secondary: 'rgba(255,255,255,0.9)',   // Body
    tertiary: 'rgba(255,255,255,0.7)',    // Muted
    quaternary: 'rgba(255,255,255,0.5)'   // Disabled
  },
  border: {
    subtle: 'rgba(255,255,255,0.08)',
    normal: 'rgba(255,255,255,0.12)',
    strong: 'rgba(255,255,255,0.2)'
  }
}

export const cardSpacing = {
  padding: '2rem',           // Internal padding
  gap: '1.5rem',             // Between elements
  marginBottom: '1rem',      // Between cards
  borderRadius: '12px'       // Softer than 24px
}

export const gridGaps = {
  tight: '1rem',    // Dense grids
  normal: '2rem',   // Standard spacing
  loose: '3rem'     // Generous breathing room
}

export const transitions = {
  fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
}

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
  md: '0 4px 12px rgba(139, 92, 246, 0.3)',
  lg: '0 8px 32px rgba(139, 92, 246, 0.15)',
  xl: '0 20px 60px rgba(139, 92, 246, 0.2)',
}
