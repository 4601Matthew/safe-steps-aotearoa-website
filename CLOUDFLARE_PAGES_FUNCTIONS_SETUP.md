# Cloudflare Pages Functions Setup

Your API is now set up as Cloudflare Pages Functions! This means it automatically deploys with your frontend - no separate deployment needed.

## How It Works

- The `functions/` folder contains your API
- Cloudflare Pages automatically detects and deploys these functions
- Functions are available at the same domain as your site: `https://your-site.pages.dev/api/*`
- No separate worker deployment needed!

## Setup Steps

### 1. Set Up KV Namespace (for storing users)

In Cloudflare Dashboard:

1. Go to **Workers & Pages** → **KV**
2. Click **Create a namespace**
3. Name it: `USERS_KV`
4. Click **Add**
5. **Copy the Namespace ID** (you'll need this)

### 2. Link KV to Your Pages Project

1. Go to **Workers & Pages** → **Pages**
2. Click on your **safe-steps-aotearoa-website** project
3. Go to **Settings** → **Functions**
4. Scroll to **KV Namespace Bindings**
5. Click **Add binding**
6. Set:
   - **Variable name:** `USERS_KV`
   - **KV namespace:** Select `USERS_KV` (the one you just created)
7. Click **Save**

### 3. Set Environment Variables

Still in your Pages project settings:

1. Go to **Settings** → **Environment variables**
2. Add these variables:

**For Production:**
- `JWT_SECRET` = (generate with: `openssl rand -base64 32` or any secure random string)
- `FRONTEND_URL` = `https://your-site.pages.dev` (your Pages URL)
- `GOOGLE_CLIENT_ID` = (your Google OAuth Client ID, optional)

**For Preview (optional):**
- Same variables for preview deployments

### 4. Deploy

Just push to GitHub! Cloudflare Pages will:
- Build your frontend
- Deploy your functions
- Everything works together automatically

```bash
git add .
git commit -m "Add Cloudflare Pages Functions API"
git push
```

### 5. Update Frontend API URL

The frontend is already configured to use `/api` (relative URL), which means it will automatically use your Pages Functions!

If you need to override it, in Cloudflare Pages environment variables:
- `VITE_API_URL` = `/api` (or leave it empty - it defaults to `/api`)

## Testing

After deployment, test your API:

1. Visit: `https://your-site.pages.dev/api/health`
   - Should return: `{"status":"ok","message":"Safe Steps Aotearoa API is running"}`

2. Try registering a user on your site
   - Should work automatically!

## Advantages

✅ **Automatic deployment** - Functions deploy with your frontend  
✅ **Same domain** - No CORS issues  
✅ **Free tier** - Included with Pages  
✅ **No separate deployment** - Everything in one place  
✅ **Easy to manage** - All in Cloudflare Dashboard  

## Storage Options

### Option 1: KV (Current Setup)
- Good for: Simple key-value storage
- Free tier: 100,000 reads/day, 1,000 writes/day
- Perfect for user data

### Option 2: D1 Database (Future Upgrade)
- Good for: More complex queries
- Free tier: 5GB storage, 5 million reads/month
- Can upgrade later if needed

## Troubleshooting

### Functions not working?
- Check that `functions/` folder is in your repository
- Verify KV namespace is linked in Pages settings
- Check function logs in Cloudflare Dashboard → Pages → Your project → Functions

### CORS errors?
- Make sure `FRONTEND_URL` matches your Pages URL exactly
- Functions should handle CORS automatically

### Users not saving?
- Verify KV namespace is linked correctly
- Check KV namespace exists and is accessible

## Next Steps

1. Push your code to GitHub
2. Cloudflare Pages will automatically deploy
3. Set up KV namespace and environment variables
4. Test the API!

That's it! Your API is now fully hosted on Cloudflare and deploys automatically with your frontend.

