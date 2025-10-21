# 🚀 PizzaHub Backend - Node.js/Express Server

> Robust Node.js backend for PizzaHub pizza delivery application with MongoDB integration, JWT authentication, and payment processing.

## 📋 Overview

The backend is a RESTful API built with Express.js that handles all business logic for the pizza delivery application. It manages user authentication, ingredient inventory, order processing, payment verification, and email notifications.

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration**: Secure account creation with validation
- **Login System**: JWT-based authentication
- **Password Security**: bcrypt hashing (10 salt rounds)
- **Token Management**: JWT with configurable expiry
- **Role-based Access**: Admin vs Customer permissions
- **Protected Routes**: Middleware for auth verification
- **Session Management**: Token refresh capability

### 🍕 Ingredient Management
- **CRUD Operations**: Create, Read, Update, Delete
- **Stock Tracking**: Real-time inventory levels
- **Price Management**: Flexible pricing system
- **Category Organization**: Organize by type (base, sauce, etc.)
- **Availability Status**: Active/inactive items
- **Stock Alerts**: Notification for low inventory
- **Bulk Operations**: Mass update capabilities

### 📦 Order Processing
- **Order Creation**: Validate and save orders
- **Status Tracking**: Pending → Confirmed → Delivered
- **Order History**: Complete user order records
- **Order Cancellation**: With refund support
- **Order Details**: Itemized breakdown
- **Customer Info**: Address and delivery details
- **Timestamps**: Created and delivered dates

### 💳 Payment Processing
- **Razorpay Integration**: Secure payment gateway
- **Payment Orders**: Create payment sessions
- **Payment Verification**: Verify transaction success
- **Multiple Methods**: Cards, UPI, Wallets, Net Banking
- **Order Confirmation**: Auto-confirm on payment success
- **Refund Processing**: Handle refund requests
- **Payment History**: Transaction records
- **Security**: Server-side verification

### 📧 Email Notifications
- **Registration Confirmation**: Welcome emails
- **Order Confirmation**: Order placed notification
- **Status Updates**: Order status changes
- **Delivery Confirmation**: Order delivered email
- **Payment Receipt**: Transaction confirmation
- **Promotional Emails**: Offers and updates
- **Error Notifications**: System alerts

### 📊 Analytics
- **Order Statistics**: Total orders, revenue
- **User Metrics**: Registration trends
- **Popular Items**: Most ordered pizzas
- **Performance Data**: Response times, errors

---

## 🛠️ Technologies Used

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| express | 5.1.0 | Web framework |
| mongodb | Latest | Database |
| mongoose | 8.19.1 | ODM library |
| jsonwebtoken | 9.0.2 | JWT authentication |
| bcryptjs | 3.0.2 | Password hashing |
| dotenv | 17.2.3 | Environment variables |
| cors | 2.8.5 | Cross-origin requests |
| express-validator | 7.2.1 | Input validation |
| multer | 2.0.2 | File upload handling |
| nodemailer | 7.0.9 | Email service |
| razorpay | 2.9.6 | Payment gateway |

### Dev Dependencies
| Package | Purpose |
|---------|---------|
| nodemon | Auto-restart on changes |

---

## 📁 Project Structure

