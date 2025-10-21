# 🍕 PizzaHub Frontend - React Client Application

> Modern, responsive React frontend for PizzaHub pizza delivery application with interactive UI and smooth user experience.

## 📋 Overview

The frontend is a React-based Single Page Application (SPA) built with Vite, Tailwind CSS, and React Router. It provides an intuitive interface for users to browse pizzas, customize orders, track deliveries, and manage their accounts. Admin users get access to a comprehensive dashboard for inventory and order management.

---

## ✨ Features

### 🏠 HomePage / Landing
- Hero section with animated gradient background
- Popular pizzas showcase with cards
- How it works section (4-step process)
- Customer statistics and achievements
- Customer testimonials and reviews
- Features showcase (6 key benefits)
- Special offers and deals section
- Newsletter subscription form
- FAQ (Frequently Asked Questions)
- Footer with links and information

### 🍕 Pizza Builder
- **Base Selection**: Thin, Thick, or Stuffed crust
- **Sauce Options**: Tomato, Pesto, BBQ, White sauce (with colors)
- **Cheese Varieties**: Mozzarella, Cheddar, Parmesan
- **Toppings**: 15+ vegetables (mushroom, pepperoni, etc.)
- **Meat Options**: 8+ varieties
- **Real-time Pricing**: Updates as you select items
- **Visual Preview**: See pizza in real-time
- **Stock Status**: Real-time availability indicators
- **Add to Cart**: Save your custom pizza

### 🔐 Authentication
- **Login Page**: Email and password validation
- **Register Page**: Multi-step form collection
  - Personal information (First name, Last name)
  - Email and password
  - Address details (Street, City, Postal code)
  - Phone number
- **Form Validation**: Client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during submission

### 📦 Order Management
- **Order History**: View all past orders
- **Order Status**: Real-time status tracking
  - Pending ⏳
  - Confirmed ✓
  - Delivered 📦
  - Cancelled ❌
- **Order Details**: Complete itemization
- **Timestamps**: Created and delivered times
- **Reorder**: Quick repeat from history
- **Invoice**: View order summary
- **Delivery Time**: Estimated delivery display

### 👤 Admin Dashboard
- **Inventory Management**
  - View all ingredients
  - Edit prices
  - Update stock levels
  - Low stock alerts
  - Add/remove ingredients
  
- **Order Management**
  - View all orders
  - Filter by status
  - Update order status
  - Cancel orders
  - View customer details
  
- **Analytics**
  - Total orders
  - Revenue stats
  - Popular pizzas
  - Order trends
  
- **User Management**
  - View registered users
  - User account status
  - Order history per user

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly buttons
- Optimized images
- Responsive navigation

---

## 🛠️ Technologies Used

### Core Technologies
| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.1.1 | UI framework |
| React DOM | 19.1.1 | DOM rendering |
| React Router DOM | 7.9.4 | Client-side routing |
| Vite | 7.1.7 | Build tool & dev server |
| Tailwind CSS | 4.1.14 | Utility-first CSS framework |
| Axios | 1.12.2 | HTTP client |
| Lucide React | 0.545.0 | Icon library |

### Dev Dependencies
- ESLint (Code linting)
- @vitejs/plugin-react (React support)
- TypeScript support

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx       # Error catching component
│   │   └── ProtectedRoute.jsx      # Auth-protected routes
│   │
│   ├── context/
│   │   └── AuthContext.jsx         # Global auth state
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── PizzaBuilder.jsx        # Interactive pizza builder
│   │   ├── Orders.jsx              # Order history page
│   │   ├── AdminDashboard.jsx      # Admin management panel
│   │   └── NotFound.jsx            # 404 page
│   │
│   ├── services/
│   │   └── api.js                  # Axios API client
│   │
│   ├── App.jsx                     # Main app component & routing
│   ├── main.jsx                    # React DOM entry point
│   ├── index.css                   # Global styles
│   └── index.html                  # HTML template
│
├── public/
│   └── [Static assets]             # Images, fonts, etc.
│
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
├── eslint.config.js                # ESLint rules
├── package.json                    # Dependencies & scripts
├── .env.local                      # Environment variables
├── .gitignore                      # Git ignore rules
└── README.md                       # Frontend documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Text editor or IDE (VS Code recommended)

### Installation

**1. Navigate to client folder:**
```bash
cd client
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env.local` file:**
```bash
# Create file with:
VITE_API_BASE=http://localhost:5000
```

**4. Start development server:**
```bash
npm run dev
```

**5. Open in browser:**
```
http://localhost:5173
```

---

## 📦 Available Scripts

### `npm run dev`
Starts Vite development server with hot reload.
```bash
npm run dev
# Output: Local: http://localhost:5173
```

### `npm run build`
Creates optimized production build.
```bash
npm run build
# Output: dist/ folder with built files
```

### `npm run preview`
Preview production build locally.
```bash
npm run preview
# Output: Local: http://localhost:4173
```

### `npm run lint`
Run ESLint to check code quality.
```bash
npm run lint
# Shows code quality issues
```

---

## 🔐 Authentication Flow

### Login Process
1. User clicks "Sign In"
2. Enters email and password
3. Frontend validates input
4. Sends POST to `/api/auth/login`
5. Backend validates credentials
6. Returns JWT token and user data
7. Token stored in localStorage
8. User redirected to home page

