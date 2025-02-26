import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    "process.env": {},
  },
  plugins: [react()], // <- 쉼표 추가
})
