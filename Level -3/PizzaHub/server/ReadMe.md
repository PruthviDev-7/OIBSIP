# 🚀 Pizza Delivery App - Backend Server

## 📋 Overview
This is the backend server for the Pizza Delivery Application built with **Node.js**, **Express.js**, and **MongoDB**. The server provides a robust RESTful API with authentication, order management, payment processing, and admin functionality.


---

## 🏗️ **Architecture Overview**

```
server/
├── 📁 config/           # Database and app configuration
├── 📁 controllers/      # Business logic and route handlers
├── 📁 middleware/       # Custom middleware (auth, validation)
├── 📁 models/          # MongoDB schemas and models
├── 📁 routes/          # API route definitions
├── 📁 scripts/         # Utility scripts (seeding, testing)
├── 📁 utils/           # Helper functions
├── 📄 server.js        # Main server entry point
├── 📄 package.json     # Dependencies and scripts
└── 📄 .env             # Environment variables
```

---

## ⚙️ **Technology Stack**

### **Core Technologies:**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### **Authentication & Security:**
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

### **Payment Integration:**
- **Razorpay** - Payment gateway for India
- **Secure payment processing** with order verification

### **Additional Libraries:**
- **dotenv** - Environment variable management
- **nodemailer** - Email functionality
- **multer** - File upload handling

---

## 🗄️ **Database Schema**

### **User Collection**
```javascript
{
  firstName: String,           // User's first name
  lastName: String,            // User's last name
  email: String,              // Unique email (username)
  password: String,           // Hashed password
  phone: String,              // Contact number
  address: {                  // Delivery address
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  role: String,              // 'user' or 'admin'
  isVerified: Boolean,       // Email verification status
  isActive: Boolean,         // Account status
  createdAt: Date,
  updatedAt: Date
}
```

### **Order Collection**
```javascript
{
  customer: ObjectId,         // Reference to User
  items: [{
    base: ObjectId,           // Pizza base reference
    sauce: ObjectId,          // Sauce reference
    cheese: ObjectId,         // Cheese reference
    vegetables: [ObjectId],   // Array of vegetable references
    meat: ObjectId,           // Meat reference (optional)
    quantity: Number,         // Number of pizzas
    price: Number            // Individual pizza price
  }],
  totalAmount: Number,        // Total order amount
  status: String,            // 'pending', 'confirmed', 'preparing', 'delivered'
  paymentStatus: String,     // 'pending', 'completed', 'failed'
  paymentDetails: Object,    // Razorpay payment information
  deliveryAddress: Object,   // Address for delivery
  estimatedDelivery: Date,   // Expected delivery time
  createdAt: Date,
  updatedAt: Date
}
```

### **Ingredient Collections**
```javascript
// Separate collections for each ingredient type
PizzaBase: { name, description, price, stockQuantity, imageUrl }
Sauce: { name, description, price, stockQuantity, imageUrl }
Cheese: { name, description, price, stockQuantity, imageUrl }
Vegetable: { name, description, price, stockQuantity, imageUrl }
Meat: { name, description, price, stockQuantity, imageUrl }
```

---

## 🔗 **API Endpoints**

### **🔐 Authentication Routes** (`/api/auth`)

#### `POST /api/auth/register`
**Register a new user**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password@123",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345"
  }
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### `POST /api/auth/login`
**User login**
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### **🍕 Ingredient Routes** (`/api/ingredients`)

#### `GET /api/ingredients`
**Get all ingredients or filter by type**
- Query Parameter: `?type=pizza-base|sauce|cheese|vegetable|meat`

**Response:**
```json
{
  "success": true,
  "data": {
    "bases": [...],
    "sauces": [...],
    "cheeses": [...],
    "vegetables": [...],
    "meats": [...]
  }
}
```

#### `POST /api/ingredients` (Admin Only)
**Add new ingredient**
```json
{
  "type": "pizza-base",
  "payload": {
    "name": "Thin Crust",
    "description": "Crispy thin crust base",
    "price": 199,
    "stockQuantity": 50,
    "imageUrl": "https://..."
  }
}
```

### **📦 Order Routes** (`/api/orders`)

#### `POST /api/orders`
**Place a new order**
```json
{
  "items": [{
    "base": "base_id",
    "sauce": "sauce_id", 
    "cheese": "cheese_id",
    "vegetables": ["veg_id1", "veg_id2"],
    "meat": "meat_id",
    "quantity": 2
  }],
  "deliveryAddress": { ... },
  "paymentMethod": "razorpay"
}
```

