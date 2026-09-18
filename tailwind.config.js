/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#040405',
        surface: {
          50: '#1A1813',
          100: '#141310',
          200: '#0E0D0B',
          300: '#080807',
          border: 'rgba(212, 175, 55, 0.15)',
          'border-light': 'rgba(212, 175, 55, 0.25)',
          'border-highlight': 'rgba(245, 208, 97, 0.4)',
        },
        primary: {
          DEFAULT: '#D4AF37',
          hover: '#E5C048',
          light: '#F7DB7A',
          dark: '#96741F',
          glow: 'rgba(212, 175, 55, 0.3)',
        },
        gold: {
          50: '#FDFBF4',
          100: '#FAF5E3',
          200: '#F5EABF',
          300: '#EDDC94',
          400: '#E4CB6A',
          500: '#D4AF37',
          600: '#B89228',
          700: '#8C6C1B',
          800: '#614911',
          900: '#3D2D09',
          950: '#231904',
        },
        cyber: {
          cyan: '#E5C048',
          blue: '#D4AF37',
          violet: '#C5A059',
        },
        status: {
          safe: '#10B981',
          'safe-bg': 'rgba(16, 185, 129, 0.12)',
          'safe-border': 'rgba(16, 185, 129, 0.3)',
          warning: '#F59E0B',
          'warning-bg': 'rgba(245, 158, 11, 0.12)',
          'warning-border': 'rgba(245, 158, 11, 0.3)',
          critical: '#EF4444',
          'critical-bg': 'rgba(239, 68, 68, 0.12)',
          'critical-border': 'rgba(239, 68, 68, 0.3)',
          info: '#E5C048',
          'info-bg': 'rgba(229, 192, 72, 0.12)',
          'info-border': 'rgba(229, 192, 72, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
        unbounded: ['Unbounded', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'Outfit', 'sans-serif'],
        tech: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -4px rgba(212, 175, 55, 0.4)',
        'glow-gold': '0 0 30px -4px rgba(245, 208, 97, 0.5)',
        'glow-critical': '0 0 24px -4px rgba(239, 68, 68, 0.35)',
        'glow-safe': '0 0 24px -4px rgba(16, 185, 129, 0.35)',
        'glow-warning': '0 0 24px -4px rgba(245, 158, 11, 0.35)',
        'command-center': '0 25px 60px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