```
server/
├── config/
│   └── database.js                 # MongoDB connection
│
├── controllers/
│   ├── authController.js           # Login/Register logic
│   ├── ingredientController.js     # Ingredient operations
│   ├── orderController.js          # Order processing
│   └── paymentController.js        # Payment handling
│
├── middleware/
│   ├── auth.js                     # JWT verification
│   └── validators.js               # Input validation rules
│
├── models/
│   ├── User.js                     # User schema
│   ├── Order.js                    # Order schema
│   ├── Ingredient.js               # Ingredient schema
│   └── index.js                    # Model exports
│
├── routes/
│   ├── authRoutes.js               # Auth endpoints
│   ├── ingredientRoutes.js         # Ingredient endpoints
│   ├── orderRoutes.js              # Order endpoints
│   └── paymentRoutes.js            # Payment endpoints
│
├── utils/
│   ├── email.js                    # Email sending
│   └── stockNotifier.js            # Inventory alerts
│
├── scripts/
│   ├── seedAdmin.js                # Create admin user
│   ├── apiTest.js                  # API testing
│   └── fullTest.js                 # Complete workflow test
│
├── server.js                       # Main server file
├── package.json                    # Dependencies
├── .env                            # Environment variables
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── postman_collection.json         # API testing
├── README_POSTMAN.md               # Postman guide
└── README.md                       # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Razorpay account (for payments)

### Installation

**1. Navigate to server folder:**
```bash
cd server
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
```bash
cp .env.example .env
```

**4. Edit `.env` with your configuration:**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pizza_delivery

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**5. Seed admin user:**
```bash
node scripts/seedAdmin.js
```

**6. Start development server:**
```bash
npm run dev
```

**7. Server should be running:**
```
Server is running on http://localhost:5000
```

---

## 📦 Available Scripts

### `npm start`
Runs production server (no hot reload).
```bash
npm start
```

### `npm run dev`
Runs development server with nodemon (auto-restart).
```bash
npm run dev
# Output: Server is running on http://localhost:5000
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "postalCode": "400001"
  }
}

Response: {
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response: {
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Logout User
```
POST /api/auth/logout
Authorization: Bearer <token>

Response: {
  "message": "Logout successful"
}
```

---

### Ingredient Routes (`/api/ingredients`)

#### Get All Ingredients
```
GET /api/ingredients

Response: [
  {
    "_id": "...",
    "name": "Mozzarella",
    "category": "cheese",
    "price": 50,
    "stock": 100,
    "available": true
  },
  ...
]
```

#### Get Ingredient by ID
```
GET /api/ingredients/:id

Response: {
  "_id": "...",
  "name": "Mozzarella",
  ...
}
```

#### Create Ingredient (Admin)
```
POST /api/ingredients
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Cheddar Cheese",
  "category": "cheese",
  "price": 60,
  "stock": 150
}

Response: {
  "_id": "...",
  "name": "Cheddar Cheese",
  ...
}
```

#### Update Ingredient (Admin)
```
PUT /api/ingredients/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 70,
  "stock": 120
}

Response: {
  "_id": "...",
  "name": "Cheddar Cheese",
  "price": 70,
  ...
}
```

#### Delete Ingredient (Admin)
```
DELETE /api/ingredients/:id
Authorization: Bearer <admin_token>

Response: {
  "message": "Ingredient deleted successfully"
}
```

---

### Order Routes (`/api/orders`)

#### Create Order
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "ingredientId": "...",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main St, Mumbai",
  "totalPrice": 599
}

Response: {
  "_id": "...",
  "userId": "...",
  "items": [...],
  "status": "pending",
  "totalPrice": 599
}
```

#### Get User Orders
```
GET /api/orders
Authorization: Bearer <token>

Response: [
  {
    "_id": "...",
    "status": "delivered",
    "totalPrice": 599,
    "createdAt": "2025-10-21T..."
  },
  ...
]
```

#### Get Order Details
```
GET /api/orders/:id
Authorization: Bearer <token>

Response: {
  "_id": "...",
  "userId": "...",
  "items": [...],
  "status": "delivered",
  "totalPrice": 599
}
```

#### Update Order Status (Admin)
```
PUT /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "confirmed"
}

Response: {
  "_id": "...",
  "status": "confirmed"
}
```

#### Cancel Order
```
DELETE /api/orders/:id
Authorization: Bearer <token>

Response: {
  "message": "Order cancelled successfully"
}
```

---

### Payment Routes (`/api/payments`)

