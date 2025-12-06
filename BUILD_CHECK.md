# Build Verification Checklist

## Before Deploying

1. **Test Build Locally:**
   ```bash
   npm run build
   npm run preview
   ```
   Visit http://localhost:4173 and verify the site works

2. **Check dist folder contains:**
   - `index.html`
   - `assets/` folder with:
     - JavaScript files (main-*.js)
     - CSS files (index-*.css, page CSS files)
   - `logo.png` (in root or assets)
   - `_redirects` file (in root)

3. **Verify Cloudflare Pages Settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or higher
   - Framework preset: Vite (or None)

4. **Check Browser Console:**
   - Open deployed site
   - Press F12
   - Check Console tab for errors
   - Check Network tab for 404s

## Common Build Issues

### Issue: White screen
**Possible causes:**
- JavaScript error preventing React from rendering
- Missing _redirects file
- Incorrect build output directory
- Missing dependencies

**Solution:**
1. Check browser console for errors
2. Verify _redirects file is in dist folder
3. Check Cloudflare Pages build logs
4. Ensure all dependencies are in package.json

### Issue: 404 on routes
**Solution:**
- Verify _redirects file contains: `/*    /index.html   200`
- Ensure file is in public folder (will be copied to dist)

### Issue: Assets not loading
**Solution:**
- Check that public folder files are copied
- Verify logo.png is in public folder
- Check asset paths in browser Network tab

