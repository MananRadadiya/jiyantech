export default {
  content: ['./views/**/*.ejs', './public/**/*.js', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1d6fe8',
          600: '#1557bf',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        ink: {
          DEFAULT: '#090d16',
          secondary: '#334155',
          muted: '#64748b',
          subtle: '#94a3b8',
        },
        dark: {
          bg: '#071224',
          surface: '#0e203c',
          border: 'rgba(255, 255, 255, 0.1)',
          muted: '#94a3b8',
        },
        jy: {
          navy: '#0a192f',
          electric: '#1d6fe8',
          'deep-blue': '#1557bf',
          cyan: '#0284c7',
          accent: '#38bdf8',
          slate: '#334155',
          'soft-gray': '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        brand: '0 10px 25px -3px rgba(29, 111, 232, 0.25)',
        'brand-lg': '0 14px 30px -4px rgba(29, 111, 232, 0.35)',
      },
      animation: {
        'spin-slow': 'spin 26s linear infinite',
        'spin-reverse': 'spin-rev 32s linear infinite',
        'float': 'floatAnim 6s ease-in-out infinite',
        'float-slow': 'floatSlowAnim 8s ease-in-out infinite',
        'beacon': 'beaconRadar 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'pulse-ring': 'pulseGlowRing 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-rev': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        floatAnim: {
          '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
          '50%': { transform: 'translate(-50%, -50%) translateY(-10px)' },
        },
        floatSlowAnim: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        beaconRadar: {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        pulseGlowRing: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.3' },
          '50%': { transform: 'scale(1.06)', opacity: '0.75' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
