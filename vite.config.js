import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/create': 'http://localhost:3001',
      '/edit': 'http://localhost:3001',
      '/delete': 'http://localhost:3001',
      '/upload': 'http://localhost:3001'
    }
  }
}); 