#### `GET /api/orders`
**Get user's orders (or all orders for admin)**

#### `PATCH /api/orders/:id/status` (Admin Only)
**Update order status**
```json
{
  "status": "preparing"
}
```

### **💳 Payment Routes** (`/api/payments`)

#### `POST /api/payments/razorpay/create-order`
**Create Razorpay payment order**
```json
{
  "amount": 499,
  "orderId": "order_id"
}
```

#### `POST /api/payments/razorpay/verify`
**Verify payment after completion**
```json
{
  "razorpay_order_id": "...",
  "razorpay_payment_id": "...",
  "razorpay_signature": "..."
}
```

---

## 🔒 **Security Features**

### **Authentication & Authorization**
- **JWT Token Authentication** - Stateless authentication
- **Role-based Access Control** - Admin vs User permissions
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Middleware authentication

### **Input Validation**
- **express-validator** - Server-side validation
- **Data Sanitization** - Clean user inputs
- **Type Validation** - Ensure correct data types
- **Business Rules** - Custom validation logic

### **Security Headers**
- **CORS Configuration** - Cross-origin request handling  
- **Error Handling** - No sensitive data exposure
- **Rate Limiting** - Prevention of abuse (can be added)

---

## 📊 **Middleware Stack**

### **Authentication Middleware** (`middleware/auth.js`)
```javascript
// Verify JWT token
export const auth = (req, res, next) => {
  // Extract and verify JWT token
  // Attach user to request object
}

// Admin authorization
export const adminAuth = (req, res, next) => {
  // Check if user has admin role
}
```

### **Validation Middleware** (`middleware/validators.js`)
```javascript
// Registration validation
export const registerValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  // ... more validations
]

// Login validation  
export const loginValidator = [
  body('email').isEmail(),
  body('password').notEmpty(),
]
```

---

## 🏃‍♂️ **Getting Started**

### **1. Prerequisites**
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- Git for version control

### **2. Installation**
```bash
# Clone repository
git clone <repository-url>
cd pizza_delivery_app/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values
```

### **3. Environment Setup**
Create `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration  
MONGODB_URI=mongodb://localhost:27017/pizza_delivery
# Or MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/pizza_delivery

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Admin Seed Data
SEED_ADMIN_EMAIL=admin@pizzahub.com
SEED_ADMIN_PASSWORD=Admin@123
```

### **4. Database Setup**
```bash
# Seed admin user
npm run seed:admin

# Or manually:
node scripts/seedAdmin.js
```

### **5. Run Development Server**
```bash
# Start server with nodemon (auto-restart)
npm run dev

# Or start normally
npm start
```

Server will run on: `http://localhost:5000`

---

## 🧪 **Testing**

### **API Testing Scripts**

#### **Full API Test**
```bash
# Run comprehensive API tests
node scripts/fullTest.js
```

#### **Basic API Test**
```bash
# Run basic endpoint tests
node scripts/apiTest.js
```

### **Manual Testing with Postman**
1. **Import Collection**: `postman_collection.json`
2. **Import Environment**: `postman_environment.json`
3. **Set Variables**:
   - `API_BASE`: `http://localhost:5000`
   - `adminEmail`: `admin@pizzahub.com`
   - `adminPassword`: `Admin@123`

### **Health Check**
```bash
# Test server health
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## 📁 **File Structure Detailed**

### **📁 Controllers (`controllers/`)**
- **`authController.js`** - User registration, login, password reset
- **`orderController.js`** - Order creation, listing, status updates  
- **`ingredientController.js`** - CRUD operations for ingredients
- **`paymentController.js`** - Razorpay payment processing

### **📁 Models (`models/`)**
- **`User.js`** - User schema with authentication methods
- **`Order.js`** - Order schema with relationships
- **`Ingredient.js`** - Pizza ingredient schemas (Base, Sauce, etc.)
- **`index.js`** - Model exports for easy importing

### **📁 Routes (`routes/`)**
- **`authRoutes.js`** - Authentication endpoints
- **`orderRoutes.js`** - Order management endpoints
- **`ingredientRoutes.js`** - Ingredient CRUD endpoints  
- **`paymentRoutes.js`** - Payment processing endpoints

### **📁 Config (`config/`)**
- **`database.js`** - MongoDB connection configuration

### **📁 Utils (`utils/`)**
- **`email.js`** - Email sending functionality
- **`stockNotifier.js`** - Low stock notification system

### **📁 Scripts (`scripts/`)**
- **`seedAdmin.js`** - Create admin user
- **`fullTest.js`** - Comprehensive API testing
- **`apiTest.js`** - Basic API testing

---

## 🔧 **Available Scripts**

```json
{
  "scripts": {
    "start": "node server.js",           // Production start
    "dev": "nodemon server.js",          // Development with auto-restart
    "seed:admin": "node scripts/seedAdmin.js",  // Create admin user
    "test:api": "node scripts/fullTest.js",     // Test all APIs
    "test:basic": "node scripts/apiTest.js"     // Basic API tests
  }
}
```

---

## 🚀 **Deployment**

### **Environment Variables for Production**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pizza_delivery_prod
JWT_SECRET=super_secure_production_secret_key
RAZORPAY_KEY_ID=rzp_live_your_live_key
RAZORPAY_KEY_SECRET=your_live_secret
```

