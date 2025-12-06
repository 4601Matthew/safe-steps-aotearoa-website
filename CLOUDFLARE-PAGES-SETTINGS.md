# Cloudflare Pages Build Settings

## Quick Reference

Use these exact settings when configuring your project on Cloudflare Pages:

### Build Configuration

| Setting | Value |
|---------|-------|
| **Framework preset** | `None` or `Other` |
| **Build command** | `php build.php` |
| **Build output directory** | `dist` |
| **Root directory** | Leave empty (or `/`) |

### Step-by-Step Setup

1. **Connect your repository** to Cloudflare Pages
2. **Project settings:**
   - Go to your project settings
   - Navigate to "Builds & deployments"
3. **Configure build:**
   - Framework preset: Select "None" or "Other"
   - Build command: Enter `php build.php`
   - Build output directory: Enter `dist`
   - Root directory: Leave empty
4. **Save and deploy**

## Important Notes

### PHP Availability

**⚠️ Cloudflare Pages may not have PHP installed by default in their build environment.**

If the build fails with "PHP not found", you have two options:

#### Option A: Pre-build Locally (Recommended)
1. Run `php build.php` on your local machine
2. Commit the `dist/` folder to your repository
3. Set build command to: `echo "Using pre-built files"` (or leave empty)
4. Set build output directory to: `dist`

#### Option B: Use Alternative Build
If PHP isn't available, you'll need to:
- Use a Docker-based build (if supported)
- Switch to a different static site generator
- Use traditional PHP hosting instead

### Environment Variables

No environment variables are required for the build process.

## Build Process Details

The build script (`build.php`) will:

1. ✅ Process all PHP files (index.php, about.php, etc.)
2. ✅ Convert them to static HTML files
3. ✅ Copy CSS, JS, and other assets
4. ✅ Fix all links from `.php` to `.html`
5. ✅ Create `_redirects` file for URL routing
6. ✅ Output everything to the `dist/` folder

## Testing Locally

Before deploying, test the build:

```bash
# Run the build
php build.php

# Check the output
ls -la dist/

# Test locally (if you have a simple HTTP server)
cd dist
python -m http.server 8000
# or
php -S localhost:8000
```

Then visit `http://localhost:8000` to verify everything works.

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] CSS styles are applied
- [ ] JavaScript functions work (mobile menu, form validation)
- [ ] All pages are accessible
- [ ] URL redirects work (old `.php` URLs redirect to `.html`)
- [ ] Contact form displays (even if it doesn't send emails yet)

## Contact Form

**Note:** The contact form will show a success message but won't actually send emails without additional setup. To make it functional, you'll need to:

1. Create a Cloudflare Worker to handle form submissions
2. Integrate with an email service (SendGrid, Mailgun, etc.)
3. Or use a third-party form service like Formspree

See `README-DEPLOYMENT.md` for more details.

## Troubleshooting

### Build fails immediately
- **Check:** Does your repository have PHP files?
- **Solution:** Ensure `build.php` exists in the root directory

### Build fails with "command not found: php"
- **Problem:** PHP is not available in Cloudflare Pages build environment
- **Solution:** Use Option A above (pre-build locally)

### Build succeeds but site doesn't work
- **Check:** Is `dist/` folder being generated?
- **Check:** Are CSS/JS files in the `dist/` folder?
- **Solution:** Verify build output directory is set to `dist`

### Links show 404 errors
- **Check:** Does `_redirects` file exist in `dist/`?
- **Solution:** The build script should create this automatically

### Assets (CSS/JS) don't load
- **Check:** File paths in the generated HTML
- **Solution:** Ensure paths are relative (not absolute)

## Support

If you continue to have issues:
1. Check Cloudflare Pages build logs
2. Test the build locally first
3. Consider using traditional PHP hosting if Cloudflare Pages doesn't work for your needs

