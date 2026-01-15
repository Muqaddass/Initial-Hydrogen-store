import {Link} from '@remix-run/react';

export const meta = () => {
  return [
    {title: 'Hydrogen Outfit Builder'},
    {description: 'Welcome to your Hydrogen storefront'},
  ];
};

export default function Index() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🛍️ Hydrogen Outfit Builder</h1>
        <p style={styles.subtitle}>Your Custom Shopify Storefront</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Build Your Perfect Outfit</h2>
          <p style={styles.cardText}>
            Browse our collection and create your unique style with our outfit builder.
          </p>
          <Link to="/outfit-builder" style={styles.button}>
            Start Building →
          </Link>
        </div>

        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>Getting Started</h3>
          <ol style={styles.list}>
            <li>Configure your Shopify Storefront API credentials in the <code>.env</code> file</li>
            <li>Visit the <Link to="/outfit-builder" style={styles.link}>Outfit Builder</Link> page</li>
            <li>Browse products and add them to your cart</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1.6',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  header: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    margin: '0 0 0.5rem 0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.25rem',
    margin: 0,
    opacity: 0.9,
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem 3rem',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  cardTitle: {
    fontSize: '2rem',
    marginTop: 0,
    color: '#333',
  },
  cardText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  button: {
    display: 'inline-block',
    background: '#667eea',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'background 0.2s',
  },
  infoSection: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  infoTitle: {
    fontSize: '1.5rem',
    marginTop: 0,
    color: '#333',
  },
  list: {
    color: '#555',
    fontSize: '1rem',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

