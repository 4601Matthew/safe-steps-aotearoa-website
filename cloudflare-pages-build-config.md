# Cloudflare Pages Build Configuration

## Build Settings

When setting up your project on Cloudflare Pages, use these settings:

### Basic Settings:
- **Framework preset:** None / Other
- **Build command:** `php build.php` (or `bash build.sh` on Linux/Mac)
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty or set to root)

### Alternative Build Commands:

**If PHP is available in build environment:**
```
php build.php
```

**If using Node.js (with PHP installed via package manager):**
```bash
npm run build
```

**For Linux/Mac systems:**
```bash
bash build.sh
```

**For Windows (PowerShell):**
```powershell
php build.php
```

## Environment Variables

No environment variables are required for the build process.

## Custom Build Settings

If PHP is not available in Cloudflare Pages build environment by default, you may need to:

1. **Use a Dockerfile** (if Cloudflare Pages supports it)
2. **Pre-build locally** and commit the `dist` folder
3. **Use a different static site generator** that doesn't require PHP

## Build Process

The build script:
1. Reads all PHP files
2. Processes includes and PHP logic
3. Outputs static HTML files to `dist/` directory
4. Copies CSS, JS, and other static assets
5. Creates `_redirects` file for URL routing

## Post-Build

After deployment, all URLs will work with `.html` extension. The `_redirects` file ensures that:
- Old `.php` URLs redirect to `.html` versions
- Clean URLs (without extension) work correctly

## Troubleshooting

**Build fails with "PHP not found":**
- Check if your build environment has PHP installed
- Consider pre-building locally and committing the `dist` folder
- Use a different hosting solution that supports PHP (like shared hosting, VPS, or PHP-specific platforms)

**Assets not loading:**
- Ensure CSS and JS files are in the correct paths
- Check that file paths use relative URLs (not absolute)

## Alternative: Manual Build

If automatic builds don't work, you can:

1. Run `php build.php` locally
2. Commit the `dist` folder to your repository
3. Set build command to: `echo "Using pre-built files"`
4. Set build output directory to: `dist`

