import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {hydrogen} from '@shopify/hydrogen/vite';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
      serverBuildFile: 'index.js',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    hydrogen(),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  ssr: {
    // Bundle ALL dependencies for Oxygen/Workers environment (Cloudflare Workers)
    // This ensures react/jsx-runtime and all React modules are bundled
    noExternal: true,
    resolve: {
      conditions: ['worker', 'browser'],
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@remix-run/react',
        '@remix-run/server-runtime',
      ],
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  define: {
    global: 'globalThis',
  },
});

