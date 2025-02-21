import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.shared_secret_for_requests': JSON.stringify(process.env.shared_secret_for_requests)
  }
})
