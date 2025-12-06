# Troubleshooting White Screen Issue

If you're seeing a white screen after deployment, follow these steps:

## 1. Check Browser Console

Open your browser's developer tools (F12) and check the Console tab for JavaScript errors. Common errors:
- Module not found
- Import errors
- React rendering errors

## 2. Verify Build Output

Make sure Cloudflare Pages is configured correctly:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18 or higher

## 3. Check _redirects File

The `public/_redirects` file should contain:
```
/*    /index.html   200
```

This ensures all routes are handled by the React app.

## 4. Verify Assets

Check that:
- Logo file exists at `public/logo.png`
- All CSS files are being imported correctly
- No 404 errors for assets in Network tab

## 5. Test Locally First

Before deploying, test the build locally:
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and verify everything works.

## 6. Common Issues

### Issue: White screen with no errors
- **Solution:** Check if `_redirects` file is in the `public` folder and being copied to `dist`

### Issue: 404 errors for routes
- **Solution:** Verify `_redirects` file is correct and Cloudflare Pages is configured to use it

### Issue: Assets not loading
- **Solution:** Check that `public` folder files are being copied during build

### Issue: React Router not working
- **Solution:** Ensure BrowserRouter is wrapping the App component

## 7. Quick Fix

Try rebuilding and redeploying:
1. Delete `node_modules` and `dist` folders
2. Run `npm install`
3. Run `npm run build`
4. Verify `dist` folder contains:
   - `index.html`
   - `assets/` folder with JS and CSS files
   - `logo.png` (or in assets)
   - `_redirects` file
5. Redeploy to Cloudflare Pages

## 8. Check Cloudflare Pages Logs

In Cloudflare Pages dashboard:
1. Go to your project
2. Click on the latest deployment
3. Check the build logs for any errors
4. Check the deployment logs

## Still Having Issues?

1. Check the browser console for specific error messages
2. Verify all dependencies are installed (`npm install`)
3. Make sure you're using Node.js 18+
4. Check that the build completes successfully