#### Create Payment Order
```
POST /api/payments/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "...",
  "amount": 59900  // in paise
}

Response: {
  "orderId": "order_...",
  "amount": 59900,
  "currency": "INR"
}
```

#### Verify Payment
```
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "..."
}

Response: {
  "message": "Payment verified",
  "status": "success"
}
```

#### Payment History
```
GET /api/payments/history
Authorization: Bearer <token>

Response: [
  {
    "_id": "...",
    "orderId": "...",
    "amount": 59900,
    "status": "success",
    "createdAt": "2025-10-21T..."
  },
  ...
]
```

---

## 🔐 Authentication Middleware

### Auth Middleware (middleware/auth.js)
Verifies JWT token on protected routes:

```javascript
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
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

## 💾 Database Models

### User Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (unique, required),
  password: String (required, hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    postalCode: String
  },
  role: String (admin/customer),
  createdAt: Date (default: now)
}
```

### Order Schema
```javascript
{
  userId: ObjectId (required),
  items: [{
    ingredientId: ObjectId,
    quantity: Number
  }],
  deliveryAddress: String,
  totalPrice: Number,
  status: String (pending/confirmed/delivered/cancelled),
  paymentId: String,
  createdAt: Date,
  deliveredAt: Date
}
```

### Ingredient Schema
```javascript
{
  name: String (required, unique),
  category: String,
  price: Number (required),
  stock: Number (default: 0),
  available: Boolean (default: true),
  createdAt: Date
}
```

---

## 🛡️ Error Handling

### Standard Error Response
```javascript
{
  "message": "Error description",
  "status": "error",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (auth required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate entry)
- `500` - Server Error (internal error)

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Create App Password (NOT regular password)
3. Use App Password in `.env`

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-character app password
```

---

## 💳 Razorpay Configuration

### Setup Steps
1. Create Razorpay account at https://razorpay.com
2. Get API keys from dashboard
3. Add to `.env`

```env
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxx
```

---

## 🧪 Testing API

### Using Postman
1. Import `postman_collection.json` into Postman
2. Update `base_url` to `http://localhost:5000`
3. Run requests to test endpoints

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "password":"Pass@123",
    "phone":"9876543210",
    "address":{"street":"123 Main","city":"Mumbai","postalCode":"400001"}
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"Pass@123"
  }'
```

---

## 🚀 Deployment

### Deploy to Heroku
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

# View logs
heroku logs --tail
```

### Deploy to AWS/DigitalOcean
See main `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📚 Scripts

### Seed Admin User
```bash
node scripts/seedAdmin.js
# Creates admin user if doesn't exist
# Email: admin@example.com
# Password: Admin@123
```

### Test API
```bash
node scripts/apiTest.js
# Tests all API endpoints
# Requires running backend
```

### Full Workflow Test
```bash
node scripts/fullTest.js
# Tests complete user journey
# Register → Login → Order → Payment
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Start MongoDB locally: `mongod`
- Or use MongoDB Atlas: Update `MONGODB_URI` in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change `PORT` in `.env` file
- Or kill existing process: `lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### JWT Token Expired
```
Error: jwt expired
```

**Solution:**
- JWT expires after 7 days (configurable)
- User needs to login again
- Or implement token refresh logic

---

## 📝 Best Practices Implemented

✅ **Security**
- Password hashing with bcrypt
- JWT token authentication
- Environment variables for secrets
- CORS configuration
- Input validation

✅ **Code Quality**
- MVC architecture
- Separation of concerns
- Reusable middleware
- Clear error messages
- Modular organization

✅ **Error Handling**
- Try-catch blocks
- Error middleware
- Validation errors
- Graceful failures

✅ **Performance**
- Database indexing
- Query optimization
- Caching ready
- Async/await patterns

---

## 📄 License

ISC License - Feel free to use and modify

---

## 👨‍💻 Author

Backend developed as part of OASIS INFOBYTE Level -3 Project

---

**Build scalable APIs!** 🚀
