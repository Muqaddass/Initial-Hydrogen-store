/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./public'],
  server: './server.js',
  serverBuildPath: 'dist/worker/index.js',
  serverConditions: ['worker'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: process.env.NODE_ENV === 'production',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },
};

