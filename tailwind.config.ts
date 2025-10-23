import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ff",
          100: "#dce8ff",
          200: "#bfd4ff",
          300: "#93b6ff",
          400: "#5b8cff",
          500: "#2f67ff",
          600: "#1d4bdb",
          700: "#183bb0",
          800: "#17308a",
          900: "#172a6e"
        }
      }
    }
  },
  plugins: []
};

export default config;
