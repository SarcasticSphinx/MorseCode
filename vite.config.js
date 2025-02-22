import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/MorseCode/', // Add this line
  build: {
    outDir: 'dist', // Optional: set the output directory to 'dist' (if not already)
  },
  plugins: [tailwindcss(),react()],
})
