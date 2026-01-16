# 🌐 Deploy Your Hydrogen App to a Domain

This guide shows you how to deploy your Hydrogen app to Shopify Oxygen (Shopify's hosting) and connect it to your custom domain.

---

## 🚀 Step 1: Push Code to GitHub

First, make sure your code is on GitHub:

```bash
# Check if you have uncommitted changes
git status

# Add all changes
git add .

# Commit (make sure no secrets are in the code!)
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

**⚠️ Important:** Make sure you've removed any hardcoded tokens from your code! GitHub will block pushes with secrets.

---

## 📦 Step 2: Deploy to Shopify Oxygen

### Option A: Using Hydrogen App (Recommended)

1. **Go to Shopify Admin**
   - Visit: https://u9khbc-vj.myshopify.com/admin

2. **Navigate to Hydrogen App**
   - Go to **Settings → Apps and sales channels**
   - Click on the **Hydrogen** app

3. **Create or Select Storefront**
   - If you haven't created a storefront yet, click **"Create storefront"**
   - Or select your existing storefront

4. **Connect GitHub Repository**
   - Click **"Connect repository"** or **"Deploy"**
   - Authorize Shopify to access your GitHub account
   - Select your repository: `Muqaddass/Initial-Hydrogen-store`
   - Select branch: `main`

5. **Configure Environment Variables**
   - Shopify will show you environment variables
   - Add these variables (from your `.env` file):
     ```
     PUBLIC_STORE_DOMAIN=u9khbc-vj.myshopify.com
     PUBLIC_STOREFRONT_API_TOKEN=2f5f1ca3ce18ce93a489a862e81f3585
     PUBLIC_STOREFRONT_API_VERSION=2024-01
     SESSION_SECRET=a16c98db2b4cdee1fbbb25072116ef0d9d5fa7cd
     ```
   - Click **"Save"**

6. **Deploy**
   - Click **"Deploy"** or **"Save and deploy"**
   - Shopify will build and deploy your app
   - This takes 3-5 minutes

7. **Get Your Oxygen URL**
   - After deployment, you'll get a URL like:
     ```
     https://your-storefront-name.oxygen.store
     ```
   - This is your live Hydrogen app!

---

## 🌍 Step 3: Connect Custom Domain

### Option A: Use Oxygen Subdomain (Easiest)

Your app is already live at: `your-storefront-name.oxygen.store`

You can share this URL with customers - it's a fully functional domain!

---

### Option B: Connect Your Own Domain

1. **Get Your Domain Ready**
   - You need a domain (e.g., `yourstore.com`)
   - Point it to Shopify Oxygen (instructions below)

2. **In Shopify Admin:**
   - Go to **Settings → Domains**
   - Click **"Connect existing domain"**
   - Enter your domain name
   - Follow the DNS configuration instructions

3. **Configure DNS**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add a CNAME record:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: your-storefront-name.oxygen.store
     TTL: 3600
     ```

4. **Wait for DNS Propagation**
   - DNS changes take 24-48 hours to propagate
   - You can check status in Shopify Admin → Settings → Domains

5. **SSL Certificate**
   - Shopify automatically provides SSL certificates
   - Your site will be secure with HTTPS

---

## 🔧 Step 4: Update Environment Variables (If Needed)

If you need to update environment variables after deployment:

1. Go to **Shopify Admin → Hydrogen App**
2. Select your storefront
3. Go to **"Environment variables"** or **"Settings"**
4. Update the values
5. Click **"Save"** - Shopify will redeploy automatically

---

## 📝 Step 5: Set as Primary Storefront (Optional)

If you want your Hydrogen app to be your main store:

1. **In Shopify Admin:**
   - Go to **Settings → Storefronts**
   - Find your Hydrogen storefront
   - Click **"Set as primary"**

2. **Or Keep Both:**
   - Keep your theme storefront as primary
   - Use Hydrogen app for special features (like outfit builder)
   - Link between them as needed

---

## ✅ Verify Deployment

After deployment, check:

1. **Visit Your Oxygen URL**
   - Go to: `https://your-storefront-name.oxygen.store`
   - You should see your Hydrogen app!

2. **Test Features**
   - Visit `/outfit-builder` page
   - Check if products load
   - Test navigation

3. **Check Console**
   - Open browser DevTools (F12)
   - Check for any errors

---

## 🔄 Updating Your App

To update your deployed app:

1. **Make Changes Locally**
   - Edit your code
   - Test locally with `npm run dev`

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Update outfit builder"
   git push origin main
   ```

3. **Automatic Deployment**
   - Shopify Oxygen will automatically detect the push
   - It will rebuild and redeploy your app
   - Takes 3-5 minutes

4. **Or Manual Deploy**
   - Go to Shopify Admin → Hydrogen App
   - Click **"Redeploy"** or **"Deploy latest"**

---

## 🐛 Troubleshooting Deployment

### Build Fails

1. **Check Build Logs**
   - In Shopify Admin → Hydrogen → Deployments
   - Click on the failed deployment
   - Read the error message

2. **Common Issues:**
   - Missing dependencies in `package.json`
   - Syntax errors in code
   - Missing environment variables

### App Not Loading

1. **Check Environment Variables**
   - Make sure all required variables are set
   - Verify token is correct

2. **Check Domain DNS**
   - If using custom domain, verify DNS is correct
   - Use `nslookup` or online DNS checker

### Products Not Showing

1. **Verify Products Are Published**
   - See `PUBLISH_PRODUCTS.md` for instructions

2. **Check API Token**
   - Make sure token has correct permissions
   - Verify token is active

---

## 📊 Deployment Status

Check deployment status:
- **Shopify Admin → Hydrogen App → Deployments**
- You'll see:
  - ✅ Successful deployments (green)
  - ⏳ In progress (yellow)
  - ❌ Failed (red)

---

## 🎯 Summary

1. ✅ Push code to GitHub (no secrets!)
2. ✅ Deploy via Hydrogen app in Shopify Admin
3. ✅ Add environment variables
4. ✅ Get your Oxygen URL
5. ✅ (Optional) Connect custom domain
6. ✅ Your app is live!

---

## 🔗 Useful Links

- **Your GitHub Repo:** https://github.com/Muqaddass/Initial-Hydrogen-store
- **Shopify Admin:** https://u9khbc-vj.myshopify.com/admin
- **Hydrogen Docs:** https://shopify.dev/docs/custom-storefronts/hydrogen

---

**Your Hydrogen app will be live at:** `https://your-storefront-name.oxygen.store` 🎉

