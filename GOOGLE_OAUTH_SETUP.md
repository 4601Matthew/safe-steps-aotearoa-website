# Google OAuth Setup Guide

To enable Google login on your website, you need to set up Google OAuth credentials.

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity Services"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" (unless you have a Google Workspace)
   - Fill in the required information:
     - App name: "Safe Steps Aotearoa"
     - User support email: Your email
     - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email) if in testing mode
   - Save and continue

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Safe Steps Aotearoa Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://your-domain.pages.dev` (your Cloudflare Pages URL)
     - `https://yourdomain.com` (your custom domain if you have one)
   - Authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - `https://your-domain.pages.dev` (your Cloudflare Pages URL)
     - `https://yourdomain.com` (your custom domain)
   - Click "Create"

5. Copy your **Client ID** (you'll need this)

## Step 3: Add Client ID to Your Project

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Google Client ID:

```
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
VITE_ENCRYPTION_KEY=your-secure-encryption-key-here
```

**Important:** 
- Never commit the `.env` file to Git
- Add `.env` to your `.gitignore` file
- For Cloudflare Pages, add the environment variable in the dashboard:
  - Go to your Pages project
  - Settings > Environment variables
  - Add `VITE_GOOGLE_CLIENT_ID` with your client ID
  - Add `VITE_ENCRYPTION_KEY` with a secure random string

## Step 4: Update .gitignore

Make sure your `.gitignore` includes:

```
.env
.env.local
.env.*.local
```

## Step 5: Test

1. Restart your development server
2. Try logging in with Google
3. The Google login button should appear and work

## Security Notes

- The encryption key should be a long, random string (at least 32 characters)
- In production, use environment variables, never hardcode secrets
- For production, consider using a backend to verify Google tokens instead of doing it client-side
- The current implementation stores user data in localStorage (encrypted). For production, consider a proper database

## Troubleshooting

- **"Invalid client" error**: Check that your Client ID is correct and the authorized origins match your domain
- **"Redirect URI mismatch"**: Make sure the redirect URI in Google Console matches exactly (including http/https and trailing slashes)
- **Button doesn't appear**: Check that `VITE_GOOGLE_CLIENT_ID` is set correctly

