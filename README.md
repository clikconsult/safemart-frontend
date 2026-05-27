# Safemart Frontend

Electronic Security Store frontend built with React and Vite.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL` to your backend base URL.
3. Install dependencies with `npm install`.
4. Start the dev server with `npm run dev`.

## Auth Notes

- The frontend uses HttpOnly cookies for authentication.
- Requests are sent with `withCredentials: true`.
- If the API returns `401` on a protected page, the app redirects to `/login` and preserves the original destination.

## Deployment

- Vercel SPA rewrites are defined in [vercel.json](/abs/path/c:/Users/USER/OneDrive/Documents/Safemart/safemart-frontend/vercel.json).
- See [DEPLOYMENT.md](/abs/path/c:/Users/USER/OneDrive/Documents/Safemart/DEPLOYMENT.md) for the full production checklist.