### **Production Checklist**
- ✅ Environment variables configured
- ✅ MongoDB Atlas setup
- ✅ JWT secrets updated
- ✅ Razorpay live keys (for production)
- ✅ CORS origins restricted to frontend domain
- ✅ Error logging configured
- ✅ Admin user seeded

---

## 📊 **Performance Features**

### **Database Optimization**
- **Indexing** on frequently queried fields
- **Population** for efficient data fetching  
- **Aggregation** for complex queries
- **Connection Pooling** via Mongoose

### **API Optimization**
- **JSON Response Compression**
- **Request/Response Logging**
- **Error Boundaries**
- **Async/Await** for non-blocking operations

---

## 🛡️ **Security Best Practices**

### **Implemented Security**
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication  
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Error handling without data exposure
- ✅ Role-based access control

### **Additional Security (Recommended)**
- 🔄 Rate limiting (express-rate-limit)
- 🔄 Helmet.js for security headers
- 🔄 Request logging and monitoring
- 🔄 HTTPS in production

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Database Connection Error**
```
Error: ENOTFOUND cluster0.mongodb.net
```
**Solution:** Check MongoDB URI and network connectivity

#### **JWT Token Invalid**
```
Error: JsonWebTokenError: invalid token
```
**Solution:** Ensure JWT_SECRET matches between requests

#### **Permission Denied**
```
Error: User does not have admin privileges
```
**Solution:** Check user role in database and middleware

#### **Port Already in Use**
```
Error: EADDRINUSE :::5000
```
**Solution:** Change PORT in .env or kill existing process

### **Debug Commands**
```bash
# Check database connection
node -e "require('./config/database.js').default()"

# Verify admin user exists
node -e "require('./models/User.js').default.findOne({role:'admin'}).then(console.log)"

# Test JWT generation
node -e "console.log(require('jsonwebtoken').sign({test:true}, 'secret'))"
```

---

## 📞 **API Documentation**

### **Response Format**
All API responses follow this format:
```json
{
  "success": true|false,
  "data": {...},           // Success data
  "message": "...",        // Success/Error message
  "error": "..."          // Error details (development only)
}
```

### **HTTP Status Codes**
- **200** - Success  
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

---

## 🎯 **Features Overview**

### ✅ **Completed Features**
- User registration and authentication
- JWT-based session management
- Pizza ingredient management (CRUD)
- Order placement and tracking
- Payment integration (Razorpay)
- Admin dashboard APIs
- Role-based access control
- Input validation and error handling
- Database relationships and optimization
- API testing and documentation

### 🔮 **Future Enhancements** 
- Real-time order tracking (WebSockets)
- Push notifications
- Advanced analytics and reporting
- Loyalty program APIs
- Multi-restaurant support
- Delivery boy assignment system
- Rating and review system

---

## 🏆 **Conclusion**

This backend server provides a **production-ready** foundation for a pizza delivery application with:

- 🎯 **Complete API Coverage** - All CRUD operations
- 🔐 **Enterprise Security** - Authentication, authorization, validation
- 📊 **Scalable Architecture** - Modular, maintainable code
- 💳 **Payment Integration** - Secure transaction processing
- 🗄️ **Robust Database** - Optimized schemas and relationships
- 🧪 **Comprehensive Testing** - API testing and validation
- 📚 **Detailed Documentation** - Easy onboarding and maintenance

**Ready for immediate deployment and production use! 🚀**

---

## 📜 **License**
MIT License - See LICENSE file for details

## 👨‍💻 **Author**
Adinath Vilas Jabade

## 🤝 **Contributing**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

**🍕 Happy Coding! Build amazing pizza experiences! 🍕**
