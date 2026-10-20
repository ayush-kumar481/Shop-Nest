<div align="center">
  <img src="frontend/public/ShopNestLogo.png" alt="ShopNest logo" width="80" />
  <h1>ShopNest · Full-Stack E-Commerce</h1>
  <p>A full-stack online store with a React storefront, an Express API, and MongoDB.</p>
</div>

---

## ✨ Features

- Browse and search the product catalog
- Add products to a persistent shopping cart and place orders
- Customer accounts, profiles, and order history
- Admin tools for products, orders, users, and store metrics
- Cloudinary product image uploads
- Razorpay checkout integration when payment credentials are configured

## 🛠 Tech Stack

- **Frontend:** React (Create React App), React Router, Redux Toolkit
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Images:** Cloudinary
- **Payments:** Razorpay

## 🚀 Local Development

### Requirements

- Node.js and npm
- A MongoDB database (local or hosted)

### Install and configure

From the project root, install dependencies:

```bash
npm install
```

The root install script installs the backend and frontend dependencies as well. Copy `backend/.env.example` to `backend/.env`, then set the credentials you need:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | Secret used to sign login tokens (required) |
| `EMAIL_USER`, `EMAIL_PASS` | Gmail credentials for registration email |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Product image uploads |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay payments |
| `PORT` | Backend port; defaults to `5000` locally |

Start both apps from the project root:

```bash
npm run dev
```

The React development server runs on port `3000` and proxies `/api` requests to the backend on port `5000`. To create a production frontend build locally, run:

```bash
npm run build
```

### Optional demo data

With a working `MONGO_URI`, seed sample products, demo accounts, and orders:

```bash
cd backend
npm run seed
```

The seed script creates a demo admin (`admin@shopnest.com`) and customer (`demo@shopnest.com`) with the password `password123`. These credentials are for local demos only; do not use them for a public production database.

## ☁️ Deploy on Render

Deploy the backend and frontend as separate Render services.

### Backend Web Service

- **Root directory:** `backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- Add the backend credentials from [`backend/.env.example`](backend/.env.example) in the service's Environment settings. Render supplies `PORT` automatically.

### Frontend Static Site

- **Root directory:** `frontend`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `build`
- **Environment variable:** `REACT_APP_API_URL` set to the backend service's public URL, such as `https://your-backend.onrender.com`

The frontend setting is embedded during the build and is public, so never put secrets in it. The example is in [`frontend/.env.example`](frontend/.env.example). After adding or changing this value in Render, trigger a new frontend deploy.

For React Router page refreshes, add a Static Site rewrite from `/*` to `/index.html` in Render's Redirects/Rewrites settings.
