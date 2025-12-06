# Complete Deployment Guide

## Overview

Your application has two parts:
1. **Frontend** - React app (deployed on Cloudflare Pages)
2. **Backend API** - Node.js/Express API (deploy separately)

## Step 1: Deploy Backend API

Choose one of the deployment options from `API_DEPLOYMENT.md`:

**Recommended: Railway or Render** (easiest)

1. Deploy the API
2. Note your API URL (e.g., `https://safe-steps-api.railway.app`)

## Step 2: Update Frontend Environment Variables

In Cloudflare Pages dashboard:

1. Go to your Pages project
2. Settings → Environment variables
3. Add:
   - `VITE_API_URL` = `https://your-api-url.com/api`
   - `VITE_GOOGLE_CLIENT_ID` = Your Google OAuth Client ID
   - Remove `VITE_ENCRYPTION_KEY` (not needed with API)

## Step 3: Update Google OAuth Settings

In Google Cloud Console:

1. Go to your OAuth 2.0 Client
2. Add authorized JavaScript origins:
   - Your Cloudflare Pages URL
   - Your custom domain (if applicable)
3. Add authorized redirect URIs:
   - Your Cloudflare Pages URL
   - Your custom domain

## Step 4: Deploy Frontend

Push to GitHub - Cloudflare Pages will auto-deploy.

## Step 5: Test

1. Visit your website
2. Try registering a new user
3. Try logging in
4. Check that API calls work (open browser console → Network tab)

## Troubleshooting

### CORS Errors

- Make sure `FRONTEND_URL` in API matches your frontend domain exactly
- Check API CORS settings

### 401 Unauthorized

- Check that JWT token is being sent in requests
- Verify `JWT_SECRET` is set correctly in API

### Google Login Not Working

- Verify `GOOGLE_CLIENT_ID` is set in both frontend and API
- Check authorized origins in Google Console

## Architecture

```
Frontend (Cloudflare Pages)
    ↓ HTTPS
Backend API (Railway/Render/etc.)
    ↓
File Storage (users.json)
    (Can upgrade to database later)
```

## Next Steps

- Set up database (PostgreSQL/MongoDB) for production
- Add rate limiting
- Set up monitoring
- Add email verification
- Add password reset functionality

