# 📦 How to Publish Products to Storefront API

If you're seeing "Your store doesn't have any products yet, or they're not published to the Storefront API sales channel", follow these steps:

## ✅ Step-by-Step Guide

### Method 1: Publish Individual Products

1. **Go to Shopify Admin**
   - Visit: https://u9khbc-vj.myshopify.com/admin
   - Log in to your admin panel

2. **Navigate to Products**
   - Click on **"Products"** in the left sidebar

3. **Select a Product**
   - Click on any product you want to make available via Storefront API

4. **Scroll to Sales Channels**
   - Scroll down to the **"Sales channels and apps"** section
   - You'll see checkboxes for different sales channels

5. **Enable Storefront API**
   - ✅ Check the box next to **"Storefront API"**
   - This makes the product available to your Hydrogen app

6. **Save the Product**
   - Click **"Save"** at the top right

7. **Repeat for All Products**
   - Do this for each product you want to show in your Hydrogen app

---

### Method 2: Bulk Publish Products (Faster!)

1. **Go to Products Page**
   - In Shopify Admin, click **"Products"**

2. **Select Multiple Products**
   - Check the boxes next to the products you want to publish
   - Or click the checkbox at the top to select all products

3. **Click "Bulk actions"**
   - A dropdown menu will appear at the top

4. **Select "Make available"**
   - Choose **"Make available"** from the bulk actions menu

5. **Select "Storefront API"**
   - Check the box for **"Storefront API"**
   - Click **"Make available"**

6. **Done!**
   - All selected products are now published to Storefront API

---

## 🔍 Verify Products Are Published

After publishing, verify in your Hydrogen app:

1. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

2. **Visit your app:**
   - Go to: http://localhost:3000/outfit-builder
   - You should now see your products!

---

## ❓ Troubleshooting

### Products Still Not Showing?

1. **Check Product Status**
   - Make sure products are **Active** (not Draft or Archived)
   - Go to Products → Check product status

2. **Verify Storefront API is Enabled**
   - Go to Settings → Apps and sales channels
   - Make sure "Storefront API" sales channel exists
   - If not, it should be automatically available with Hydrogen app

3. **Check Product Visibility**
   - Products must be **published** (not draft)
   - Go to each product → Check "Product status" is "Active"

4. **Verify API Token Permissions**
   - Make sure your Storefront API token has these scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`

5. **Check Product Inventory**
   - Products with zero inventory might not show
   - Make sure products have inventory or "Track inventory" is disabled

---

## 📝 Quick Checklist

- [ ] Products are Active (not Draft)
- [ ] "Storefront API" checkbox is checked for each product
- [ ] Products have inventory (or inventory tracking is disabled)
- [ ] Storefront API token has correct permissions
- [ ] Dev server restarted after changes
- [ ] `.env` file has correct `PUBLIC_STOREFRONT_API_TOKEN`

---

## 🎯 What This Does

When you check "Storefront API" for a product:
- ✅ Product becomes available via GraphQL Storefront API
- ✅ Your Hydrogen app can fetch and display it
- ✅ Product data (title, price, images) is accessible
- ✅ Product can be added to cart via Storefront API

**Note:** This doesn't affect your regular Shopify store theme. Products can be available on both your theme AND your Hydrogen app!

---

Need help? Check `TROUBLESHOOTING.md` for more solutions!

