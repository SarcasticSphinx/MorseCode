import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/MorseCode/', // Add this line
  build: {
    outDir: 'dist', // Optional: set the output directory to 'dist' (if not already)
  },
  plugins: [react()],
})
