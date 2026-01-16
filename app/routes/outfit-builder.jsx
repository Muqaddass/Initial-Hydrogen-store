import {json} from '@remix-run/server-runtime';
import {useLoaderData, Link} from '@remix-run/react';
import {createShopifyClient, PRODUCTS_QUERY} from '../lib/shopify';

/**
 * Loader function - fetches products from Shopify Storefront API
 * This runs on the server before the page renders
 */
export async function loader({context}) {
  try {
    // Get environment variables from context (Oxygen) or process.env (local)
    const env = context?.env || {};
    const {storefront} = createShopifyClient(env);
    
    console.log('📦 Fetching products from Shopify...');
    
    // Fetch products from Shopify
    const response = await storefront.query(PRODUCTS_QUERY, {
      variables: {
        first: 12, // Fetch 12 products
      },
    });

    const products = response?.data?.products?.edges?.map((edge) => edge.node) || [];
    const productCount = products.length;

    console.log(`✅ Fetched ${productCount} products from Shopify`);

    if (productCount === 0) {
      console.warn('⚠️ No products found. Make sure products are published to Storefront API sales channel.');
    }

    return json({
      products,
      hasProducts: productCount > 0,
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response,
    });
    
    // Return detailed error information
    return json({
      products: [],
      hasProducts: false,
      error: error.message || 'Failed to fetch products. Please check your Shopify API credentials.',
      errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
                <li><strong>Option 1: Using Hydrogen App (Recommended)</strong>
                  <ul style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                    <li>Install the <strong>Hydrogen</strong> app from Shopify App Store</li>
                    <li>Go to <strong>Settings → Apps and sales channels</strong></li>
                    <li>Click on the <strong>Hydrogen</strong> app</li>
                    <li>Create a storefront or select an existing one</li>
                    <li>Copy the <strong>Storefront API access token</strong> from the app settings</li>
                  </ul>
                </li>
                <li><strong>Option 2: Using dev.shopify.com (For custom apps)</strong>
                  <ul style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                    <li>Go to <a href="https://dev.shopify.com" target="_blank" rel="noopener noreferrer" style={{color: '#667eea'}}>dev.shopify.com</a> and create a new app</li>
                    <li>Configure Storefront API scopes:
                      <ul>
                        <li><code>unauthenticated_read_product_listings</code></li>
                        <li><code>unauthenticated_read_product_inventory</code></li>
                        <li><code>unauthenticated_read_checkouts</code></li>
                      </ul>
                    </li>
                    <li>Install the app to your store and copy the Storefront API token</li>
                  </ul>
                </li>
                <li>Create a <code>.env</code> file in your project root (copy from <code>env.template</code>)</li>
                <li>Update your <code>.env</code> file with:
                  <pre style={styles.codeBlock}>
{`PUBLIC_STOREFRONT_API_TOKEN="your-token-here"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STOREFRONT_API_VERSION="2024-01"
SESSION_SECRET="your-session-secret"`}
                  </pre>
                </li>
                <li>Restart the development server: <code>npm run dev</code></li>
              </ol>
              <div style={{marginTop: '1rem', padding: '1rem', background: '#e0f2fe', borderRadius: '6px', fontSize: '0.9rem'}}>
                <strong>Note:</strong> Shopify no longer allows creating custom apps directly in the admin panel. 
                Use the Hydrogen app from the App Store (Option 1) or create apps through dev.shopify.com (Option 2).
              </div>
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

