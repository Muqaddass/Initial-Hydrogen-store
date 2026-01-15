// This file is for Oxygen deployment
// For local development, Remix uses its built-in dev server
export default {
  async fetch(request, env, executionContext) {
    try {
      const build = await import('./build/server/index.js');
      const {createRequestHandler} = await import('@remix-run/server-runtime');
      
      const handleRequest = createRequestHandler(build, process.env.NODE_ENV);
      return await handleRequest(request);
    } catch (error) {
      console.error(error);
      return new Response('An error occurred', {status: 500});
    }
  },
};

