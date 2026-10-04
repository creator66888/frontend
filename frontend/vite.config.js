import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Local dev only: the website runs on http://localhost:3000 and proxies
  // /api to the deployed backend (swap target to http://localhost:3001 for a local one).
  // `vite build` ignores this block, so Vercel deployments are unaffected.
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://backend-dtvj.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
