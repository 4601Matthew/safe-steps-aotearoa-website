# Critical: Cloudflare Pages Configuration

## The MIME Type Error

If you're seeing: "Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/jsx'"

This means Cloudflare Pages is serving the SOURCE files instead of the BUILT files.

## Solution

### 1. Verify Cloudflare Pages Build Settings

In your Cloudflare Pages project settings:

**CRITICAL SETTINGS:**
- **Build command:** `npm run build`
- **Build output directory:** `dist` (NOT `src` or root)
- **Root directory:** Leave empty or `/`
- **Node.js version:** 18 or higher

### 2. Check Build Logs

1. Go to Cloudflare Pages dashboard
2. Click on your project
3. Click on the latest deployment
4. Check the **Build Logs**

You should see:
```
Running npm run build
> vite build
vite v5.x.x building for production...
✓ built in X.XXs
```

If you see errors, the build failed and it's serving source files.

### 3. Verify Build Output

After `npm run build`, the `dist/index.html` should have:

**WRONG (source file):**
```html
<script type="module" src="/src/main.jsx"></script>
```

**CORRECT (built file):**
```html
<script type="module" src="/assets/index-abc123.js"></script>
```

### 4. If Build Isn't Running

If Cloudflare Pages isn't running the build:

1. **Check package.json** - Must have `"build": "vite build"` script
2. **Check Node version** - Set to 18 or higher in Cloudflare Pages settings
3. **Check build logs** - Look for errors
4. **Try manual build** - Run `npm run build` locally and check `dist` folder

### 5. Force Rebuild

1. In Cloudflare Pages, go to your project
2. Click "Retry deployment" or create a new deployment
3. Watch the build logs to ensure it completes

## Quick Test

Run locally:
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` - if it works, the build is correct. The issue is Cloudflare Pages configuration.

If it doesn't work locally, there's a build error that needs to be fixed first.

