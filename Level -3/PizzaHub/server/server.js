// Pizza Delivery Backend Server - Main server file
// This creates the Express.js server that handles all API requests

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to database
connectDB();

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ 
    message: "Pizza Delivery API Server is Running!",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// API Routes (to be added)
// Mount API routers
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

