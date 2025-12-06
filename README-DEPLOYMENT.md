# Deployment Guide for Cloudflare Pages

## Important Note

**Cloudflare Pages does not execute PHP server-side.** This site uses a build process to convert PHP files to static HTML files that can be served by Cloudflare Pages.

## Quick Start

### Option 1: Build Locally (Recommended)

1. **Build the static site:**
   ```bash
   php build.php
   ```

2. **Test locally:**
   - The `dist/` folder contains your static HTML files
   - You can test by opening the HTML files in a browser or using a local server

3. **Deploy to Cloudflare Pages:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect to Cloudflare Pages
   - Use these settings:
     - **Build command:** `echo "Using pre-built files"` (or leave empty)
     - **Build output directory:** `dist`
     - **Root directory:** `/`

### Option 2: Build on Cloudflare Pages

If Cloudflare Pages supports PHP in their build environment:

1. **Connect your repository** to Cloudflare Pages
2. **Configure build settings:**
   - **Build command:** `php build.php`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
3. **Deploy**

## Build Settings Summary

| Setting | Value |
|---------|-------|
| Framework preset | None / Other |
| Build command | `php build.php` (or empty if pre-building) |
| Build output directory | `dist` |
| Root directory | `/` (empty) |

## Contact Form Handling

**Important:** The contact form will need special handling since PHP won't execute on Cloudflare Pages.

### Options:

1. **Use Cloudflare Workers** (Recommended)
   - Create a Worker function to handle form submissions
   - Send emails via an email service API

2. **Use a third-party service:**
   - Formspree
   - Netlify Forms (won't work on Cloudflare, but similar services exist)
   - EmailJS (client-side only)

3. **Use Cloudflare Email Routing + Workers:**
   - Set up email routing
   - Use Workers to process form submissions

For now, the form shows a success message but won't actually send emails without additional configuration.

## Testing the Build

After running `php build.php`:

1. Check that `dist/` folder contains:
   - `index.html`
   - `about.html`
   - `services.html`
   - `how-it-works.html`
   - `get-involved.html`
   - `contact.html`
   - `css/` folder with styles
   - `js/` folder with scripts
   - `_redirects` file

2. Open `dist/index.html` in a browser to test

3. Verify all links work correctly

## URL Structure

After deployment:
- `/` → `index.html`
- `/about` → `about.html` (via redirects)
- `/about.php` → `about.html` (301 redirect)
- `/contact` → `contact.html` (via redirects)

The `_redirects` file handles URL routing on Cloudflare Pages.

## Troubleshooting

### Build fails
- Ensure PHP is installed and accessible
- Check file permissions
- Try building locally first

### Links don't work
- Ensure `_redirects` file is in the `dist/` folder
- Check that links use `.html` extension (build script converts them)

### Assets not loading
- Verify CSS and JS files are copied to `dist/`
- Check that paths are relative (not absolute)

### Contact form not working
- See "Contact Form Handling" section above
- You'll need to implement serverless form handling

## Alternative Hosting Options

If Cloudflare Pages doesn't work for you, consider:

1. **Traditional PHP hosting** (shared hosting, VPS)
   - Can run PHP directly
   - No build step needed
   - Contact form will work with PHP mail

2. **Platforms that support PHP:**
   - Heroku (with PHP buildpack)
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk
   - Google Cloud App Engine

3. **Convert to a static site generator:**
   - Jekyll
   - Hugo
   - 11ty (Eleventy)

