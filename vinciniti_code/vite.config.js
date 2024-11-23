import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vinc-production-3a9e.up.railway.app', // Your backend URL
        changeOrigin: true, // Ensures the host header matches the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrites '/api' to '' before sending to the backend
      },
    },
  },
});
