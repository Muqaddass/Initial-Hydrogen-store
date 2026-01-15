import {createStorefrontClient} from '@shopify/hydrogen';

/**
 * Create a Shopify Storefront API client
 * This uses environment variables to connect to your store
 */
export function createShopifyClient() {
  const storefrontApiToken = process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const storeDomain = process.env.PUBLIC_STORE_DOMAIN;
  const storefrontApiVersion = process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-01';

  if (!storefrontApiToken || !storeDomain) {
    console.warn(
      'Shopify Storefront API credentials are missing. Please check your .env file.'
    );
  }

  return createStorefrontClient({
    storeDomain: storeDomain || 'mock-shop.myshopify.com',
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

