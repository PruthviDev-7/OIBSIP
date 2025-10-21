# 🍕 PizzaHub - Complete Developer Guide

> Comprehensive guide to understand, develop, and deploy the PizzaHub pizza delivery application.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Frontend Guide](#frontend-guide)
5. [Backend Guide](#backend-guide)
6. [Database Schema](#database-schema)
7. [API Reference](#api-reference)
8. [Authentication Flow](#authentication-flow)
9. [Payment Integration](#payment-integration)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Best Practices](#best-practices)

---

## 📌 Project Overview

### What is PizzaHub?
PizzaHub is a full-stack pizza delivery web application that demonstrates modern development practices. It includes:

- **Customer Features**: Order pizzas, customize builds, track orders, make payments
- **Admin Features**: Manage inventory, view orders, analytics
- **Modern Stack**: React, Node.js, MongoDB, Tailwind CSS
- **Production Ready**: Error handling, validation, security

### Project Goals
✅ Learn full-stack development  
✅ Implement real-world features  
✅ Practice modern technologies  
✅ Build scalable architecture  
✅ Deploy to production  

---

## 🏗️ Architecture

### System Design

```
┌─────────────────┐
│   Frontend      │
│   (React 19)    │
│   Port: 5173    │
└────────┬────────┘
         │ HTTP/HTTPS
         │ Axios
         │
┌────────▼────────┐
│   Backend       │
│  (Node.js)      │
│   Port: 5000    │
└────────┬────────┘
         │ Mongoose
         │
┌────────▼────────┐
│   MongoDB       │
│   Database      │
│  Port: 27017    │
└─────────────────┘

External Services:
├── Razorpay (Payments)
├── Gmail (Emails)
└── MongoDB Atlas (Cloud DB)
```

### Technology Layers

**Presentation Layer** (Frontend)
- React components
- Tailwind CSS styling
- Client-side routing
- State management (Context API)

**Business Logic Layer** (Backend)
- Express.js routes
- Controllers for business logic
- Middleware for validation
- JWT authentication

**Data Layer** (Database)
- MongoDB collections
- Mongoose schemas
- Data validation
- Indexing for performance

---

## 🚀 Getting Started

### System Requirements
- **OS**: Windows, Mac, or Linux
- **Node.js**: v14 or higher
- **MongoDB**: Local or MongoDB Atlas
- **npm**: v6 or higher
- **Git**: For version control
- **Browser**: Chrome, Firefox, Safari, Edge

### Initial Setup (15 minutes)

**Step 1: Clone Repository**
```bash
git clone https://github.com/PruthviDev-7/OIBSIP.git
cd "Level -3/PizzaHub"
```

**Step 2: Backend Setup**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
node scripts/seedAdmin.js  # Create admin user
npm run dev
```

**Step 3: Frontend Setup**
```bash
cd ../client
npm install
echo "VITE_API_BASE=http://localhost:5000" > .env.local
npm run dev
```

**Step 4: Verify Installation**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin Account: admin@example.com / Admin@123

---

## 💻 Frontend Guide

### Project Structure Review
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API integration
│   ├── context/           # State management
│   ├── App.jsx            # Main component & routing
│   └── main.jsx           # React entry point
├── public/                # Static assets
├── vite.config.js         # Build configuration
└── package.json           # Dependencies
```

### Key Components

**App.jsx** - Main Application
- Routing setup
- Navigation bar
- Provider wrappers
- Error boundaries

**AuthContext.jsx** - State Management
- User data storage
- Token management
- Login/logout functions
- localStorage persistence

**ProtectedRoute.jsx** - Route Protection
- Check authentication
- Verify user role
- Redirect if unauthorized

### Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| HomePage | `/` | Landing page |
| Login | `/login` | User authentication |
| Register | `/register` | New user creation |
| PizzaBuilder | `/builder` | Custom pizza creation |
| Orders | `/orders` | Order history |
| AdminDashboard | `/admin` | Management panel |
| NotFound | `/*` | 404 error page |

### API Integration (services/api.js)

```javascript
// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
api.post('/auth/login', { email, password });
api.get('/orders');
api.post('/orders', orderData);
```

### Styling with Tailwind CSS

**Key Classes**
```css
/* Flexbox */
flex items-center justify-between

/* Grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Spacing */
p-4 m-2 space-x-4

/* Colors */
bg-orange-500 text-white hover:bg-orange-600

/* Responsive */
md:text-lg lg:px-8
```

### Form Handling

**Validation**
```javascript
// Client-side validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pass) => pass.length >= 6;

// Error display
{error && <div className="text-red-500">{error}</div>}
```

---

## ⚙️ Backend Guide

### Project Structure Review
```
server/
├── config/           # Configuration files
├── controllers/      # Business logic
├── models/          # Database schemas
├── routes/          # API endpoints
├── middleware/      # Request processing
├── utils/           # Helper functions
├── scripts/         # Utility scripts
└── server.js        # Main server file
```

### Server Initialization (server.js)

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env variables
dotenv.config();

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
import connectDB from './config/database.js';
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Controllers Pattern

```javascript
// controllers/authController.js

export const register = async (req, res) => {
  try {
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Create user in DB
    // 5. Generate JWT token
    // 6. Send response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Middleware Pattern

```javascript
// middleware/auth.js

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

---

## 💾 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    postalCode: String
  },
  role: String (admin/customer),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    ingredientId: ObjectId,
    quantity: Number
  }],
  deliveryAddress: String,
  totalPrice: Number,
  status: String (pending/confirmed/delivered),
  paymentId: String,
  createdAt: Date,
  deliveredAt: Date
}
```

### Ingredient Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String (base/sauce/cheese/topping),
  price: Number,
  stock: Number,
  available: Boolean,
  createdAt: Date
}
```

---

## 📡 API Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Ingredients
```
GET    /api/ingredients
GET    /api/ingredients/:id
POST   /api/ingredients (admin)
PUT    /api/ingredients/:id (admin)
DELETE /api/ingredients/:id (admin)
```

### Orders
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status (admin)
DELETE /api/orders/:id
```

### Payments
```
POST /api/payments/create
POST /api/payments/verify
GET  /api/payments/history
```

### Health Check
```
GET /api/health
```

---

## 🔐 Authentication Flow

### JWT Token Structure
```javascript
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1629800000,
  "exp": 1630400000
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

### Login Flow
```
1. User submits email/password
2. Backend validates credentials
3. Find user in database
4. Compare password hash
5. Generate JWT token
6. Send token to frontend
7. Frontend stores in localStorage
8. Subsequent requests include token in header
```

### Token Expiry
- Default: 7 days
- Configurable in .env
- User needs to login again after expiry
- Could implement refresh token mechanism

---

## 💳 Payment Integration

### Razorpay Setup
1. Create account at https://razorpay.com
2. Get API Key ID and Secret
3. Add to .env file
4. Test in sandbox mode first
5. Go live with production keys

### Payment Flow
```
1. User creates order
2. Frontend initiates Razorpay
3. User completes payment
4. Razorpay calls webhook
5. Backend verifies signature
6. Confirm order in database
7. Send confirmation email
8. Show success to user
```

### Test Credentials (Razorpay Sandbox)
- Card: 4111111111111111
- Expiry: 12/25
- CVV: 123
- OTP: 123456

---

## 🚀 Deployment

### Frontend Deployment (Netlify)

**Option 1: GitHub Integration**
```
1. Push code to GitHub
2. Login to Netlify
3. Select GitHub repository
4. Configure build settings
5. Auto-deploys on push
```

**Option 2: Manual Deploy**
```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set RAZORPAY_KEY_ID=your_key_id

# Deploy
git push heroku main
```

### Database (MongoDB Atlas)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to MONGODB_URI in .env
5. Whitelist IP addresses

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Cannot connect to MongoDB**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Start MongoDB (`mongod`) or use MongoDB Atlas

**Issue: Port already in use**
```
Error: EADDRINUSE: address already in use :::5000
```
Solution: Change PORT in .env or kill existing process

**Issue: API not responding**
- Check backend is running
- Verify VITE_API_BASE in frontend
- Check CORS settings
- Review browser console

**Issue: Authentication failing**
- Verify JWT_SECRET is set
- Check token in localStorage
- Ensure backend is running
- Review auth middleware

---

## ✅ Best Practices

### Code Quality
✅ Use meaningful variable names  
✅ Write comments for complex logic  
✅ Keep functions small and focused  
✅ DRY principle (Don't Repeat Yourself)  
✅ Consistent code formatting  

### Security
✅ Never commit secrets to git  
✅ Use environment variables  
✅ Validate all user input  
✅ Hash passwords with bcrypt  
✅ Use HTTPS in production  
✅ Implement CORS properly  

### Performance
✅ Lazy load components  
✅ Optimize images  
✅ Use database indexes  
✅ Cache API responses  
✅ Minimize bundle size  

### Testing
✅ Test API endpoints with Postman  
✅ Test forms with various inputs  
✅ Test error scenarios  
✅ Test on different devices  
✅ Test browser compatibility  

### Documentation
✅ Comment complex functions  
✅ Document API endpoints  
✅ Keep README updated  
✅ Document environment variables  
✅ Include setup instructions  

---

## 📚 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Vite](https://vitejs.dev)

### Backend
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/docs)
- [Mongoose](https://mongoosejs.com)
- [JWT](https://jwt.io)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

### Tools
- [Postman](https://www.postman.com) - API testing
- [VS Code](https://code.visualstudio.com) - Code editor
- [Git](https://git-scm.com) - Version control
- [MongoDB Compass](https://www.mongodb.com/products/compass) - DB GUI

---

## 📞 Support & Contact

### Issues
- Check existing GitHub issues
- Review troubleshooting section
- Search documentation
- Check error messages carefully

### Contributions
- Fork repository
- Create feature branch
- Make changes
- Submit pull request

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Oct 2025 | Initial release |

---

## 📄 License

ISC License - Feel free to use and modify for personal or educational purposes.

---

## 👨‍💻 Author

Developed as part of OASIS INFOBYTE Level -3 Project

---

**Happy Developing! 🚀🍕**

Last Updated: October 2025
