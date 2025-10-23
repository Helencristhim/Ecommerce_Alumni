# 🚀 Quick Start Guide - Alumni Ecommerce

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Terminal 1 - Backend
cd /Users/helenmendes/alumni-ecommerce/backend
npm install

# Terminal 2 - Frontend
cd /Users/helenmendes/alumni-ecommerce/frontend
npm install
```

### Step 2: Setup Environment Variables

**Backend** (`backend/.env`):
```bash
cd /Users/helenmendes/alumni-ecommerce/backend
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alumni-ecommerce
JWT_SECRET=my-super-secret-key-12345
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
cd /Users/helenmendes/alumni-ecommerce/frontend
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### Step 3: Start MongoDB

```bash
# If MongoDB is installed locally
mongod

# OR use MongoDB Atlas (cloud) - update MONGODB_URI in backend/.env
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd /Users/helenmendes/alumni-ecommerce/backend
npm run dev
```

✅ Backend running at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd /Users/helenmendes/alumni-ecommerce/frontend
npm start
```

✅ Frontend running at: http://localhost:3000

---

## 🧪 Testing the API

### 1. Test Health Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Alumni Ecommerce API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@alumni.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### 3. Create a Course (via MongoDB or API)

**Option A: Via MongoDB Compass or CLI:**
```javascript
db.courses.insertOne({
  title: "Basic English Course",
  slug: "basic-english-course",
  description: "Perfect for beginners",
  shortDescription: "Learn English from scratch",
  price: 299,
  originalPrice: 599,
  discount: 50,
  thumbnail: "https://via.placeholder.com/800x450",
  category: "beginner",
  level: "A1",
  duration: 30,
  lessons: [
    {
      title: "Introduction to English",
      description: "First lesson",
      vimeoId: "12345678",
      duration: 15,
      order: 1,
      isFree: true
    }
  ],
  features: [
    "30 interactive lessons",
    "Native speaker videos",
    "Lifetime access"
  ],
  whatYouWillLearn: [
    "Basic grammar",
    "Common vocabulary",
    "Simple conversations"
  ],
  instructor: {
    name: "John Smith",
    bio: "Native English teacher with 10 years experience",
    avatar: "https://via.placeholder.com/150"
  },
  isActive: true,
  isFeatured: true,
  studentsEnrolled: 0,
  rating: {
    average: 0,
    count: 0
  }
})
```

**Option B: Via API (need admin token):**

First, make your user an admin:
```javascript
// In MongoDB
db.users.updateOne(
  { email: "test@alumni.com" },
  { $set: { role: "admin" } }
)
```

Then use the API to create courses.

---

## 📝 Next Steps: Building Frontend Components

Since the backend is complete, you now need to create the React components. Here's the recommended order:

### Priority 1: Navigation & Layout
1. `src/components/Navbar.jsx` - See example in README
2. `src/components/Footer.jsx`

### Priority 2: Authentication Pages
3. `src/pages/Login.jsx`
4. `src/pages/Register.jsx`

### Priority 3: Course Display
5. `src/components/CourseCard.jsx`
6. `src/pages/Home.jsx`
7. `src/pages/Courses.jsx`
8. `src/pages/CourseDetail.jsx`

### Priority 4: Shopping & Checkout
9. `src/pages/Cart.jsx`
10. `src/pages/Checkout.jsx`

### Priority 5: Learning Platform
11. `src/pages/MyCourses.jsx`
12. `src/pages/CoursePlayer.jsx`
13. `src/components/VideoPlayer.jsx`

### Priority 6: Admin
14. `src/pages/AdminDashboard.jsx`
15. `src/pages/Profile.jsx`

---

## 🎨 Using the Alumni Theme

All CSS variables are ready in `src/index.css`:

```jsx
// Example: Button with Alumni theme
<button className="btn btn-primary">
  Enroll Now
</button>

// Example: Custom styling
<div style={{
  background: 'var(--primary-black)',
  color: 'var(--primary-gold)',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius-lg)'
}}>
  Alumni by Better
</div>
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas cloud database
```

### Port Already in Use
```bash
# Backend port 5000 in use
lsof -ti:5000 | xargs kill -9

# Frontend port 3000 in use
lsof -ti:3000 | xargs kill -9
```

### CORS Error
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default is `http://localhost:3000`

### JWT Token Error
- Make sure `JWT_SECRET` is set in backend `.env`
- Token should be sent as: `Authorization: Bearer <token>`

---

## 📦 Project Status

✅ **Completed:**
- Full backend API with all endpoints
- MongoDB models and relationships
- JWT authentication system
- Payment integration (Stripe, Mercado Pago)
- Email notification system
- React app structure and routing
- Context providers (Auth, Cart)
- API service layer
- CSS theme and utilities

⏳ **To Complete:**
- Frontend page components (listed above)
- Component styling
- Form validations
- Error handling UI
- Loading states
- Admin dashboard interface

---

## 💡 Tips

1. **Start Simple**: Build one component at a time, test it, then move to the next
2. **Use Context**: `useAuth()` and `useCart()` are available in all components
3. **API Calls**: Import from `services/api.js` - all endpoints are ready
4. **Styling**: Use the CSS variables and utility classes from `index.css`
5. **Testing**: Use Postman or curl to test backend endpoints first

---

## 🎯 Your First Component

Create `src/components/Navbar.jsx` following the example in the main README.

Then import it in `App.js` (already done) and you'll see the navigation bar!

---

**Happy Coding! 🚀**

Need help? Check the full README.md for detailed documentation.
