import {createStorefrontClient} from '@shopify/hydrogen';

/**
 * Create a Shopify Storefront API client
 * This uses environment variables to connect to your store
 */
export function createShopifyClient(env = {}) {
  // Support both process.env (local) and env object (Oxygen)
  const storefrontApiToken = env.PUBLIC_STOREFRONT_API_TOKEN || process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const storeDomain = env.PUBLIC_STORE_DOMAIN || process.env.PUBLIC_STORE_DOMAIN;
  const storefrontApiVersion = env.PUBLIC_STOREFRONT_API_VERSION || process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-10';

  if (!storefrontApiToken || !storeDomain) {
    console.error('❌ Missing Shopify credentials:');
    console.error('  PUBLIC_STOREFRONT_API_TOKEN:', storefrontApiToken ? '✅ Set' : '❌ Missing');
    console.error('  PUBLIC_STORE_DOMAIN:', storeDomain ? '✅ Set' : '❌ Missing');
    throw new Error('Shopify Storefront API credentials are missing. Please check your environment variables.');
  }

  console.log('🔗 Connecting to Shopify:', {
    domain: storeDomain,
    apiVersion: storefrontApiVersion,
    tokenLength: storefrontApiToken?.length || 0,
  });

  return createStorefrontClient({
    storeDomain,
    storefrontApiVersion,
    privateStorefrontToken: storefrontApiToken,
  });
}

/**
 * GraphQL query to fetch products
 */
export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

