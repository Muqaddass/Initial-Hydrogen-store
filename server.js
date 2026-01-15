import {createRequestHandler} from '@shopify/remix-oxygen';

/**
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export default {
  async fetch(request, env, executionContext) {
    try {
      const build = await import('./build/server/index.js');
      
      return await createRequestHandler({
        build,
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({env, executionContext}),
      })(request);
    } catch (error) {
      console.error('Server error:', error);
      return new Response('An error occurred', {
        status: 500,
        headers: {'Content-Type': 'text/plain'},
      });
    }
  },
};

