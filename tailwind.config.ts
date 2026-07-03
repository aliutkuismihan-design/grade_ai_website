import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: '#0F172A',
          primary: '#6366F1',
          secondary: '#14B8A6',
          accent: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99,102,241,0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
