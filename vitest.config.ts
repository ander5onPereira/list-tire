import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
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
});
