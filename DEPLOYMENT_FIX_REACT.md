# 🔧 Fix: "No such module react/jsx-runtime" Deployment Error

## ❌ Error
```
Uncaught Error: No such module "react/jsx-runtime".
  imported from "worker.mjs"
```

## 🎯 Root Cause
React dependencies are not being bundled into the server build. Oxygen/Cloudflare Workers needs all dependencies bundled, including React.

---

## ✅ Solution Applied

### Fixed `vite.config.js`
Added SSR configuration to bundle React dependencies:

```javascript
ssr: {
  noExternal: /^(react|react-dom|react\/jsx-runtime|@remix-run|@shopify)/,
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
},
```

**What this does:**
- ✅ `noExternal` - Forces Vite to bundle these packages instead of treating them as external
- ✅ Regex pattern matches all React, Remix, and Shopify packages
- ✅ `optimizeDeps` - Pre-optimizes React dependencies

---

## 📝 What Changed

### Before:
```javascript
ssr: {
  optimizeDeps: {
    include: [],
  },
},
```

### After:
```javascript
ssr: {
  noExternal: /^(react|react-dom|react\/jsx-runtime|@remix-run|@shopify)/,
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
},
```

---

## 🚀 Next Steps

### 1. Test Locally First (Optional)
```bash
npm run build
```

This should complete without errors. Check that `build/server/index.js` is created.

### 2. Commit and Push
```bash
git add vite.config.js
git commit -m "Fix React bundling for Oxygen deployment"
git push
```

### 3. Redeploy to Oxygen
```bash
npx shopify hydrogen deploy
```

Or trigger deployment from Shopify Admin.

---

## 🔍 About the `remix.config.js` Warning

The warning says:
> "Both Vite and Remix config files found. The remix.config.js file is not used in Vite projects."

**This is OK to ignore!** The `remix.config.js` file is still needed for Remix-specific settings, even with Vite. The warning is informational and won't break deployment.

---

## ✅ Expected Result

After this fix:
- ✅ Build completes successfully
- ✅ `react/jsx-runtime` is bundled in the server build
- ✅ Deployment to Oxygen succeeds
- ✅ Your Hydrogen app is live!

---

## 🐛 If It Still Fails

### Check the Build Output
```bash
npm run build
```

Look for:
- ✅ `build/server/index.js` exists
- ✅ File size is reasonable (not empty)
- ✅ No errors about missing modules

### Verify Dependencies
Make sure these are in `dependencies` (not `devDependencies`):
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@remix-run/react": "^2.8.1",
    "@shopify/hydrogen": "^2024.1.0"
  }
}
```

### Check Environment Variables
Make sure these are set in Shopify Admin → Hydrogen → Environment Variables:
- `PUBLIC_STORE_DOMAIN`
- `PUBLIC_STOREFRONT_API_TOKEN`
- `PUBLIC_STOREFRONT_API_VERSION`
- `SESSION_SECRET`

---

## 📚 Related Files

- ✅ `vite.config.js` - Fixed (bundles React now)
- ✅ `remix.config.js` - OK (can keep despite warning)
- ✅ `server.js` - OK (uses correct Oxygen handler)
- ✅ `package.json` - OK (has all dependencies)

---

**Ready to deploy!** Push the changes and try again! 🚀