### Register Process
1. User clicks "Join Now"
2. Fills in personal details
3. Enters email and password
4. Completes address information
5. Frontend validates all fields
6. Sends POST to `/api/auth/register`
7. Backend creates user account
8. Returns JWT token
9. Auto-login and redirect

### Protected Routes
- `/builder` - Requires authentication
- `/orders` - Requires authentication
- `/admin` - Requires admin role

---

## 🎨 Component Architecture

### App.jsx - Main Component
```jsx
- Navigation (Header with logo and menu)
- HomePage (Landing page with sections)
- Routes Setup (All page routes)
- Suspense Boundaries (For lazy loading)
- Error Boundary (Error catching)
```

### AuthContext.jsx - State Management
```jsx
- User state (Current logged-in user)
- Token state (JWT token)
- Login function (Set user & token)
- Logout function (Clear user & token)
- LocalStorage persistence (Auto-restore session)
```

### ProtectedRoute.jsx - Route Protection
```jsx
- Check if token exists
- Redirect if not authenticated
- Allow access if authenticated
- Optional role checking
```

### ErrorBoundary.jsx - Error Catching
```jsx
- Catch rendering errors
- Display fallback UI
- Prevent app crash
- Log errors
```

---

## 🔌 API Integration

### Axios Client Setup (services/api.js)
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Auto-attach JWT to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints Used

#### Authentication
```javascript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

#### Pizza Builder
```javascript
GET /api/ingredients              // Get all ingredients
GET /api/ingredients/:id          // Get specific ingredient
```

#### Orders
```javascript
GET /api/orders                   // Get user orders
POST /api/orders                  // Create order
GET /api/orders/:id               // Get order details
```

#### Admin
```javascript
GET /api/orders                   // All orders (admin)
PUT /api/orders/:id/status        // Update status
DELETE /api/orders/:id            // Cancel order
GET /api/ingredients              // Manage ingredients
PUT /api/ingredients/:id          // Update ingredient
```

---

## 🎯 User Flows

### Customer Flow
```
1. Visit Homepage
   ↓
2. Browse Pizzas / Features
   ↓
3. Click "Build Pizza" or "Join Now"
   ↓
4. Register / Login
   ↓
5. Custom Pizza in Builder
   ↓
6. Add to Cart
   ↓
7. Checkout
   ↓
8. Payment
   ↓
9. Order Confirmation
   ↓
10. Track Order in "My Orders"
```

### Admin Flow
```
1. Login with admin account
   ↓
2. Click "Admin" in navbar
   ↓
3. Admin Dashboard opens
   ↓
4. Manage Inventory
   - View all ingredients
   - Update prices & stock
   ↓
5. Manage Orders
   - View all customer orders
   - Update status
   - Cancel if needed
   ↓
6. View Analytics
   - Revenue stats
   - Popular items
```

---

## 🎨 Styling with Tailwind CSS

### Color Scheme
- **Primary**: Orange & Red (Pizza theme)
- **Accent**: White text on dark backgrounds
- **Alerts**: Red for errors, Green for success
- **Backgrounds**: Gradients and solid colors

### Responsive Classes
```css
/* Mobile First */
p { /* Mobile styles */ }
md:p { /* Tablet and up */ }
lg:p { /* Desktop and up */ }
```

---

## 🐛 Error Handling

### Client-side Validation
- Empty field checking
- Email format validation
- Password strength validation
- Form completion verification

### Server-side Error Display
- API error messages shown to user
- Network error handling
- Loading states during requests
- Retry mechanisms

### Error Boundary
- Catches component errors
- Displays fallback UI
- Prevents white screen crash
- Logs errors for debugging

---

## 📱 Responsive Breakpoints

| Breakpoint | Size | Target |
|-----------|------|--------|
| Mobile | < 640px | Phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | > 1024px | Computers |

---

## ⚡ Performance Optimization

### Code Splitting
- Routes use React.lazy() for lazy loading
- Pages load only when accessed
- Reduces initial bundle size

### Image Optimization
- Optimized image sizes
- Lazy loading for images
- WebP format support

### Caching
- LocalStorage for auth tokens
- Browser cache for assets
- API response caching

---

## 🔧 Troubleshooting

### "Module not found" Error
```
npm install
```

### API calls failing
- Check `VITE_API_BASE` in `.env.local`
- Ensure backend server is running
- Check browser console for errors

### Page not loading
- Clear browser cache
- Try `npm run dev` again
- Check for errors in console

### Authentication not working
- Verify backend is running
- Check MongoDB connection
- Ensure JWT_SECRET is set in backend

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

See main `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📝 Best Practices Used

✅ **Component Structure**
- Reusable components
- Separation of concerns
- Single responsibility principle

✅ **State Management**
- Context API for auth
- Avoid prop drilling
- Efficient re-renders

✅ **Performance**
- Lazy code splitting
- Memoization where needed
- Optimized renders

✅ **Code Quality**
- ESLint configured
- Consistent naming
- Clear comments
- Modular organization

✅ **User Experience**
- Loading states
- Error messages
- Responsive design
- Accessibility features

---

## 👨‍💻 Author

Frontend developed as part of OASIS INFOBYTE Level -3 Project

---

## 📄 License

ISC License - Feel free to use and modify

---

**Start building amazing UIs!** 🎨✨
