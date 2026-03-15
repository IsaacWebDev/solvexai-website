import type { Config } from "tailwindcss";
import claymorphismPlugin from './plugins/claymorphism'

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
        '9xl': '8rem',    // 128px - Apple-style massive headlines
        '10xl': '10rem',  // 160px - Ultra-large
      },
      fontWeight: {
        light: '300',     // Apple body text
        normal: '400',    // Apple default
        semibold: '600',  // Apple emphasis
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
  plugins: [claymorphismPlugin],
} satisfies Config;
