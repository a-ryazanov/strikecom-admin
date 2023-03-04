import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
// https://github.com/sapphi-red/vite-setup-catalogue
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    https: {
      cert: path.join(__dirname, 'zabastcom.local+4.pem'),
      key: path.join(__dirname, 'zabastcom.local+4-key.pem'),
    },
    host: true,
    strictPort: true,
  },
})
