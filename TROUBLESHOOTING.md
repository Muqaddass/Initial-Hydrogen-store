# 🔧 Troubleshooting: 403 ACCESS_DENIED Error

## Current Error
```
Error: API response error: 403
extensions: { code: "ACCESS_DENIED" }
```

This means your Storefront API token doesn't have permission to access products.

## ✅ Solution Steps

### Step 1: Check Your Token (Copy EXACTLY)

From your Shopify Admin screenshot, you have:
- **Private Token:** `shpat_dc80d598754b55e9339048e7745797a`
- **Public Token:** `bc84203979a6f217fa702720f81a73e4`

Update your `.env.local` file with the EXACT token:

```env
PUBLIC_STORE_DOMAIN="u9khbc-vj.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="shpat_dc80d598754b55e9339048e7745797a"
PUBLIC_STOREFRONT_API_VERSION="2024-01"
SESSION_SECRET="123srting123"
```

**CRITICAL:** No `https://`, no trailing `/` on the domain!

### Step 2: Verify App Permissions in Shopify Admin

1. Go to your Shopify Admin: https://u9khbc-vj.myshopify.com/admin

2. Navigate to: **Settings → Apps and sales channels → Develop apps**

3. Click on your app (the one you created)

4. Go to **Configuration** tab

5. Under **Storefront API**, click **Configure**

6. Make sure these scopes are CHECKED:
   ```
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_read_product_inventory  
   ✅ unauthenticated_read_product_tags
   ✅ unauthenticated_read_product_pickup_locations
   ✅ unauthenticated_read_checkouts
   ✅ unauthenticated_write_checkouts
   ```

7. Click **Save**

8. **IMPORTANT:** Go to **API credentials** tab and **REINSTALL** the app
   - Click the button that says "Reinstall app" or "Update"
   - This regenerates the token with new permissions

9. Copy the **NEW** token that appears

### Step 3: Publish Products to Storefront API

Your products need to be published to the Storefront API sales channel:

1. Go to **Products** in Shopify Admin

2. Click on any product

3. Scroll down to **Sales channels and apps** section

4. Make sure **"Storefront API"** is checked ✅

5. Click **Save**

6. Do this for all products you want to show

**OR** publish all at once:
1. Go to **Products** list
2. Select multiple products (checkbox)
3. Click **More actions** → **Make products available**
4. Select **Storefront API**
5. Click **Make available**

### Step 4: Update .env.local

Make sure it looks EXACTLY like this (no extra spaces or characters):

```env
PUBLIC_STORE_DOMAIN="u9khbc-vj.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="shpat_dc80d598754b55e9339048e7745797a"
PUBLIC_STOREFRONT_API_VERSION="2024-01"
SESSION_SECRET="123srting123"
```

### Step 5: Restart Dev Server

1. In terminal, press `Ctrl+C` to stop the server
2. Run: `npm run dev`
3. Wait for "Local: http://localhost:3000/" message
4. Visit: http://localhost:3000/outfit-builder
5. Refresh the page (F5 or Ctrl+R)

---

## Alternative: Use Public Token Instead

If the private token still doesn't work, try the public token:

Update `.env.local`:
```env
PUBLIC_STORE_DOMAIN="u9khbc-vj.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="bc84203979a6f217fa702720f81a73e4"
PUBLIC_STOREFRONT_API_VERSION="2024-01"
SESSION_SECRET="123srting123"
```

Then restart the server.

---

## Still Not Working?

### Check if you have products:
1. Go to Shopify Admin → Products
2. Make sure you have at least one product
3. Make sure it's published to "Storefront API"

### Verify store domain:
Your store: https://u9khbc-vj.myshopify.com/
Just use: `u9khbc-vj.myshopify.com` (no https, no slashes)

### Check API version compatibility:
The warning says Hydrogen expects API version `2024-10` but you're using `2024-01`.

Try updating to:
```env
PUBLIC_STOREFRONT_API_VERSION="2024-10"
```

---

## What Each Error Means:

### 403 ACCESS_DENIED
- Token doesn't have required scopes
- App not installed properly
- Products not published to Storefront API

### Connect Timeout
- Network issue (usually temporary)
- Try again after a few seconds

### Token Format:
- Private tokens start with: `shpat_`
- Public tokens are: 32-character hex strings

---

## Quick Checklist:

- [ ] Token copied exactly from Shopify Admin
- [ ] No `https://` in store domain
- [ ] No trailing `/` in store domain  
- [ ] App has correct scopes (see Step 2)
- [ ] App reinstalled after changing scopes
- [ ] Products published to Storefront API
- [ ] .env.local file saved
- [ ] Dev server restarted
- [ ] Page refreshed in browser

---

After following these steps, you should see products at:
**http://localhost:3000/outfit-builder** 🎉

