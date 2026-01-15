# Hydrogen Outfit Builder

A custom Shopify Hydrogen storefront built with the Demo Store template, featuring a custom `/outfit-builder` page that fetches products from your Shopify store via the Storefront API.

## 🚀 Features

- ✅ Built with Shopify Hydrogen and Remix
- ✅ JavaScript (no TypeScript)
- ✅ Custom `/outfit-builder` route with product listing
- ✅ Fetches real products from Shopify Storefront API
- ✅ Product cards with images, titles, and prices
- ✅ Add to cart functionality
- ✅ Ready to deploy to Shopify Oxygen

## 📋 Prerequisites

- Node.js 18 or higher
- A Shopify store (or Partner development store)
- Shopify Storefront API credentials

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Shopify Storefront API

To connect this app to your Shopify store, you need to create a Storefront API access token:

#### Step-by-step:

1. **Go to your Shopify Admin** at `https://your-store.myshopify.com/admin`

2. **Navigate to Settings → Apps and sales channels → Develop apps**

3. **Create a new app** (or use an existing one):
   - Click "Create an app"
   - Give it a name like "Hydrogen Storefront"
   - Click "Create app"

4. **Configure API Scopes**:
   - Go to the "Configuration" tab
   - Under "Storefront API" section, click "Configure"
   - Select these scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_checkouts`
   - Click "Save"

5. **Install the app**:
   - Go to "API credentials" tab
   - Click "Install app"
   - Copy the **Storefront API access token**

6. **Update your `.env` file**:
   
   Open the `.env` file in the root of this project and update these values:

   ```env
   PUBLIC_STOREFRONT_API_TOKEN="your-storefront-api-token-here"
   PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
   PUBLIC_STOREFRONT_API_VERSION="2024-01"
   SESSION_SECRET="change-this-to-a-random-string"
   ```

   Replace:
   - `your-storefront-api-token-here` with the token you copied
   - `your-store.myshopify.com` with your actual store domain

### 3. Run the Development Server

```bash
npm run dev
```

The app will start at **http://localhost:3000**

Visit **http://localhost:3000/outfit-builder** to see your products!

## 📁 Project Structure

```
.
├── app/
│   ├── routes/
│   │   ├── _index.jsx          # Home page
│   │   └── outfit-builder.jsx  # Custom outfit builder page
│   ├── lib/
│   │   └── shopify.js          # Shopify API client & queries
│   ├── entry.client.jsx        # Client-side entry point
│   ├── entry.server.jsx        # Server-side entry point
│   └── root.jsx                # Root layout component
├── package.json                # Dependencies and scripts
├── remix.config.js             # Remix configuration
├── vite.config.js              # Vite configuration
├── server.js                   # Server entry point
└── .env                        # Environment variables (⚠️ add to .gitignore)
```

## 🎨 Customizing the Outfit Builder

The outfit builder page is located at `app/routes/outfit-builder.jsx`. Here's what you can customize:

### Fetch More Products

Change the number of products fetched:

```javascript
const {data} = await storefront.query(PRODUCTS_QUERY, {
  variables: {
    first: 24, // Change this number
  },
});
```

### Modify Product Display

Edit the `ProductCard` component in `app/routes/outfit-builder.jsx` to customize how products are displayed.

### Add Filters or Search

Modify the GraphQL query in `app/lib/shopify.js` to add product filtering:

```graphql
query GetProducts($first: Int!, $query: String) {
  products(first: $first, query: $query) {
    # ...
  }
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🚀 Deploy to Shopify Oxygen

### Option 1: Using Shopify CLI

1. **Install Shopify CLI** (if not already installed):
   ```bash
   npm install -g @shopify/cli
   ```

2. **Link your store**:
   ```bash
   shopify hydrogen link
   ```

3. **Deploy**:
   ```bash
   shopify hydrogen deploy
   ```

### Option 2: Using GitHub (Recommended)

1. Push your code to a GitHub repository

2. In your Shopify Admin:
   - Go to **Settings → Apps and sales channels → Develop apps**
   - Select your app (or create a new one)
   - Go to **Hydrogen** section
   - Click **Create storefront**
   - Connect your GitHub repository
   - Select the branch to deploy
   - Click **Deploy**

Your Hydrogen storefront will be automatically deployed to Shopify Oxygen!

## 🔑 Environment Variables

Make sure these are set before deploying:

- `PUBLIC_STOREFRONT_API_TOKEN` - Your Storefront API access token
- `PUBLIC_STORE_DOMAIN` - Your store domain (e.g., `your-store.myshopify.com`)
- `PUBLIC_STOREFRONT_API_VERSION` - API version (e.g., `2024-01`)
- `SESSION_SECRET` - A random secret string for sessions

## 📚 Learn More

- [Shopify Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Remix Documentation](https://remix.run/docs)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)

## 🐛 Troubleshooting

### "Failed to fetch products" error

- Check that your `.env` file has the correct credentials
- Verify your Storefront API token has the required scopes
- Make sure your products are published to the "Storefront API" sales channel in Shopify Admin

### Port 3000 already in use

Run the dev server on a different port:
```bash
npm run dev -- --port 3001
```

### Products not showing up

1. Go to your Shopify Admin
2. Go to Products
3. Select a product
4. Scroll to "Sales channels and apps"
5. Make sure "Storefront API" is checked

## 📄 License

MIT

