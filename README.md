# ShopNest

ShopNest is a full-stack online store with a React storefront and an Express, MongoDB backend. Customers can browse and search products, manage a cart, place test orders, and view their order history. Admins can manage products, orders, and users.

## Tech stack

- Frontend: React, React Router, Redux Toolkit
- Backend: Node.js, Express, MongoDB, Mongoose
- Payments: Razorpay test integration
- Product images: Cloudinary

## Getting started

1. Install the root dependencies and both app dependencies:

   ```bash
   npm install
   npm run install
   ```

2. Copy `backend/.env.example` to `backend/.env` and fill in the values for MongoDB, JWT, email, Cloudinary, and Razorpay as needed.
3. Start the backend and frontend together:

   ```bash
   npm run dev
   ```

The React app runs on port 3000 and proxies API requests to the backend on port 5000.

## Optional sample data

With a working MongoDB connection configured, run the seed script from the `backend` directory:

```bash
npm run seed
```

This creates sample catalog items and demo records.

## Deploying to Render

Deploy the backend as a **Web Service** with `backend` as its root directory, `npm install` as the build command, and `npm start` as the start command. Add the backend variables from `backend/.env.example` in the service's Environment settings. Render provides `PORT` automatically.

Deploy the frontend as a **Static Site** with `frontend` as its root directory, `npm install && npm run build` as the build command, and `build` as the publish directory. Set `REACT_APP_API_URL` to the backend service's public URL, for example `https://shopnest-api.onrender.com`. This value is embedded during the frontend build and is public, so do not put secrets in it.

Because the frontend uses React Router, add a Static Site rewrite from `/*` to `/index.html` in Render's Redirects/Rewrites settings.
