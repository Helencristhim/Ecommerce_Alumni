# Alumni by Better - English Course Ecommerce Platform

A full-stack ecommerce platform for selling and delivering English courses online, built with React and Node.js.

## 🎯 Project Overview

**Tech Stack:**
- **Frontend:** React 18, React Router, Axios, Stripe/Mercado Pago
- **Backend:** Node.js, Express, MongoDB, JWT Authentication
- **Payments:** Stripe, PayPal, Mercado Pago, PIX
- **Video Hosting:** Vimeo Pro/Business
- **Design:** Alumni Black Friday theme (Black, Gold, Red)

**Key Features:**
✅ User authentication and authorization
✅ Course catalog and detailed course pages
✅ Shopping cart functionality
✅ Multiple payment gateways
✅ Integrated course player with Vimeo
✅ Progress tracking for students
✅ Admin dashboard for course management
✅ Email notifications
✅ Responsive design

---

## 📁 Project Structure

```
alumni-ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   ├── orderController.js
│   │   │   └── paymentController.js
│   │   ├── middleware/       # Custom middleware
│   │   │   └── auth.js       # JWT authentication
│   │   ├── models/           # MongoDB models
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Order.js
│   │   │   └── Progress.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.js
│   │   │   ├── courses.js
│   │   │   ├── orders.js
│   │   │   ├── payments.js
│   │   │   └── users.js
│   │   ├── utils/            # Utility functions
│   │   │   └── emailService.js
│   │   └── server.js         # Express server
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── context/          # React Context
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   │   └── api.js
    │   ├── utils/            # Utility functions
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Stripe account (for payments)
- Mercado Pago account (for Brazilian payments)
- Vimeo Pro/Business account (for video hosting)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd /Users/helenmendes/alumni-ecommerce/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/alumni-ecommerce
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   STRIPE_SECRET_KEY=sk_test_your_key
   MERCADO_PAGO_ACCESS_TOKEN=your_token
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the backend server:**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd /Users/helenmendes/alumni-ecommerce/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_key
   REACT_APP_MERCADO_PAGO_PUBLIC_KEY=your_public_key
   ```

5. **Run the frontend:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

---

## 📚 API Documentation

### Authentication Endpoints

**Register:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Login:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User:**
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Course Endpoints

**Get All Courses:**
```http
GET /api/courses?category=beginner&level=A1&search=business
```

**Get Single Course:**
```http
GET /api/courses/:id
```

**Get Course by Slug:**
```http
GET /api/courses/slug/:slug
```

**Create Course (Admin):**
```http
POST /api/courses
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Business English Mastery",
  "description": "Complete business English course",
  "price": 299,
  "discount": 50,
  "category": "business",
  "level": "B2",
  "duration": 40,
  "lessons": [...],
  "features": [...],
  "whatYouWillLearn": [...]
}
```

### Order Endpoints

**Create Order:**
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "courseId": "course_id_here" }
  ],
  "paymentMethod": "stripe",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

**Get My Orders:**
```http
GET /api/orders/my-orders
Authorization: Bearer {token}
```

### Payment Endpoints

**Create Stripe Payment Intent:**
```http
POST /api/payments/stripe/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order_id_here"
}
```

**Create Mercado Pago Preference:**
```http
POST /api/payments/mercadopago/create-preference
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order_id_here"
}
```

---

## 🎨 Building the Frontend Components

The frontend architecture has been set up with routing, context, and API services. You need to create the following page and component files:

### Components to Create

1. **`src/components/Navbar.jsx`** - Navigation bar with cart icon
2. **`src/components/Footer.jsx`** - Site footer
3. **`src/components/PrivateRoute.jsx`** - Protected route wrapper
4. **`src/components/CourseCard.jsx`** - Course display card
5. **`src/components/VideoPlayer.jsx`** - Vimeo player component

### Pages to Create

1. **`src/pages/Home.jsx`** - Homepage with featured courses
2. **`src/pages/Courses.jsx`** - Course catalog with filtering
3. **`src/pages/CourseDetail.jsx`** - Detailed course information
4. **`src/pages/Login.jsx`** - Login form
5. **`src/pages/Register.jsx`** - Registration form
6. **`src/pages/Cart.jsx`** - Shopping cart
7. **`src/pages/Checkout.jsx`** - Checkout with payment integration
8. **`src/pages/MyCourses.jsx`** - Student's enrolled courses
9. **`src/pages/CoursePlayer.jsx`** - Video player with progress tracking
10. **`src/pages/Profile.jsx`** - User profile management
11. **`src/pages/AdminDashboard.jsx`** - Admin panel

### Example Component (Navbar):

```jsx
// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-alumni">alumni</span>{' '}
          <span className="logo-better">by better</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/courses">Courses</Link></li>

          {isAuthenticated ? (
            <>
              <li><Link to="/my-courses">My Courses</Link></li>
              <li><Link to="/profile">{user?.name}</Link></li>
              {user?.role === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          <li>
            <Link to="/cart" className="cart-link">
              Cart ({getTotalItems()})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

## 💳 Payment Integration Guide

### Stripe Integration

1. Install Stripe libraries (already in package.json)
2. In checkout page:
```jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Wrap checkout form with Elements provider
<Elements stripe={stripePromise}>
  <CheckoutForm />
</Elements>
```

### Mercado Pago Integration

For Brazilian market, use Mercado Pago preference:
```jsx
const handleMercadoPago = async () => {
  const { data } = await paymentsAPI.createMercadoPagoPreference(orderId);
  window.location.href = data.initPoint; // Redirect to Mercado Pago
};
```

---

## 🎥 Video Player Integration

Use `react-player` for Vimeo integration:

```jsx
import ReactPlayer from 'react-player/vimeo';

<ReactPlayer
  url={`https://vimeo.com/${lesson.vimeoId}`}
  controls
  width="100%"
  height="500px"
  onEnded={() => markLessonComplete(lesson._id)}
/>
```

---

## 👨‍💼 Creating an Admin User

To create an admin user, you can either:

1. **Manually in MongoDB:**
   ```javascript
   db.users.updateOne(
     { email: "admin@alumni.org.br" },
     { $set: { role: "admin" } }
   )
   ```

2. **Through registration and database update**

---

## 📧 Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use in `.env` as `EMAIL_PASSWORD`

For other providers, adjust `EMAIL_SERVICE` in `.env`

---

## 🔄 Next Steps

1. ✅ **Backend is complete** - All API endpoints are ready
2. ⏳ **Create frontend components** - Use the examples above
3. ⏳ **Style with Alumni theme** - Use the CSS variables in `index.css`
4. ⏳ **Test payment flows** - Use Stripe/Mercado Pago test keys
5. ⏳ **Add course content** - Upload videos to Vimeo, create courses via API
6. ⏳ **Deploy** - Consider Vercel (frontend) + Railway/Heroku (backend)

---

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)

1. Create account on Railway or Heroku
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Create account on Vercel
2. Import repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in production `.env`

---

## 📞 Support

For questions or issues:
- Check the API documentation above
- Review the code structure
- Test endpoints with Postman
- Check browser console for errors

---

## 📄 License

This project is proprietary to Alumni by Better.

---

**Built with ❤️ for Alumni by Better**
