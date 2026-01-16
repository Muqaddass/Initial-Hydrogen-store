# 🚀 Deployment Troubleshooting

If your app isn't deploying to Shopify Oxygen, follow these steps:

## ✅ Step 1: Check GitHub Repository

1. **Verify code is pushed:**
   - Go to: https://github.com/Muqaddass/Initial-Hydrogen-store
   - Check that your latest code is there
   - Make sure no secrets are in the code

2. **Check for build errors:**
   - Look at the repository
   - Make sure `package.json` exists
   - Make sure `server.js` exists
   - Make sure `remix.config.js` exists

## ✅ Step 2: Check Shopify Hydrogen App Configuration

1. **Go to Shopify Admin:**
   - Visit: https://u9khbc-vj.myshopify.com/admin
   - Go to **Settings → Apps and sales channels**
   - Click on **Hydrogen** app

2. **Verify Storefront Configuration:**
   - Check if storefront exists
   - If not, click **"Create storefront"**
   - Name it (e.g., "My Hydrogen Store")

3. **Connect GitHub Repository:**
   - Click **"Connect repository"** or **"Deploy"**
   - Authorize Shopify to access GitHub
   - Select repository: `Muqaddass/Initial-Hydrogen-store`
   - Select branch: `main`
   - Click **"Connect"**

## ✅ Step 3: Set Environment Variables in Shopify

**CRITICAL:** Environment variables must be set in Shopify Admin, not just in `.env` file!

1. **In Hydrogen App → Your Storefront:**
   - Go to **"Environment variables"** or **"Settings"**
   - Click **"Add variable"** for each:

   **Required Variables:**
   ```
   Key: PUBLIC_STORE_DOMAIN
   Value: u9khbc-vj.myshopify.com
   Environment: All (or Preview, Production)
   ```

   ```
   Key: PUBLIC_STOREFRONT_API_TOKEN
   Value: 2f5f1ca3ce18ce93a489a862e81f3585
   Environment: All (or Preview, Production)
   ```

   ```
   Key: PUBLIC_STOREFRONT_API_VERSION
   Value: 2024-10
   Environment: All (or Preview, Production)
   ```

   ```
   Key: SESSION_SECRET
   Value: a16c98db2b4cdee1fbbb25072116ef0d9d5fa7cd
   Environment: All (or Preview, Production)
   ```

2. **Click "Save"** after adding each variable

## ✅ Step 4: Trigger Deployment

1. **Manual Deploy:**
   - In Hydrogen App → Your Storefront
   - Click **"Deploy"** or **"Redeploy"**
   - Wait for deployment (3-5 minutes)

2. **Automatic Deploy:**
   - Push new code to GitHub
   - Shopify should auto-detect and deploy
   - Check deployment status in Hydrogen App

## ✅ Step 5: Check Deployment Logs

1. **In Hydrogen App → Deployments:**
   - Click on the latest deployment
   - Check **"Build logs"** or **"Deployment logs"**
   - Look for errors

### Common Build Errors:

**Error: "Build failed"**
- Check `package.json` has all dependencies
- Check `server.js` exists and is correct
- Check `remix.config.js` is correct

**Error: "Missing environment variables"**
- Go back to Step 3
- Make sure all variables are set in Shopify Admin

**Error: "Server entry point not found"**
- Verify `server.js` exists in root directory
- Check `remix.config.js` points to `server.js`

**Error: "Module not found"**
- Check `package.json` has all required dependencies
- Dependencies should be in `dependencies`, not `devDependencies`

## ✅ Step 6: Verify Deployment Status

1. **Check deployment status:**
   - Green ✅ = Success
   - Yellow ⏳ = In progress
   - Red ❌ = Failed

2. **If successful:**
   - You'll get a URL like: `https://your-storefront-name.oxygen.store`
   - Visit the URL to see your app

3. **If failed:**
   - Read the error message in deployment logs
   - Fix the issue
   - Redeploy

## ✅ Step 7: Test Deployed App

1. **Visit your Oxygen URL:**
   - Example: `https://your-storefront-name.oxygen.store`
   - Check if homepage loads
   - Visit `/outfit-builder` page

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab for failed requests

3. **Check if products load:**
   - If products don't show, see `DEBUG_PRODUCTS.md`

## 🔧 Common Deployment Issues

### Issue: "Repository not found"
**Fix:** 
- Make sure GitHub repository is public OR
- Authorize Shopify to access private repositories

### Issue: "Build timeout"
**Fix:**
- Check `package.json` - remove unnecessary dependencies
- Make sure build script is correct: `"build": "remix vite:build"`

### Issue: "Environment variables not working"
**Fix:**
- Variables must be set in Shopify Admin (not just `.env`)
- Make sure variable names match exactly (case-sensitive)
- Restart deployment after adding variables

### Issue: "App loads but shows errors"
**Fix:**
- Check browser console for errors
- Verify environment variables are set correctly
- Check deployment logs for runtime errors

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub (no secrets in code)
- [ ] Hydrogen app installed in Shopify Admin
- [ ] Storefront created in Hydrogen app
- [ ] GitHub repository connected
- [ ] Environment variables set in Shopify Admin:
  - [ ] PUBLIC_STORE_DOMAIN
  - [ ] PUBLIC_STOREFRONT_API_TOKEN
  - [ ] PUBLIC_STOREFRONT_API_VERSION
  - [ ] SESSION_SECRET
- [ ] Deployment triggered
- [ ] Deployment status is ✅ Success
- [ ] App accessible at Oxygen URL
- [ ] Products loading correctly

## 🆘 Still Not Working?

1. **Check deployment logs** - Look for specific error messages
2. **Verify GitHub repository** - Make sure code is there
3. **Check environment variables** - Must be set in Shopify Admin
4. **Try redeploying** - Sometimes a fresh deploy fixes issues
5. **Contact Shopify Support** - If deployment keeps failing

---

## 📚 Related Guides

- `DEBUG_PRODUCTS.md` - Fix products not showing
- `DEPLOY_TO_DOMAIN.md` - Full deployment guide
- `PUBLISH_PRODUCTS.md` - Publish products to Storefront API

