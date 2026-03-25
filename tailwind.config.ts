import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0066FF',
          cyan: '#00F0FF',
        },
        background: {
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': 'var(--text-display)',      // 96px - Hero headlines
        'headline': 'var(--text-headline)',    // 64px - Section headers
        'title': 'var(--text-title)',          // 48px - Card titles
        'subtitle': 'var(--text-subtitle)',    // 32px - Subheadings
        'body-lg': 'var(--text-body-lg)',      // 24px - Large body
        'body': 'var(--text-body)',            // 18px - Default body
        'small': 'var(--text-small)',          // 16px - Small text
        'caption': 'var(--text-caption)',      // 14px - Captions
        '9xl': '8rem',    // 128px - Apple-style massive headlines (legacy)
        '10xl': '10rem',  // 160px - Ultra-large (legacy)
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',       // 1.2
        'snug': 'var(--leading-snug)',         // 1.3
        'normal': 'var(--leading-normal)',     // 1.5
        'relaxed': 'var(--leading-relaxed)',   // 1.75
      },
      fontWeight: {
        light: 'var(--font-light)',            // 300
        normal: 'var(--font-normal)',          // 400
        medium: 'var(--font-medium)',          // 500
        semibold: 'var(--font-semibold)',      // 600
        bold: 'var(--font-bold)',              // 700
      },
      spacing: {
        'xs': 'var(--spacing-xs)',             // 8px
        'sm': 'var(--spacing-sm)',             // 13px
        'md': 'var(--spacing-md)',             // 21px
        'lg': 'var(--spacing-lg)',             // 34px
        'xl': 'var(--spacing-xl)',             // 55px
        '2xl': 'var(--spacing-2xl)',           // 89px
      },
      maxWidth: {
        'container-max': 'var(--container-max)',           // 1920px
        'container-wide': 'var(--container-wide)',         // 1440px
        'container': 'var(--container-default)',           // 1280px
        'container-narrow': 'var(--container-narrow)',     // 1024px
        'container-tight': 'var(--container-tight)',       // 768px
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
          },
          '33%': {
            transform: 'translateY(-20px) translateX(10px)',
          },
          '66%': {
            transform: 'translateY(-10px) translateX(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
