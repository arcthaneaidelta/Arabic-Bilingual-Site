/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F7F4EE',
        surface: '#FFFFFF',
        'surface-2': '#FBF9F4',
        ink: '#14201D',
        'text-2': '#42504C',
        muted: '#76827E',
        border: '#E4DFD3',
        'border-strong': '#CFC8B8',
        primary: {
          DEFAULT: '#1F4D45',
          hover: '#183D37',
          active: '#122F2A',
          tint: '#E5EEEB',
        },
        accent: {
          DEFAULT: '#B08A4A',
          tint: '#F2E9D6',
        },
        secondary: '#E9E2D2',
        success: {
          DEFAULT: '#3F7D58',
          tint: '#E3F0E8',
        },
        warning: {
          DEFAULT: '#B7791F',
          tint: '#FAEFD9',
        },
        error: {
          DEFAULT: '#B5473A',
          tint: '#F8E4E0',
        },
        info: {
          DEFAULT: '#3E6A8A',
          tint: '#E3ECF3',
        },
        dark: {
          DEFAULT: '#0F1A18',
          2: '#16241F',
        },
        'on-dark': '#EAE6DB',
        geo: {
          saudi: '#1F4D45',
          gcc: '#2F6B74',
          mena: '#7A6A3A',
          intl: '#4F5B7A',
        }
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        headline: ['var(--font-head)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(20,32,29,.06)',
        md: '0 6px 20px -6px rgba(20,32,29,.14)',
        lg: '0 20px 48px -16px rgba(20,32,29,.22)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
