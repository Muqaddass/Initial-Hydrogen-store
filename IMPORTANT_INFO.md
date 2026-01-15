# 🚨 IMPORTANT: Hydrogen vs Shopify Themes

## What You Need to Know

### This is NOT a Shopify Theme! ⚠️

Your Hydrogen project is a **completely separate storefront application**, NOT a theme that appears on your main store.

Here's the difference:

## 🎨 Shopify Theme (What you're seeing now)
- Lives at: **https://u9khbc-vj.myshopify.com/**
- Your current theme: **Dawn** (the default Shopify theme)
- Managed in: Shopify Admin → Online Store → Themes
- Uses Liquid templating language
- Limited customization

## 🚀 Hydrogen Storefront (This Project)
- Lives at: **http://localhost:3000/** (local development)
- After deployment: Your custom domain or Shopify-hosted URL
- Built with: React, JavaScript, fully custom
- Uses Shopify Storefront API to fetch products
- Complete control over design and functionality
- This is a **headless** storefront (separate from your main store)

---

## How This Works Together

```
┌─────────────────────────────────────────┐
│     Your Shopify Store (Backend)        │
│   u9khbc-vj.myshopify.com/admin        │
│   • Products                             │
│   • Orders                               │
│   • Customers                            │
│   • Inventory                            │
└──────────────┬──────────────────────────┘
               │
               │ Storefront API
               │ (Your Token)
               │
      ┌────────┴──────────┬─────────────────┐
      │                   │                  │
      ▼                   ▼                  ▼
┌──────────┐      ┌──────────────┐   ┌──────────────┐
│  Theme   │      │   Hydrogen   │   │  Mobile App  │
│  (Dawn)  │      │  (This App)  │   │   (Future)   │
│          │      │              │   │              │
│ myshopify│      │ localhost    │   │              │
│   .com   │      │   :3000      │   │              │
└──────────┘      └──────────────┘   └──────────────┘
```

---

## ✅ To See Your Hydrogen App:

1. **Local Development (Now):**
   - Visit: **http://localhost:3000/**
   - This is YOUR Hydrogen app with the outfit builder

2. **Your Store's Theme:**
   - Visit: **https://u9khbc-vj.myshopify.com/**
   - This is the Dawn theme (your online store)

They are **completely separate**!

---

## 🔧 Fixing the Token Issue

I've created `.env.local` with your tokens. Now do this:

### Copy your token to the main .env file:

1. Open the `.env` file in your project root
2. Update this line:
   ```env
   PUBLIC_STOREFRONT_API_TOKEN="shpat_dc80d598754b55e9339048e7745797a"
   ```

3. Save the file

4. **IMPORTANT:** Restart the dev server:
   - Press `Ctrl+C` in the terminal to stop it
   - Run: `npm run dev`
   - The server MUST be restarted to load new environment variables!

5. Visit: **http://localhost:3000/outfit-builder**

You should now see your products!

---

## 🌐 To Make Hydrogen Your Live Store:

If you want customers to use the Hydrogen app instead of Dawn:

### Option 1: Deploy to Oxygen (Shopify's hosting)
1. Push your code to GitHub
2. In Shopify Admin: Settings → Apps → Develop apps
3. Select your app → Hydrogen
4. Click "Create storefront"
5. Connect GitHub repository
6. Shopify will give you a URL like: `yourstore.oxygen.store`

### Option 2: Custom Domain
After deploying to Oxygen, you can:
- Point your custom domain to the Hydrogen app
- Make it your main storefront
- Keep Dawn as a backup in Shopify Admin

### Option 3: Use Both
- Keep Dawn as your main store
- Use Hydrogen for a special experience (like the outfit builder)
- Link between them

---

## 🎯 What to Do Now:

1. ✅ Update `.env` with your token (see above)
2. ✅ Restart the dev server: `Ctrl+C`, then `npm run dev`
3. ✅ Visit http://localhost:3000/outfit-builder to see products
4. ✅ Customize the Hydrogen app as needed
5. ✅ When ready, deploy to Shopify Oxygen

---

## 📝 Your Tokens (Keep Secret!)

**Private Access Token (Use this one):**
```
shpat_dc80d598754b55e9339048e7745797a
```

**Public Access Token (Alternative):**
```
bc84203979a6f217fa702720f81a73e4
```

Use the **private token** in your `.env` file for better security.

---

## ❓ Common Questions

**Q: Why don't I see the Hydrogen app on my store?**
A: Because it's not deployed yet. Right now it only runs on your computer at localhost:3000

**Q: Will this replace my Dawn theme?**
A: Only if you want it to! You can deploy it separately or replace Dawn entirely.

**Q: Can I use both?**
A: Yes! Many stores use Hydrogen for custom experiences and keep their theme for the main store.

**Q: How do customers access this?**
A: After deploying to Oxygen, Shopify gives you a URL, or you can point your domain to it.

---

Need help? See `SETUP_GUIDE.md` for detailed instructions!

