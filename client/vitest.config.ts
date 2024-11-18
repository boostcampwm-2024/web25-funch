import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@test': fileURLToPath(new URL('./src/__test__', import.meta.url)),
      '@mocks': fileURLToPath(new URL('./src/__mocks__', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@providers': fileURLToPath(new URL('./src/app/providers', import.meta.url)),
      '@libs': fileURLToPath(new URL('./src/libs', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/app/components', import.meta.url)),
      '@server': fileURLToPath(new URL('./src/server', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
