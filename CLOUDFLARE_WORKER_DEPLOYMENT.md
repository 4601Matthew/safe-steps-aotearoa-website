# Deploying API to Cloudflare Workers

This guide shows you how to deploy the API as a Cloudflare Worker.

## Prerequisites

1. Cloudflare account (free tier works)
2. Wrangler CLI installed: `npm install -g wrangler`
3. Cloudflare account logged in

## Step 1: Install Wrangler

```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authorize Wrangler.

## Step 3: Set Up KV Namespace

Cloudflare Workers use KV (Key-Value) storage for data. Create a KV namespace:

```bash
wrangler kv:namespace create "USERS_KV"
```

This will output something like:
```
🌀  Creating namespace with title "safe-steps-api-USERS_KV"
✨  Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "USERS_KV", id = "abc123..." }
```

**Copy the `id` value** - you'll need it.

## Step 4: Update wrangler.toml

Edit `cloudflare-worker/wrangler.toml` and add:

```toml
[[kv_namespaces]]
binding = "USERS_KV"
id = "your-kv-namespace-id-here"
```

## Step 5: Set Environment Variables

Set secrets in Cloudflare:

```bash
cd cloudflare-worker
wrangler secret put JWT_SECRET
# When prompted, enter a secure random string (use: openssl rand -base64 32)

wrangler secret put FRONTEND_URL
# Enter your Cloudflare Pages URL, e.g., https://your-site.pages.dev

wrangler secret put GOOGLE_CLIENT_ID
# Enter your Google OAuth Client ID (optional)
```

## Step 6: Install Dependencies

```bash
cd cloudflare-worker
npm install
```

## Step 7: Deploy

```bash
wrangler deploy
```

The worker will be deployed and you'll get a URL like:
`https://safe-steps-api.your-subdomain.workers.dev`

## Step 8: Update Frontend

In your Cloudflare Pages environment variables, add:

```
VITE_API_URL=https://safe-steps-api.your-subdomain.workers.dev/api
```

## Step 9: Test

Visit: `https://safe-steps-api.your-subdomain.workers.dev/api/health`

Should return: `{"status":"ok","message":"Safe Steps Aotearoa API is running"}`

## Custom Domain (Optional)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on your worker
3. Go to Settings → Triggers
4. Add a custom domain

## Troubleshooting

### KV Namespace Not Found
- Make sure you created the KV namespace
- Check that the ID in `wrangler.toml` matches

### CORS Errors
- Verify `FRONTEND_URL` secret matches your frontend domain exactly
- Check browser console for specific CORS errors

### Authentication Not Working
- Verify `JWT_SECRET` is set
- Check worker logs in Cloudflare dashboard

## Advantages of Cloudflare Workers

- ✅ Free tier: 100,000 requests/day
- ✅ Global edge network (fast worldwide)
- ✅ No server management
- ✅ Automatic scaling
- ✅ Integrated with Cloudflare Pages
- ✅ Built-in DDoS protection

## Cost

- **Free tier:** 100,000 requests/day, 10ms CPU time per request
- **Paid:** $5/month for 10 million requests

For most use cases, the free tier is sufficient!

