import {json} from '@remix-run/server-runtime';
import {useLoaderData, Link} from '@remix-run/react';
import {createShopifyClient, PRODUCTS_QUERY} from '../lib/shopify';

/**
 * Loader function - fetches products from Shopify Storefront API
 * This runs on the server before the page renders
 */
export async function loader() {
  try {
    const {storefront} = createShopifyClient();
    
    // Fetch products from Shopify
    const {data} = await storefront.query(PRODUCTS_QUERY, {
      variables: {
        first: 12, // Fetch 12 products
      },
    });

    const products = data?.products?.edges?.map((edge) => edge.node) || [];

    return json({
      products,
      hasProducts: products.length > 0,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Return mock data if API fails (useful for development)
    return json({
      products: [],
      hasProducts: false,
      error: 'Failed to fetch products. Please check your Shopify API credentials.',
    });
  }
}

export const meta = () => {
  return [
    {title: 'Outfit Builder - Shopify Hydrogen'},
    {description: 'Build your perfect outfit from our collection'},
  ];
};

export default function OutfitBuilder() {
  const {products, hasProducts, error} = useLoaderData();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
          <h1 style={styles.title}>Outfit Builder</h1>
          <p style={styles.subtitle}>Browse and select products for your perfect outfit</p>
        </div>
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.errorCard}>
            <h2 style={styles.errorTitle}>⚠️ Configuration Needed</h2>
            <p style={styles.errorText}>{error}</p>
            <div style={styles.instructions}>
              <h3 style={styles.instructionsTitle}>How to connect your Shopify store:</h3>
              <ol style={styles.instructionsList}>
                <li>Go to your Shopify Admin panel</li>
                <li>Navigate to <strong>Settings → Apps and sales channels → Develop apps</strong></li>
                <li>Click <strong>"Create an app"</strong> or select an existing app</li>
                <li>Go to <strong>Configuration</strong> tab</li>
                <li>Under <strong>Storefront API</strong>, configure these scopes:
                  <ul>
                    <li><code>unauthenticated_read_product_listings</code></li>
                    <li><code>unauthenticated_read_product_inventory</code></li>
                    <li><code>unauthenticated_read_checkouts</code></li>
                  </ul>
                </li>
                <li>Click <strong>Save</strong></li>
                <li>Go to <strong>API credentials</strong> tab</li>
                <li>Click <strong>"Install app"</strong></li>
                <li>Copy the <strong>Storefront API access token</strong></li>
                <li>Update your <code>.env</code> file with:
                  <pre style={styles.codeBlock}>
{`PUBLIC_STOREFRONT_API_TOKEN="your-token-here"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"`}
                  </pre>
                </li>
                <li>Restart the development server: <code>npm run dev</code></li>
              </ol>
            </div>
          </div>
        )}

        {!hasProducts && !error && (
          <div style={styles.emptyState}>
            <h2>No products found</h2>
            <p>Your store doesn't have any products yet, or they're not published to the Storefront API sales channel.</p>
          </div>
        )}

        {hasProducts && (
          <div style={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * Product Card Component
 * Displays individual product with image, title, price, and add to cart button
 */
function ProductCard({product}) {
  const variant = product.variants?.edges?.[0]?.node;
  const price = variant?.price || product.priceRange?.minVariantPrice;
  const imageUrl = product.featuredImage?.url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png';

  const handleAddToCart = () => {
    alert(`Added "${product.title}" to cart! 🛒\n\nIn a production app, this would add the item to your Shopify cart using the Cart API.`);
  };

  return (
    <div style={styles.productCard}>
      <div style={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={product.featuredImage?.altText || product.title}
          style={styles.productImage}
        />
      </div>
      <div style={styles.productInfo}>
        <h3 style={styles.productTitle}>{product.title}</h3>
        {price && (
          <p style={styles.productPrice}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currencyCode,
            }).format(price.amount)}
          </p>
        )}
        <button
          onClick={handleAddToCart}
          style={styles.addToCartButton}
          disabled={!variant?.availableForSale}
        >
          {variant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
    background: '#f7f7f7',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem 1rem',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  backLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    opacity: 0.9,
    display: 'inline-block',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 0.5rem 0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.1rem',
    margin: 0,
    opacity: 0.9,
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  errorCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '2px solid #f59e0b',
  },
  errorTitle: {
    color: '#f59e0b',
    marginTop: 0,
  },
  errorText: {
    fontSize: '1.1rem',
    color: '#666',
  },
  instructions: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '8px',
  },
  instructionsTitle: {
    marginTop: 0,
    color: '#333',
  },
  instructionsList: {
    color: '#555',
    lineHeight: '1.8',
  },
  codeBlock: {
    background: '#1f2937',
    color: '#10b981',
    padding: '1rem',
    borderRadius: '6px',
    overflow: 'auto',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'white',
    borderRadius: '12px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    background: '#f3f4f6',
    overflow: 'hidden',
  },
  productImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '1.25rem',
  },
  productTitle: {
    fontSize: '1.1rem',
    margin: '0 0 0.5rem 0',
    color: '#1f2937',
    fontWeight: '600',
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '0 0 1rem 0',
  },
  addToCartButton: {
    width: '100%',
    padding: '0.75rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

