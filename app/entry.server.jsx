import {RemixServer} from '@remix-run/react';
import {renderToString} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // Allow inline scripts in development for Vite HMR
    scriptSrc: process.env.NODE_ENV === 'development' 
      ? [
          "'self'",
          'https://cdn.shopify.com',
          'http://localhost:*',
          "'unsafe-inline'",
          "'unsafe-eval'",
        ]
      : undefined,
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      "'unsafe-inline'",
    ],
  });

  const html = renderToString(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
  );

  if (header) {
    responseHeaders.set('Content-Security-Policy', header);
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + html, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

