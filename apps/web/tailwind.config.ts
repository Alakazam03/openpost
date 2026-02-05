import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d8ebff',
          500: '#0a66c2',
          700: '#004182'
        }
      }
    }
  },
  plugins: []
};

export default config;
