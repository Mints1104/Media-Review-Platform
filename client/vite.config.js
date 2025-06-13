// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Any request starting with /api
        target: 'http://localhost:5000', // Will be redirected to your backend
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: If your backend routes don't start with /api
      },
    },
  },
});