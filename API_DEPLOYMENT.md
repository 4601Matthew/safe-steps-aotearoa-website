# API Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   cd api
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

## Deployment Options

### Option 1: Railway (Recommended - Easy)

1. Go to [railway.app](https://railway.app)
2. Create account and new project
3. Connect GitHub repository
4. Add new service → Deploy from GitHub repo
5. Select the `api` folder
6. Add environment variables:
   - `JWT_SECRET` (generate: `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID`
   - `FRONTEND_URL` (your Cloudflare Pages URL)
   - `PORT` (Railway sets this automatically)
7. Deploy!

### Option 2: Render

1. Go to [render.com](https://render.com)
2. Create account
3. New → Web Service
4. Connect GitHub repository
5. Settings:
   - **Root Directory:** `api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables (same as Railway)
7. Deploy!

### Option 3: Fly.io

1. Install Fly CLI: `npm install -g @fly/cli`
2. Login: `fly auth login`
3. In `api` folder: `fly launch`
4. Set environment variables: `fly secrets set JWT_SECRET=...`
5. Deploy: `fly deploy`

### Option 4: VPS (DigitalOcean, Linode, etc.)

1. Set up Node.js on server
2. Clone repository
3. Install PM2: `npm install -g pm2`
4. Set environment variables
5. Start with PM2: `pm2 start server.js --name safe-steps-api`
6. Set up nginx reverse proxy
7. Configure SSL with Let's Encrypt

## Update Frontend

After deploying the API, update your frontend:

1. Add to `.env` (or Cloudflare Pages environment variables):
   ```
   VITE_API_URL=https://your-api-url.com/api
   ```

2. The frontend will automatically use this URL for all API calls.

## Testing

Test the API is working:

```bash
curl https://your-api-url.com/api/health
```

Should return: `{"status":"ok","message":"Safe Steps Aotearoa API is running"}`

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `FRONTEND_URL` to your actual frontend domain
- [ ] Use HTTPS in production
- [ ] Enable CORS only for your frontend domain
- [ ] Consider adding rate limiting
- [ ] Set up monitoring/logging

