import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@context": path.resolve(__dirname, 'src/context'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@function": path.resolve(__dirname, 'src/function'),
      "@pages": path.resolve(__dirname, 'src/pages'),
    },
  },
})
