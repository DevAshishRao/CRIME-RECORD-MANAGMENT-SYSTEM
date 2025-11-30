import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
      host: '0.0.0.0', // allow external access
      port: process.env.PORT || 5173, // optional, if you're using custom port
      allowedHosts: ['crms-backend-5tdm.onrender.com',"*"], // use your own ngrok domain here
  },
})
