# Cloudflare Pages Functions

This folder contains the API functions that automatically deploy with your Cloudflare Pages site.

## Structure

```
functions/
├── api/
│   └── [[path]].js    # Handles all /api/* routes
└── lib/
    ├── handlers.js    # Request handlers
    ├── storage.js     # KV storage utilities
    └── crypto.js      # Password hashing & JWT
```

## How It Works

- Cloudflare Pages automatically detects the `functions/` folder
- Functions are deployed alongside your frontend
- Available at: `https://your-site.pages.dev/api/*`
- No separate deployment needed!

## Setup

See `CLOUDFLARE_PAGES_FUNCTIONS_SETUP.md` for complete setup instructions.

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Login with Google OAuth
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/users/me` - Get current user
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:userId/roles` - Update user roles (admin only)

## Storage

Uses Cloudflare KV for storing user data. Make sure to:
1. Create a KV namespace in Cloudflare Dashboard
2. Link it to your Pages project in Settings → Functions

