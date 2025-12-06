# Fix for MIME Type Error

## The Problem

The error "Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/jsx'" means Cloudflare Pages is trying to serve the raw `.jsx` source file instead of the compiled JavaScript.

## The Solution

This happens when:
1. The build isn't running correctly
2. Cloudflare Pages is serving source files instead of built files
3. The `dist` folder doesn't contain the compiled files

## Steps to Fix

### 1. Verify Build Output

After running `npm run build`, check that the `dist/index.html` file has been transformed:

**Before build** (source `index.html`):
```html
<script type="module" src="/src/main.jsx"></script>
```

**After build** (in `dist/index.html`):
```html
<script type="module" src="/assets/index-abc123.js"></script>
```

The path should point to a compiled `.js` file in the `assets` folder, NOT to `/src/main.jsx`.

### 2. Check Cloudflare Pages Settings

In Cloudflare Pages dashboard:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty or as default)

### 3. Verify Build Completes Successfully

Check the Cloudflare Pages build logs. You should see:
- `npm run build` command running
- Vite building the project
- Files being written to `dist` folder
- Build completing successfully

### 4. Check dist/index.html

After building locally, open `dist/index.html` and verify:
- The script tag points to `/assets/index-[hash].js` (not `/src/main.jsx`)
- The file exists in `dist/assets/`
- All paths are correct

### 5. If Build Isn't Running

If Cloudflare Pages isn't running the build:
1. Check that `package.json` has the `build` script
2. Verify Node.js version is set (18+)
3. Check build logs for errors
4. Try rebuilding manually: `npm run build`

### 6. Manual Fix (Temporary)

If the build still isn't working, you can manually check:
1. Run `npm run build` locally
2. Check `dist/index.html` - does it have the correct script path?
3. If yes, the issue is with Cloudflare Pages serving the wrong files
4. If no, the build isn't working correctly

## Expected Build Output

After `npm run build`, your `dist` folder should contain:

```
dist/
├── index.html          (transformed, script points to assets/index-*.js)
├── assets/
│   ├── index-[hash].js (compiled JavaScript)
│   ├── index-[hash].css
│   └── (other assets)
├── logo.png
└── _redirects
```

The `index.html` in `dist` should NOT reference `/src/main.jsx` - it should reference the compiled file in `assets/`.

