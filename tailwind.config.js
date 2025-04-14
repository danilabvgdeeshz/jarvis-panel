/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", 
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/**/*.{js,ts,jsx,tsx,mdx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        soyuz: ['SoyuzGrotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        'acid-green': '#39FF14',
        'cyber-purple': '#ff00ff',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.15 }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      dropShadow: {
        'icon': '0 2px 3px rgba(0, 0, 0, 0.5)',
        'neon-green': '0 0 5px rgba(57, 255, 20, 0.7)',
        'neon-purple': '0 0 5px rgba(255, 0, 255, 0.5)',
      }
    },
  },
  plugins: [],
};