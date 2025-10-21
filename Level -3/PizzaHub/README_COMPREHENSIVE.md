# 🍕 PizzaHub - Full Stack Pizza Delivery Application

> A modern, production-ready pizza delivery web application with real-time order management, payment integration, and admin dashboard.

![Status](https://img.shields.io/badge/Status-Completed%20✅-brightgreen)
![License](https://img.shields.io/badge/License-ISC-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 🎯 Project Overview

**PizzaHub** is a comprehensive full-stack pizza delivery application that demonstrates modern web development practices. It features a beautiful React-based user interface, robust Node.js/Express backend, MongoDB database integration, and complete payment processing through Razorpay.

### Key Highlights:
- ✅ **Production Ready** - Fully functional with error handling and validation
- ✅ **Real-time Updates** - Live pricing and inventory management
- ✅ **Secure Authentication** - JWT-based user authentication
- ✅ **Payment Integration** - Razorpay gateway integration
- ✅ **Admin Dashboard** - Complete inventory and order management
- ✅ **Responsive Design** - Mobile-first UI with Tailwind CSS
- ✅ **Modern Stack** - React 19, Node.js, Express, MongoDB

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/PruthviDev-7/OIBSIP.git
cd "Level -3/PizzaHub"
```

**2. Backend Setup:**
```bash
cd server
npm install
cp .env.example .env
npm run dev
# Server runs at http://localhost:5000
```

**3. Frontend Setup:**
```bash
cd ../client
npm install
npm run dev
# Client runs at http://localhost:5173
```

**4. Access Application:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 👤 Test Credentials

### Admin Account
```
Email: admin@example.com
Password: Admin@123
Access: Full admin dashboard
```

### Create New Account
- Click "Register" on login page
- Fill in personal and address details
- Set your password
- Start ordering!

---

## 📁 Project Structure

```
PizzaHub/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx    # Error handling component
│   │   │   └── ProtectedRoute.jsx   # Route protection for auth
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global authentication state
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── PizzaBuilder.jsx     # Interactive pizza builder
│   │   │   ├── Orders.jsx           # Order history
│   │   │   ├── AdminDashboard.jsx   # Admin panel
│   │   │   └── NotFound.jsx         # 404 page
│   │   ├── services/
│   │   │   └── api.js               # API client with Axios
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React DOM render
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── .env.local                   # Environment variables
│   └── README.md                    # Frontend documentation
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (login/register)
│   │   ├── ingredientController.js  # Ingredient management
│   │   ├── orderController.js       # Order processing
│   │   └── paymentController.js     # Payment handling
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication middleware
│   │   └── validators.js            # Input validation
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Order.js                 # Order schema
│   │   ├── Ingredient.js            # Ingredient schema
│   │   └── index.js                 # Model exports
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── ingredientRoutes.js      # Ingredient endpoints
│   │   ├── orderRoutes.js           # Order endpoints
│   │   └── paymentRoutes.js         # Payment endpoints
│   ├── utils/
│   │   ├── email.js                 # Email sending utility
│   │   └── stockNotifier.js         # Inventory alerts
│   ├── scripts/
│   │   ├── seedAdmin.js             # Create admin user
│   │   ├── apiTest.js               # API testing script
│   │   └── fullTest.js              # Complete workflow test
│   ├── server.js                    # Main server file
│   ├── package.json                 # Server dependencies
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Backend documentation
│
├── screenshots/                     # Application screenshots
│   ├── PLACEHOLDER_LIST.md          # Screenshot descriptions
│   └── [12 placeholder images]      # UI screenshots
│
└── [Documentation Files]
    ├── 00-START-HERE.md             # Getting started guide
    ├── QUICK_START.md               # Quick setup instructions
    ├── README.md                    # Main project readme
    ├── PROJECT_SUMMARY.md           # Project overview
    ├── IMPLEMENTATION_GUIDE.md      # Development guide
    ├── DEPLOYMENT_GUIDE.md          # Deployment instructions
    ├── PAYMENT_SETUP.md             # Payment configuration
    ├── PROJECT_STATUS_REPORT.md     # Status tracking
    └── [More documentation]         # Additional resources

```

---

## ✨ Features

### 🏠 Frontend Features

#### Homepage
- Hero section with call-to-action
- 12+ comprehensive sections showcasing pizzas and services
- Popular pizza menu with pricing (₹299-₹449)
- How it works section (4-step process)
- Customer reviews and testimonials
- Special offers and promotions
- Newsletter subscription
- FAQ section

#### Authentication
- **Login**: Email/password with validation
- **Register**: Multi-step form with address capture
- **JWT Tokens**: Secure session management
- **Role-based Access**: Admin vs customer permissions
- **Protected Routes**: Restrict unauthorized access

#### Pizza Builder
- **Base Selection**: Thin, Thick, Stuffed crust options
- **Sauce Options**: Tomato, Pesto, BBQ, White sauce
- **Cheese Varieties**: Mozzarella, Cheddar, Parmesan
- **Extensive Toppings**: 15+ vegetables, 8+ meat options
- **Real-time Pricing**: Dynamic updates as you customize
- **Visual Preview**: See your pizza as you build
- **Stock Management**: Real-time availability checking

#### Order Management
- **Order History**: Complete purchase records
- **Order Details**: Itemized breakdown
- **Status Tracking**: Real-time order updates
- **Reorder Function**: Quick repeat orders
- **Invoice Download**: PDF generation
- **Delivery Tracking**: Estimated delivery times

#### Admin Dashboard
- **Inventory Management**: Stock level control
- **Order Monitoring**: View and manage all orders
- **User Management**: Customer account oversight
- **Sales Analytics**: Revenue and order statistics
- **Stock Alerts**: Automatic low-stock notifications
- **Payment Records**: Transaction history

### ⚡ Backend Features

#### Authentication API
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Token refresh mechanism
- Role-based authorization

#### Ingredient Management
- CRUD operations for ingredients
- Stock level tracking
- Real-time availability updates
- Category organization
- Price management

#### Order Processing
- Order creation and validation
- Order status tracking (Pending, Confirmed, Delivered)
- Order history retrieval
- Order cancellation support
- Automatic notifications

#### Payment Processing
- Razorpay integration
- Multiple payment methods
- Payment verification
- Order confirmation on payment
- Refund processing
- Payment history tracking

#### Email Notifications
- Registration confirmation
- Order placed notification
- Order status updates
- Delivery confirmation
- Promotional emails

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework | 19.1.1 |
| **Vite** | Build tool & dev server | 7.1.7 |
| **Tailwind CSS** | Styling framework | 4.1.14 |
| **React Router** | Client-side routing | 7.9.4 |
| **Axios** | HTTP client | 1.12.2 |
| **Lucide React** | Icon library | 0.545.0 |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime environment | Latest |
| **Express.js** | Server framework | 5.1.0 |
| **MongoDB** | Database | Latest |
| **Mongoose** | ODM library | 8.19.1 |
| **JWT** | Authentication | 9.0.2 |
| **bcryptjs** | Password hashing | 3.0.2 |
| **Razorpay SDK** | Payment gateway | 2.9.6 |
| **Nodemailer** | Email service | 7.0.9 |

---

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```env
VITE_API_BASE=http://localhost:5000
```

**Backend (.env):**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pizza_delivery

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## 📝 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register       - Create new user account
POST   /api/auth/login          - Login user
POST   /api/auth/logout         - Logout user
GET    /api/auth/verify         - Verify JWT token
```

### Ingredient Endpoints
```
GET    /api/ingredients         - Get all ingredients
GET    /api/ingredients/:id     - Get ingredient details
POST   /api/ingredients         - Create ingredient (Admin)
PUT    /api/ingredients/:id     - Update ingredient (Admin)
DELETE /api/ingredients/:id     - Delete ingredient (Admin)
```

### Order Endpoints
```
GET    /api/orders              - Get user orders
GET    /api/orders/:id          - Get order details
POST   /api/orders              - Create new order
PUT    /api/orders/:id/status   - Update order status (Admin)
DELETE /api/orders/:id          - Cancel order
```

### Payment Endpoints
```
POST   /api/payments/create     - Create payment order
POST   /api/payments/verify     - Verify payment
GET    /api/payments/history    - Get payment history
```

---

## 🚀 Deployment

### Deploy to Heroku

**Backend:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

**Frontend (Netlify):**
```bash
# Build production version
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running locally
- Or use MongoDB Atlas cloud URL

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change PORT in .env file
- Or kill existing process on port 5000

**API Connection Failing:**
- Check `VITE_API_BASE` in frontend `.env.local`
- Ensure backend server is running
- Check browser console for errors

**CORS Issues:**
- CORS is enabled in backend (`server.js`)
- Verify frontend URL matches CORS configuration

See `QUICK_START.md` for more troubleshooting tips.

---

## 📊 Project Stats

- **Total Lines of Code**: 2000+
- **Components**: 10+
- **API Endpoints**: 15+
- **Database Models**: 4
- **Features Implemented**: 20+
- **Test Coverage**: Postman collection included

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

✅ **Frontend Development**
- React hooks and state management
- Component composition and reusability
- React Router and lazy loading
- Context API for global state
- Tailwind CSS styling
- Responsive design patterns
- Form validation and handling
- API integration with Axios

✅ **Backend Development**
- Express.js REST API design
- MongoDB and Mongoose usage
- JWT authentication implementation
- Password hashing with bcrypt
- Input validation and error handling
- CORS configuration
- Environment variables management
- Email integration

✅ **Full Stack Concepts**
- Client-server architecture
- Request/response cycle
- Authentication and authorization
- Data persistence
- Payment gateway integration
- Error handling and logging
- Deployment and DevOps basics

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `00-START-HERE.md` | Getting started guide |
| `QUICK_START.md` | 5-minute setup guide |
| `README.md` | Main project documentation |
| `PROJECT_SUMMARY.md` | Project overview |
| `IMPLEMENTATION_GUIDE.md` | Development guide |
| `DEPLOYMENT_GUIDE.md` | Production deployment |
| `PAYMENT_SETUP.md` | Razorpay configuration |
| `PROJECT_STATUS_REPORT.md` | Status tracking |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Pruthvi Dev**  
Part of OASIS INFOBYTE Level -3 Projects

---

## 🙏 Acknowledgments

- OASIS INFOBYTE for the project structure
- Razorpay for payment integration
- MongoDB for database solution
- Tailwind CSS for beautiful styling
- React and Node.js communities

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting guide

---

**Happy Coding! 🚀🍕**

Last Updated: October 2025
