# 🚀 Quick Setup & Troubleshooting Guide

## ⚡ FASTEST WAY TO GET RUNNING (5 minutes)

### **Step 1: Install Dependencies**
```bash
# Terminal 1: Backend
cd server
npm install

# Terminal 2: Frontend  
cd client
npm install
```

### **Step 2: Start Services**
```bash
# Terminal 1: Backend (from server folder)
npm run dev
# Should show: "Server is running on http://localhost:5000"

# Terminal 2: Frontend (from client folder)
npm run dev
# Should show: "Local: http://localhost:5173"
```

### **Step 3: Access Application**
- Open browser to: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🔑 Test Credentials

### **Login with Demo Account**
- **Email:** admin@example.com
- **Password:** Admin@123
- **Role:** Admin (full access to dashboard)

### **Register New Account**
- Use any email/password
- Fill in address details during registration

---

## ⚠️ COMMON ISSUES & FIXES

### **Issue 1: "Cannot connect to MongoDB"**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Fix Option A - Use MongoDB Locally:**
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Fix Option B - Use MongoDB Atlas Cloud:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update in `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizza_delivery?retryWrites=true&w=majority
```

### **Issue 2: "Port 5000 already in use"**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Fix:**
```bash
# Change PORT in server/.env
PORT=5001

# OR kill existing process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### **Issue 3: "API_BASE is not set" / API calls failing**
**Fix:** Ensure `.env.local` exists in `client` folder:
```env
VITE_API_BASE=http://localhost:5000
```

### **Issue 4: "Module not found: @tailwindcss/vite"**
```bash
# Reinstall tailwind dependencies
cd client
npm install @tailwindcss/vite tailwindcss
```

### **Issue 5: "JWT error / Token invalid"**
```
Error: jwt malformed
```

**Fix:** Ensure `server/.env` has JWT_SECRET:
```env
JWT_SECRET=your_secret_key_here
```
*Note: Must be same secret used to create tokens*

### **Issue 6: "CORS error when calling API"**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:** Already configured in `server/server.js` with:
```javascript
app.use(cors());
```
If still failing:
- Verify backend is running
- Check VITE_API_BASE matches backend URL
- Try clearing browser cache

### **Issue 7: "Razorpay payment test fails"**
**Fix:** Use test keys in `.env`:
```env
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=test_secret_key
```
*Never use production keys in development*

---

## 🧪 TESTING THE API

### **Using Provided Postman Collection**
1. Open Postman
2. Import: `server/postman_collection.json`
3. Import Environment: `server/postman_environment.json`
4. Select environment: `Pizza Delivery Dev`
5. Test endpoints in order:
   - Health check
   - Register user
   - Login user
   - List ingredients
   - Create order
   - Verify payment

### **Manual Testing with cURL**

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**List Ingredients:**
```bash
curl http://localhost:5000/api/ingredients
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

---

## 📱 FEATURE WALKTHROUGH

### **1. Homepage**
- View featured pizzas
- See special offers
- Read testimonials
- Sign up for newsletter

### **2. Pizza Builder**
- Select pizza base (thin, thick, stuffed crust)
- Choose sauce (tomato, pesto, BBQ, white)
- Pick cheese type
- Add vegetables (optional)
- Add meat topping (optional)
- See real-time pricing
- Add to cart / Place order

### **3. My Orders**
- View all past orders
- Check order status
- See delivery tracking
- Reorder from history

### **4. Admin Dashboard**
- Manage ingredients inventory
- View all orders
- Update order status
- See low stock alerts
- Manage users

### **5. Checkout**
- Review items in cart
- Confirm delivery address
- Select payment method
- Complete Razorpay payment

---

## 🔐 SECURITY NOTES

### **Password Requirements**
- Minimum 6 characters
- Encrypted with bcrypt before storage
- Never stored in plain text

### **JWT Tokens**
- Expire after 7 days (configurable)
- Sent in Authorization header
- Verified on protected routes

### **Payment Security**
- Razorpay handles PCI compliance
- Payment verification uses signature
- Order ID linked to payment

---

## 🐛 DEBUGGING TIPS

### **Enable Detailed Logging:**
```javascript
// In server.js, add:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### **Check MongoDB Connection:**
```bash
cd server
node -e "const mongoose = require('mongoose'); const dbURI = process.env.MONGODB_URI; console.log(dbURI);"
```

### **View Browser Console:**
Press `F12` → Console tab to see:
- API request/response details
- Authentication errors
- React component errors

### **View Backend Logs:**
Watch terminal where `npm run dev` is running:
- API requests logged
- Database operations
- Error stack traces

---

## 📦 PRODUCTION CHECKLIST

Before deploying to production:

- [ ] Change JWT_SECRET to secure random string
- [ ] Update MongoDB to production database
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for your domain
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure email service properly
- [ ] Use Razorpay production keys
- [ ] Set up monitoring/logging
- [ ] Configure backup strategy

---

## 📞 GETTING HELP

### **Check These Files First:**
1. `server/.env` - Verify all environment variables
2. `client/.env.local` - Check API base URL
3. Browser console (F12) - Check for frontend errors
4. Terminal logs - Check for backend errors
5. `server/ReadMe.md` - Full API documentation

### **Common Resources:**
- Node.js: https://nodejs.org
- Express: https://expressjs.com
- React: https://react.dev
- MongoDB: https://docs.mongodb.com
- Razorpay: https://razorpay.com/docs

---

**Last Updated:** October 21, 2025
