# Safe Steps Aotearoa API

Backend API for Safe Steps Aotearoa authentication and user management.

## Features

- ✅ User registration and login
- ✅ Google OAuth authentication
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Admin panel for user management
- ✅ Secure file-based storage (can be upgraded to database)

## Setup

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Edit `.env`:
- `JWT_SECRET`: Generate a secure random string (use `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `FRONTEND_URL`: Your frontend URL (for CORS)

### 3. Run the API

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

The API will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Login with Google OAuth
- `GET /api/auth/verify` - Verify JWT token

### Users

- `GET /api/users/me` - Get current user profile (requires auth)

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:userId/roles` - Update user roles (admin only)

## Deployment Options

### Option 1: Cloudflare Workers (Recommended for Cloudflare Pages)

See `DEPLOYMENT_CLOUDFLARE.md` for Cloudflare Workers setup.

### Option 2: Railway / Render / Heroku

1. Create account on Railway/Render/Heroku
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Option 3: VPS / Server

1. Set up Node.js on your server
2. Clone repository
3. Install dependencies
4. Set up PM2 or similar process manager
5. Configure reverse proxy (nginx)

## Security Notes

- **JWT_SECRET**: Must be a strong, random string in production
- **CORS**: Configure `FRONTEND_URL` to match your frontend domain
- **HTTPS**: Always use HTTPS in production
- **Rate Limiting**: Consider adding rate limiting for production
- **Database**: For production, consider upgrading to PostgreSQL/MongoDB

## Upgrading to Database

To upgrade from file-based storage to a database:

1. Install database driver (e.g., `pg` for PostgreSQL)
2. Update `api/utils/database.js` to use database queries
3. Run database migrations
4. Update environment variables

