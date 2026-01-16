# 🚀 Quick Setup Guide for Your Hydrogen Store

Your Shopify Hydrogen project is ready! The dev server is running at:
**http://localhost:3000/**

## ✅ What's Working

- ✅ Hydrogen project created with Demo Store template (JavaScript)
- ✅ Dev server running on port 3000
- ✅ Home page at http://localhost:3000/
- ✅ Outfit Builder page at http://localhost:3000/outfit-builder
- ✅ Routing configured with Remix
- ✅ Ready to deploy to Shopify Oxygen

## 🔑 Next Step: Connect Your Shopify Store

Your store: **https://u9khbc-vj.myshopify.com/**

To see real products from your store, you need to add your Storefront API token:

### Get Your Storefront API Token:

**Option 1: Using Hydrogen App (Recommended - What you did!)**

1. **Install Hydrogen App:**
   - Go to your Shopify Admin: https://u9khbc-vj.myshopify.com/admin
   - Navigate to **Settings → Apps and sales channels**
   - Install the **Hydrogen** app from the Shopify App Store (if not already installed)

2. **Create Storefront & Get Token:**
   - Click on the **Hydrogen** app
   - Create a new storefront or select an existing one
   - Copy the **Storefront API access token** from the app settings

**Option 2: Using dev.shopify.com (For custom apps)**

1. **Create App on dev.shopify.com:**
   - Go to https://dev.shopify.com
   - Create a new app in your Partner account
   - Configure Storefront API scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_checkouts`

2. **Install & Get Token:**
   - Install the app to your store
   - Copy the **Storefront API access token** from the app credentials

6. **Update Your `.env` File:**
   
   Open the `.env` file in your project root and update:

   ```env
   PUBLIC_STOREFRONT_API_TOKEN="paste-your-token-here"
   PUBLIC_STORE_DOMAIN="u9khbc-vj.myshopify.com"
   PUBLIC_STOREFRONT_API_VERSION="2024-01"
   SESSION_SECRET="foobar-change-me-in-production"
   ```

7. **Restart the Dev Server:**
   
   Stop the current server (Ctrl+C) and run:
   ```bash
   npm run dev
   ```

8. **Visit the Outfit Builder:**
   
   Go to http://localhost:3000/outfit-builder and you'll see your products!

## 📝 Important Notes

### Publishing Products to Storefront API

Make sure your products are published to the Storefront API sales channel:

1. In Shopify Admin, go to **Products**
2. Select a product
3. Scroll to **Sales channels and apps** section
4. Make sure **"Storefront API"** is checked
5. Click "Save"

### Your Store is in Password Mode

Your store at https://u9khbc-vj.myshopify.com/ is currently password-protected ("Opening soon" page). This is normal and won't affect the Hydrogen app. The Storefront API will still work with your custom Hydrogen frontend.

## 🎨 Pages Created

### 1. Home Page
- **URL:** http://localhost:3000/
- **File:** `app/routes/_index.jsx`
- Beautiful landing page with gradient background
- Link to Outfit Builder

### 2. Outfit Builder Page
- **URL:** http://localhost:3000/outfit-builder
- **File:** `app/routes/outfit-builder.jsx`
- Fetches products from Shopify via Storefront API
- Displays product grid with:
  - Product images
  - Titles
  - Prices
  - Add to Cart buttons
- Shows helpful error messages if API credentials are missing

## 🛠️ Project Structure

```
shopify-theme/
├── app/
│   ├── routes/
│   │   ├── _index.jsx           # Home page
│   │   └── outfit-builder.jsx   # Outfit builder page ⭐
│   ├── lib/
│   │   └── shopify.js           # Shopify API client & GraphQL queries
│   ├── entry.client.jsx         # Client-side entry
│   ├── entry.server.jsx         # Server-side entry
│   └── root.jsx                 # Root layout
├── public/                      # Static assets (favicon, images, etc.)
├── .env                         # Environment variables (⚠️ keep secret!)
├── env.template                 # Template with your store domain
├── package.json                 # Dependencies
├── remix.config.js              # Remix configuration
├── vite.config.js               # Vite configuration
├── hydrogen.config.js           # Hydrogen configuration
└── README.md                    # Full documentation

```

## 🚀 Ready to Deploy?

When you're ready to deploy to Shopify Oxygen:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Hydrogen store"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy via Shopify Admin:**
   - Go to your Shopify Admin
   - Settings → Apps → Develop apps
   - Select your app → Hydrogen
   - Click "Create storefront"
   - Connect your GitHub repository
   - Deploy!

## 📚 Documentation

For more details, see:
- `README.md` - Full documentation
- `app/lib/shopify.js` - Modify GraphQL queries here
- `app/routes/outfit-builder.jsx` - Customize the outfit builder

## 🎉 You're All Set!

Your Hydrogen store is ready to use! Visit:
- **Home:** http://localhost:3000/
- **Outfit Builder:** http://localhost:3000/outfit-builder

Next step: Add your Storefront API token to see real products! 🛍️

