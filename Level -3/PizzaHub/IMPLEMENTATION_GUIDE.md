# 🔧 MISSING IMPLEMENTATIONS - CODE EXAMPLES

## Overview
This document provides code examples for implementing the missing pieces of PizzaHub.

---

## 1️⃣ MISSING BACKEND FUNCTIONS

### **1.1 Email Verification Function** 
**File:** `server/controllers/authController.js`

**Add this function:**
```javascript
// Verify email with token
export const verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.query;
    
    if (!token || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token and email are required' 
      });
    }
    
    const user = await User.findOne({ 
      email,
      emailVerificationToken: token,
      emailVerificationExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification token' 
      });
    }
    
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Email verified successfully! You can now login.' 
    });
  } catch (error) {
    next(error);
  }
};
```

### **1.2 Forgot Password Function**
**File:** `server/controllers/authController.js`

**Add this function:**
```javascript
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'No user found with this email' 
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    
    await user.save();
    
    // Send email (non-blocking)
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }
    
    res.json({ 
      success: true, 
      message: 'Password reset link sent to your email' 
    });
  } catch (error) {
    next(error);
  }
};
```

### **1.3 Reset Password Function**
**File:** `server/controllers/authController.js`

**Add this function:**
```javascript
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    
    if (!email || !token || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, token, and new password are required' 
      });
    }
    
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }
    
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Password reset successful! You can now login with your new password.' 
    });
  } catch (error) {
    next(error);
  }
};
```

---

### **1.4 Email Utility Functions**
**File:** `server/utils/email.js`

**Complete implementation:**
```javascript
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html || options.text
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error.message);
    throw error;
  }
};

// Email templates
export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  
  return sendEmail({
    to: email,
    subject: 'PizzaHub - Verify Your Email',
    html: `
      <h2>Welcome to PizzaHub! 🍕</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" style="background: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Verify Email
      </a>
      <p>Or copy this link: ${verificationUrl}</p>
      <p>This link expires in 24 hours.</p>
    `
  });
};

export const sendOrderConfirmationEmail = async (email, order) => {
  return sendEmail({
    to: email,
    subject: 'PizzaHub - Order Confirmed! 🍕',
    html: `
      <h2>Your order has been confirmed!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p><strong>Status:</strong> ${order.orderStatus}</p>
      <p>Your delicious pizza will be delivered soon!</p>
      <p>Track your order: ${process.env.FRONTEND_URL}/orders</p>
    `
  });
};

export const sendOrderStatusEmail = async (email, order, newStatus) => {
  const statusMessages = {
    confirmed: '✅ Your order has been confirmed!',
    preparing: '👨‍🍳 Our chefs are preparing your pizza!',
    out_for_delivery: '🚚 Your pizza is on its way!',
    delivered: '🎉 Your pizza has been delivered! Enjoy!'
  };
  
  return sendEmail({
    to: email,
    subject: `PizzaHub - Order Status Update`,
    html: `
      <h2>${statusMessages[newStatus]}</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>New Status:</strong> ${newStatus.toUpperCase()}</p>
      <p>Track your order: ${process.env.FRONTEND_URL}/orders/${order._id}</p>
    `
  });
};
```

---

## 2️⃣ MISSING FRONTEND PAGES

