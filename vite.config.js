import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {hydrogen} from '@shopify/hydrogen/vite';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    hydrogen(),
  ],
  build: {
    target: 'esnext',
  },
  ssr: {
    optimizeDeps: {
      include: [],
    },
  },
});

