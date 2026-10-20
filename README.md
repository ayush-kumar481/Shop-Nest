<div align="center">
  <img src="./frontend/public/ShopNestLogo.png" alt="ShopNest Logo" width="80" />
  <h1>ShopNest - Full-Stack MERN E-Commerce App</h1>
  <p>A professionally engineered, full-stack E-commerce platform built strictly using modern standard React (CRA) on the frontend and Express/MongoDB on the backend.</p>
</div>

---

## 🛠 Tech Stack Details

- **Frontend:** Pure React.js (`react-scripts`), Redux Toolkit (for Cart state management), AuthContext API (for JWT user sessions).
- **Backend:** Node.js, Express.js architecture mapped with middleware-based routing.
- **Database:** MongoDB (via Mongoose schemas).
- **Features:** Unified Admin Dashboard, Direct Cloudinary Content Maps, Personal User Profiles matching mapped Order Histories.
- **Payments:** Razorpay fully implemented (utilize your test metrics or placeholder).
- **Cloud Storage:** Cloudinary integration for Product image uploading securely via Multer.

---

## 🚀 Quick Start / Local Development Guide

The workspace is configured beautifully using a monorepo-friendly setup with `concurrently`, enabling you to start everything from the very root folder.

### 1️⃣ Dependencies & Environments
Make sure you have MongoDB running locally, or map it to a remote database string.

Inside the `backend/` folder, ensure your `.env` looks like this:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shopnest
JWT_SECRET=super_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

From the **root folder** `ShopNest/`, install dependencies for the backend and frontend:
```bash
npm run install
```

### 2️⃣ Populate the Database (Seeding)
Test the platform rapidly featuring beautiful dummy products (Unsplash) and automatic `Admin` role provisioning:
```bash
cd backend
npm run seed
```
> **Seed Admin Access:** Email: `admin@shopnest.com` | Password: `password123`

### 3️⃣ Start the development servers
Run both apps from the root folder:
```bash
npm run dev
```

The seed script creates a demo admin (`admin@shopnest.com`) and customer (`demo@shopnest.com`) with the password `password123`. These credentials are for local demos only; do not use them for a public production database.

## ☁️ Deploy the Monolithic App on Render

Create one **Web Service** for this repository. Express serves both the API and the production React build from the same Render service.

- **Root directory:** leave blank (repository root)
- **Build command:** `npm run render-build`
- **Start command:** `npm start`
- **Environment:** set `NODE_ENV=production` and add the required backend values from [`backend/.env.example`](backend/.env.example). Render supplies `PORT` automatically.

Keep `REACT_APP_API_URL` unset for this setup so the frontend calls the API on the same origin. If you change it, rebuild the frontend after updating it. The variable is public and must not contain secrets.
