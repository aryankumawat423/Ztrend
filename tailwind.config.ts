
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Dark red and black theme
        background: {
          DEFAULT: '#0D0D0D', // Deep black
          dark: '#1A0000',    // Dark red-black
        },
        foreground: {
          DEFAULT: '#D9534F', // Dark red
          light: '#FF6B6B',   // Lighter red
        },
        accent: {
          DEFAULT: '#8B0000', // Dark red
          dark: '#500000',    // Very dark red
        },
        border: {
          DEFAULT: '#330000', // Very dark red border
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to right, #0D0D0D, #330000)',
      },
      boxShadow: {
        'dark-red': '0 4px 6px rgba(139, 0, 0, 0.3)',
      },
      keyframes: {
        // Add some dark, intense animations
        'pulse-dark': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'slide-dark': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        'pulse-dark': 'pulse-dark 2s ease-in-out infinite',
        'slide-dark': 'slide-dark 0.5s ease-out',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
