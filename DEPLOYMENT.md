# Deployment Guide for Cloudflare Pages

This website is configured to deploy automatically to Cloudflare Pages via GitHub.

## Prerequisites

1. A GitHub account
2. A Cloudflare account
3. The repository pushed to GitHub

## Deployment Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select the `safe-steps-aotearoa-website` repository
7. Click **Begin setup**

### 3. Configure Build Settings

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave as default)

### 4. Environment Variables

No environment variables are required for this project.

### 5. Deploy

Cloudflare Pages will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Deploy to a preview URL

### 6. Custom Domain (Optional)

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Follow the instructions to add your domain

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Build Configuration

- **Build output:** `dist/` directory
- **Static assets:** Served from `public/` directory
- **Routing:** Client-side routing handled by React Router
- **SPA fallback:** Configured via `_redirects` file
- **API Functions:** Automatically deployed from `functions/` folder

## Notes

- The `_redirects` file ensures all routes are handled by the React app
- The logo is served from the `public/` directory
- All pages are statically generated at build time
- API functions in `functions/` folder deploy automatically with your site
- See `CLOUDFLARE_PAGES_FUNCTIONS_SETUP.md` for API setup instructions

