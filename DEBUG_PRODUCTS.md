# 🐛 Debug: Products Not Showing

If products are published but still not showing, follow these steps:

## ✅ Step 1: Check Browser Console

1. **Open your app** in browser: `http://localhost:3000/outfit-builder`
2. **Open Developer Tools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Look for error messages** - you should see:
   - `🔗 Connecting to Shopify:` - Shows connection details
   - `📦 Fetching products from Shopify...` - Shows fetch started
   - `✅ Fetched X products` - Shows success
   - OR `❌ Error fetching products:` - Shows the actual error

## ✅ Step 2: Check Server Logs

In your terminal where `npm run dev` is running, look for:
- `🔗 Connecting to Shopify:` - Connection info
- `📦 Fetching products...` - Fetch started
- `✅ Fetched X products` - Success
- `❌ Error:` - Actual error details

## ✅ Step 3: Verify Environment Variables

### For Local Development:

Check your `.env` file has:
```env
PUBLIC_STORE_DOMAIN="u9khbc-vj.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="2f5f1ca3ce18ce93a489a862e81f3585"
PUBLIC_STOREFRONT_API_VERSION="2024-10"
SESSION_SECRET="a16c98db2b4cdee1fbbb25072116ef0d9d5fa7cd"
```

**Important:** 
- No `https://` in domain
- No trailing `/` in domain
- Token should match exactly from Shopify Admin

### For Oxygen Deployment:

In Shopify Admin → Hydrogen App → Environment Variables, verify:
- ✅ `PUBLIC_STORE_DOMAIN` = `u9khbc-vj.myshopify.com`
- ✅ `PUBLIC_STOREFRONT_API_TOKEN` = `2f5f1ca3ce18ce93a489a862e81f3585`
- ✅ `PUBLIC_STOREFRONT_API_VERSION` = `2024-10` (or `2024-01`)
- ✅ `SESSION_SECRET` = `a16c98db2b4cdee1fbbb25072116ef0d9d5fa7cd`

## ✅ Step 4: Test API Directly

Test if your Storefront API token works:

1. **Open a new terminal**
2. **Run this command** (replace with your actual token):

```bash
curl -X POST https://u9khbc-vj.myshopify.com/api/2024-10/graphql.json \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: 2f5f1ca3ce18ce93a489a862e81f3585" \
  -d '{"query": "{ products(first: 5) { edges { node { id title } } } }"}'
```

**Expected response:** Should return JSON with products or an error message.

**If you get 403:** Token doesn't have permissions
**If you get 401:** Token is invalid
**If you get products:** API works, issue is in the app

## ✅ Step 5: Verify Products Are Published

1. **Go to Shopify Admin** → Products
2. **Click on a product**
3. **Scroll to "Sales channels and apps"**
4. **Verify "Storefront API" is checked** ✅
5. **Click Save**

**Bulk publish:**
1. Go to Products list
2. Select multiple products (checkboxes)
3. Click "More actions" → "Make products available"
4. Select "Storefront API"
5. Click "Make available"

## ✅ Step 6: Check Product Status

Products must be:
- ✅ **Active** (not Draft or Archived)
- ✅ **Published** to Storefront API
- ✅ **Have inventory** (or inventory tracking disabled)

## ✅ Step 7: Common Errors & Fixes

### Error: "Missing Shopify credentials"
**Fix:** Check `.env` file exists and has correct values

### Error: "403 ACCESS_DENIED"
**Fix:** 
- Token doesn't have required scopes
- Go to Shopify Admin → Hydrogen App → Check API scopes
- Make sure these are enabled:
  - `unauthenticated_read_product_listings`
  - `unauthenticated_read_product_inventory`

### Error: "No products found"
**Fix:**
- Products not published to Storefront API (see Step 5)
- Products are Draft or Archived
- Products have no inventory

### Error: "Network error" or "Timeout"
**Fix:**
- Check internet connection
- Try again (might be temporary Shopify issue)
- Verify store domain is correct

## ✅ Step 8: Restart Everything

1. **Stop dev server:** Press `Ctrl+C` in terminal
2. **Clear cache:** Delete `.cache` folder (if exists)
3. **Restart:** Run `npm run dev`
4. **Hard refresh browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## ✅ Step 9: Check API Version

The code now defaults to `2024-10`. If you're using `2024-01`, make sure it's set in:
- `.env` file: `PUBLIC_STOREFRONT_API_VERSION="2024-01"`
- Shopify Admin environment variables: Set to `2024-01`

## 🔍 Still Not Working?

1. **Share the error message** from browser console
2. **Share the server logs** from terminal
3. **Verify:**
   - Products exist in Shopify Admin
   - Products are published to Storefront API
   - Token is correct in `.env` file
   - Dev server was restarted after changing `.env`

---

## 📝 Quick Checklist

- [ ] `.env` file exists with correct values
- [ ] Products published to Storefront API
- [ ] Products are Active (not Draft)
- [ ] Dev server restarted after `.env` changes
- [ ] Browser console checked for errors
- [ ] Server logs checked for errors
- [ ] API token has correct scopes
- [ ] Store domain is correct (no https, no trailing slash)

