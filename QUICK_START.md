# Quick Start Guide

## For Local Development

### 1. Start the API Server

```bash
cd api
npm install
npm run dev
```

The API will run on `http://localhost:3000`

### 2. Start the Frontend

In a new terminal:

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

**Note:** If you don't have a Google Client ID yet, you can leave `VITE_GOOGLE_CLIENT_ID` empty. The Google login button won't appear, but email/password registration will work.

### 4. Test Registration

1. Go to `http://localhost:5173/login`
2. Click "Sign up"
3. Fill in the form
4. Submit

If you see "Cannot connect to API server", make sure the API is running on port 3000.

## Troubleshooting

### "Cannot connect to API server"

- Make sure the API is running: `cd api && npm run dev`
- Check that `VITE_API_URL` in `.env` matches your API URL
- Check browser console for CORS errors

### Google OAuth Errors

- If you see Google OAuth errors but don't want to use Google login:
  - Leave `VITE_GOOGLE_CLIENT_ID` empty in `.env`
  - The Google button won't appear
  - Email/password registration will still work

### Registration Fails

- Check API server logs for errors
- Make sure all required fields are filled
- Password must be at least 6 characters

