// Main App Component - Entry point for the Pizza Delivery Application
// This file contains routing, navigation, and the homepage

import React, { useContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading components - This improves app performance by loading pages only when needed
// Instead of loading all pages at once, they load when user visits them
const Login = React.lazy(() => import('./pages/Login.jsx'));
const Register = React.lazy(() => import('./pages/Register.jsx'));
const PizzaBuilder = React.lazy(() => import('./pages/PizzaBuilder.jsx'));
const Orders = React.lazy(() => import('./pages/Orders.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));

function Navigation() {
  const { token, logout, user } = useContext(AuthContext);
  
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍕</span>
            <span className="text-2xl font-bold text-white">PizzaHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/builder" 
              className="text-white hover:text-orange-100 transition-colors duration-200 font-medium flex items-center space-x-1"
            >
              <span>Build Pizza</span>
            </Link>
            
            {token && (
              <Link 
                to="/orders" 
                className="text-white hover:text-orange-100 transition-colors duration-200 font-medium flex items-center space-x-1"
              >
                <span>My Orders</span>
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-white hover:text-orange-100 transition-colors duration-200 font-medium flex items-center space-x-1"
              >
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-orange-100 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">
                  {user?.firstName}
                </span>
                <button 
                  onClick={logout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="text-center max-w-6xl mx-4">
          <div className="text-8xl mb-8 animate-bounce">🍕</div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">PizzaHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            Craft your perfect pizza with our premium ingredients. From classic margherita to gourmet specialties, 
            every bite is made with love and delivered fresh to your door in just 30 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/builder" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Building Your Pizza
            </Link>
            <Link 
              to="/register" 
              className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Create Account
            </Link>
          </div>

          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="text-2xl mr-3">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-800">Demo Application</h4>
                <p className="text-sm text-blue-600">This is a demo pizza delivery app. Payment gateway requires configuration for live transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pizzas Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Most Popular Pizzas</h2>
            <p className="text-xl text-gray-600">Customer favorites that keep them coming back for more</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Margherita Classic', price: '₹299', desc: 'Fresh mozzarella, tomato sauce, basil', emoji: '🍅' },
              { name: 'Pepperoni Supreme', price: '₹399', desc: 'Pepperoni, mozzarella, oregano', emoji: '🍖' },
              { name: 'Veggie Delight', price: '₹349', desc: 'Bell peppers, mushrooms, onions, olives', emoji: '🥬' },
              { name: 'BBQ Chicken', price: '₹449', desc: 'Grilled chicken, BBQ sauce, red onions', emoji: '🍗' }
            ].map((pizza, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <div className="text-5xl mb-4 text-center">{pizza.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{pizza.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">{pizza.price}</span>
                  <Link to="/builder" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to pizza perfection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Base', desc: 'Select from thin crust, thick crust, or stuffed crust', icon: '🫓' },
              { step: '2', title: 'Add Toppings', desc: 'Pick your favorite sauce, cheese, and toppings', icon: '🧀' },
              { step: '3', title: 'Place Order', desc: 'Review your pizza and confirm your order', icon: '🛒' },
              { step: '4', title: 'Enjoy Pizza', desc: 'Sit back and wait for hot, fresh delivery', icon: '🚚' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">📊 Our Achievements</h2>
            <p className="text-xl text-gray-300">Numbers that speak for our quality and service</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers', icon: '😊' },
              { number: '100K+', label: 'Pizzas Delivered', icon: '🍕' },
              { number: '25 Min', label: 'Average Delivery', icon: '⚡' },
              { number: '4.9★', label: 'Customer Rating', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real pizza lovers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', rating: '⭐⭐⭐⭐⭐', review: 'The best pizza in town! The custom builder is amazing and delivery is always on time.', location: 'Mumbai' },
              { name: 'Rahul Sharma', rating: '⭐⭐⭐⭐⭐', review: 'Fresh ingredients, great taste, and the app is so easy to use. Highly recommended!', location: 'Delhi' },
              { name: 'Emily Davis', rating: '⭐⭐⭐⭐⭐', review: 'Love the variety of options. The pizza builder lets me create exactly what I want every time.', location: 'Bangalore' }
            ].map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl shadow-lg">
                <div className="text-2xl mb-3">{review.rating}</div>
                <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{review.name}</div>
                    <div className="text-sm text-gray-600">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">✨ Why Choose PizzaHub?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Lightning Fast Delivery', desc: 'Hot and fresh pizzas delivered in 30 minutes or less, guaranteed', icon: '🚚' },
              { title: 'Premium Ingredients', desc: 'Only the finest and freshest ingredients sourced from trusted suppliers', icon: '🌟' },
              { title: 'Custom Pizza Builder', desc: 'Create your perfect pizza with our interactive customization tool', icon: '🎨' },
              { title: 'Real-time Tracking', desc: 'Track your order from preparation to delivery in real-time', icon: '📱' },
              { title: 'Secure Payments', desc: 'Multiple payment options with bank-level security', icon: '🔒' },
              { title: '24/7 Support', desc: 'Round-the-clock customer support for any questions or concerns', icon: '🎧' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Special Offers & Deals</h2>
            <p className="text-xl opacity-90">Limited time offers you don't want to miss</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Buy 2 Get 1 FREE</h3>
              <p className="mb-4 opacity-90 text-gray-800">Order any 2 large pizzas and get the 3rd one absolutely free!</p>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg inline-block font-bold">
                Save up to ₹500
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Family Pack</h3>
              <p className="mb-4 opacity-90 text-gray-800">2 Medium pizzas + 1 Garlic bread + 2 Drinks for just ₹799</p>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg inline-block font-bold">
                40% OFF
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Student Special</h3>
              <p className="mb-4 opacity-90 text-gray-800">Show your student ID and get 25% off on all orders</p>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg inline-block font-bold">
                25% OFF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We've got answers!</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: 'How long does delivery take?', a: 'We guarantee delivery within 30 minutes or your pizza is free!' },
              { q: 'Do you offer vegan options?', a: 'Yes! We have vegan cheese and plant-based toppings available.' },
              { q: 'What are your delivery areas?', a: 'We deliver across major cities in India. Check our coverage during checkout.' },
              { q: 'Can I track my order?', a: 'Absolutely! You can track your order in real-time from our app.' },
              { q: 'Do you accept cash on delivery?', a: 'Yes, we accept cash, cards, and digital payments for your convenience.' }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated with PizzaHub</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to get exclusive offers, new menu items, and pizza tips delivered to your inbox!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-amber-50"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navigation />

            <main>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🍕</div>
                    <div className="text-lg text-gray-600">Loading...</div>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/builder" element={<PizzaBuilder />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
              <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400">© 2025 PizzaHub. Made with ❤️ for pizza lovers.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
