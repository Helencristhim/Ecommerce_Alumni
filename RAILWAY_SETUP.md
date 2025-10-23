# 🚂 Railway Deployment Setup

Your backend is failing on Railway because it needs configuration. Follow these steps:

## Step 1: Configure Railway Project Settings

In your Railway dashboard (the screen you're on):

1. Click on the **"Ecommerce_Alumni"** project
2. Click on **"Settings"** (or the gear icon)
3. Set these configurations:

### Build Settings:
- **Root Directory:** Leave empty OR set to `/` (Railway will use railway.json)
- **Build Command:** (automatically detected from railway.json)
- **Start Command:** (automatically detected from railway.json)

## Step 2: Add Environment Variables

Click on **"Variables"** tab in Railway, then add these:

```
PORT=5000
NODE_ENV=production

# MongoDB - You need MongoDB Atlas (see Step 3)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-ecommerce

# JWT Secret - Generate a random string
JWT_SECRET=your-super-secret-random-key-min-32-characters
JWT_EXPIRE=7d

# Stripe (Get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key

# Mercado Pago (Get from https://www.mercadopago.com.br/developers)
MERCADO_PAGO_ACCESS_TOKEN=your_mercado_pago_access_token

# Email (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=Alumni by Better <noreply@alumni.org.br>

# Frontend URL (Your Vercel URL)
FRONTEND_URL=https://frontend-iiz0p55l5-helen-mendes-projects.vercel.app
```

## Step 3: Set Up MongoDB Atlas (FREE)

You need a database! MongoDB Atlas is free:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a FREE cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Paste it in Railway as `MONGODB_URI`

**Example:**
```
mongodb+srv://helenmendes:YourPassword123@cluster0.abc123.mongodb.net/alumni-ecommerce?retryWrites=true&w=majority
```

## Step 4: Generate JWT Secret

Run this in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and use it as `JWT_SECRET` in Railway.

## Step 5: Redeploy

After adding ALL environment variables:

1. In Railway, click **"Deploy"** or **"Redeploy"**
2. Wait 2-3 minutes
3. Railway will give you a URL like: `https://your-project.up.railway.app`

## Step 6: Update Frontend Environment

Once Railway gives you the API URL, you need to update Vercel:

1. Go to Vercel dashboard
2. Select your "frontend" project
3. Go to "Settings" → "Environment Variables"
4. Update `REACT_APP_API_URL` to your Railway URL:
   ```
   REACT_APP_API_URL=https://your-project.up.railway.app/api
   ```
5. Redeploy frontend

## ⚠️ Important Notes:

**Required for Backend to Work:**
- ✅ MongoDB Atlas connection string
- ✅ JWT_SECRET (at least 32 characters)
- ✅ All environment variables set

**Optional (can add later):**
- Stripe keys (for payments)
- Mercado Pago keys (for Brazilian payments)
- Email settings (for notifications)

## 🚀 Quick Start Checklist:

- [ ] Set up MongoDB Atlas (5 minutes)
- [ ] Add `MONGODB_URI` to Railway
- [ ] Generate and add `JWT_SECRET` to Railway
- [ ] Add `FRONTEND_URL` (your Vercel URL)
- [ ] Add `PORT=5000` and `NODE_ENV=production`
- [ ] Click "Deploy" in Railway
- [ ] Wait for deployment to succeed
- [ ] Copy Railway URL
- [ ] Update Vercel with Railway API URL
- [ ] Redeploy frontend on Vercel

## 📞 If You Need Help:

Common issues:
- **"Cannot connect to MongoDB"** → Check MONGODB_URI is correct
- **"JWT error"** → Make sure JWT_SECRET is set and at least 32 characters
- **"Port already in use"** → Railway handles this automatically
- **"Module not found"** → Make sure railway.json is in the root directory

---

**Once configured, your backend will be live and the frontend will be fully functional!**
