import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For Github Pages: https://vitejs.dev/guide/static-deploy#github-pages
export default defineConfig({
  base: "/paragon-pioneers-2-calculator/",
  plugins: [react()],
  esbuild: {
    minifyIdentifiers: false, // Needed to keep the function names after the build as they are because they are used to display the building name on image hover
  },
})
