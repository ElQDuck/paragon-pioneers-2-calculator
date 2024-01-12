import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For Github Pages: https://vitejs.dev/guide/static-deploy#github-pages
export default defineConfig({
  base: "/paragon-pioneers-2-calculator/",
  plugins: [react()],
})
