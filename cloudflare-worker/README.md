# Safe Steps Aotearoa API - Cloudflare Worker

This is the Cloudflare Workers version of the API. It provides the same functionality as the Node.js API but runs on Cloudflare's edge network.

## Quick Start

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Create KV Namespace:**
   ```bash
   wrangler kv:namespace create "USERS_KV"
   ```
   Copy the `id` from the output.

4. **Update wrangler.toml:**
   Add the KV namespace ID to `wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "USERS_KV"
   id = "your-kv-namespace-id-here"
   ```

5. **Set Secrets:**
   ```bash
   wrangler secret put JWT_SECRET
   wrangler secret put FRONTEND_URL
   wrangler secret put GOOGLE_CLIENT_ID  # Optional
   ```

6. **Install and Deploy:**
   ```bash
   npm install
   wrangler deploy
   ```

## Local Development

```bash
wrangler dev
```

This will start a local development server that mimics the Cloudflare Workers environment.

## Environment Variables (Secrets)

Set these using `wrangler secret put`:

- `JWT_SECRET` - Secret key for JWT tokens (required)
- `FRONTEND_URL` - Your frontend URL for CORS (required)
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID (optional)

## API Endpoints

Same as the Node.js API:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Login with Google
- `GET /api/auth/verify` - Verify token
- `GET /api/users/me` - Get current user
- `GET /api/admin/users` - Get all users (admin)
- `PUT /api/admin/users/:userId/roles` - Update roles (admin)

## Storage

Uses Cloudflare KV for storage. Data is stored globally and automatically replicated.

## See Also

- `CLOUDFLARE_WORKER_DEPLOYMENT.md` - Detailed deployment guide
- `../api/README.md` - Node.js API documentation