### **2.1 HomePage Component**
**File:** `client/src/pages/HomePage.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4">Craving Pizza? 🍕</h1>
              <p className="text-xl mb-8">Order your favorite pizza online and get it delivered to your doorstep!</p>
              <Link to="/builder" className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition">
                Build Your Pizza
              </Link>
            </div>
            <div className="text-8xl">🍕</div>
          </div>
        </div>
      </section>

      {/* Popular Pizzas Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Most Popular Pizzas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pizza Cards */}
            {['Margherita', 'Pepperoni', 'Veggie Supreme'].map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-orange-400 to-red-400 h-48 flex items-center justify-center text-6xl">
                  🍕
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{name}</h3>
                  <p className="text-gray-600 mb-4">Freshly made with premium ingredients</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">₹349</span>
                    <Link to="/builder" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Build', icon: '🍕', desc: 'Customize your perfect pizza' },
              { step: 2, title: 'Review', icon: '👀', desc: 'Check your order details' },
              { step: 3, title: 'Pay', icon: '💳', desc: 'Secure payment with Razorpay' },
              { step: 4, title: 'Deliver', icon: '🚚', desc: 'Get it delivered hot & fresh' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.step}. {item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why PizzaHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '100K+', label: 'Pizzas Delivered' },
              { number: '4.9★', label: 'Average Rating' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { offer: 'Buy 2 Get 1 FREE', desc: 'On medium pizzas' },
              { offer: 'Family Pack Special', desc: '4 Large Pizzas for ₹999' },
              { offer: 'Student Discount', desc: '20% off with student ID' }
            ].map((promo, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-400 to-red-400 text-white rounded-lg p-8 text-center hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-2">{promo.offer}</h3>
                <p className="mb-4">{promo.desc}</p>
                <button className="bg-white text-orange-500 px-6 py-2 rounded font-bold hover:bg-gray-100 transition">
                  Claim Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">Subscribe to get exclusive offers and latest updates!</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded text-black"
            />
            <button type="submit" className="bg-white text-orange-500 px-8 py-3 rounded font-bold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🍕 PizzaHub</h3>
              <p className="text-gray-400">Delivering happiness one pizza at a time</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PizzaHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### **2.2 Checkout Page**
**File:** `client/src/pages/Checkout.jsx`

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRazorpayOrder } from '../services/api';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const order = JSON.parse(localStorage.getItem('pendingOrder') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  if (!order.totalAmount) {
    return <div className="text-center py-20">No order found. Please build a pizza first.</div>;
  }

  const handlePayment = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Create Razorpay order
      const razorpayRes = await createRazorpayOrder(token, {
        amount: order.totalAmount,
        receipt: `order_${Date.now()}`
      });

      if (!razorpayRes.success) {
        throw new Error(razorpayRes.message || 'Failed to create payment order');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_1234567890',
        amount: Math.round(order.totalAmount * 100),
        currency: 'INR',
        name: 'PizzaHub',
        description: 'Pizza Order',
        order_id: razorpayRes.data.id,
        handler: (response) => {
          // Payment successful
          localStorage.removeItem('pendingOrder');
          navigate('/payment-success', { state: { response } });
        },
        prefill: {
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#f97316'
        }
      };

      // Load Razorpay script and open checkout
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      setMessage('Payment failed: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">🛒 Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <span>Pizza Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span>Delivery Fee:</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span>Tax (5%):</span>
                <span>₹{Math.round(order.totalAmount * 0.05)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-500">₹{Math.round(order.totalAmount * 1.05 + 50)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p>{user.address?.street}</p>
              <p>{user.address?.city}, {user.address?.state} {user.address?.zipCode}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6 text-center mb-6">
            <div className="text-4xl mb-2">💳</div>
            <p className="font-semibold">Razorpay Payment</p>
            <p className="text-sm">Secure and Fast</p>
          </div>

          {message && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-4 border border-red-200">
              {message}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 transition"
          >
            {loading ? 'Processing...' : `Pay ₹${Math.round(order.totalAmount * 1.05 + 50)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 3️⃣ MISSING FRONTEND COMPONENTS

### **3.1 Shopping Cart Component**
**File:** `client/src/components/Cart.jsx`

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ isOpen, onClose }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    localStorage.setItem('pendingOrder', JSON.stringify({ items, totalAmount: total }));
    onClose();
    navigate('/checkout');
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg transform transition">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">🛒 Cart</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        <div className="p-6 h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-orange-500">₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <div className="flex justify-between mb-4 text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-500">₹{total}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

**This document will be updated with remaining implementations...**

For full implementations of other missing pieces, refer to:
- `MISSING_ITEMS_ANALYSIS.md` - Complete list of missing items
- `QUICK_START.md` - Setup and troubleshooting guide
- `server/ReadMe.md` - Full API documentation
- `README.md` - Project overview

