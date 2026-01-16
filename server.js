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
      
      // Log environment variables status (without exposing secrets)
      console.log('🚀 Server starting with environment:', {
        hasStoreDomain: !!env.PUBLIC_STORE_DOMAIN,
        hasApiToken: !!env.PUBLIC_STOREFRONT_API_TOKEN,
        hasApiVersion: !!env.PUBLIC_STOREFRONT_API_VERSION,
        nodeEnv: env.NODE_ENV || process.env.NODE_ENV,
      });
      
      return await createRequestHandler({
        build,
        mode: env.NODE_ENV || process.env.NODE_ENV || 'production',
        getLoadContext: () => ({
          env: {
            ...env,
            // Ensure all required env vars are available
            PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
            PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN,
            PUBLIC_STOREFRONT_API_VERSION: env.PUBLIC_STOREFRONT_API_VERSION || '2024-10',
            SESSION_SECRET: env.SESSION_SECRET,
            NODE_ENV: env.NODE_ENV || process.env.NODE_ENV,
          },
          executionContext,
        }),
      })(request);
    } catch (error) {
      console.error('❌ Server error:', error);
      console.error('Error stack:', error.stack);
      return new Response(
        JSON.stringify({
          error: 'An error occurred',
          message: error.message,
          ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        }),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        }
      );
    }
  },
};

