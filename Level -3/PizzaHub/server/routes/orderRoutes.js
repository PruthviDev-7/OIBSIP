import express from 'express';
import { createOrder, listOrders, updateOrderStatus, getOrder } from '../controllers/orderController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Create order (authenticated)
router.post('/', auth, createOrder);

// List orders (admin or filter by customer)
router.get('/', auth, listOrders);

// Get single order
router.get('/:id', auth, getOrder);

// Admin: update order status
router.patch('/:id/status', auth, adminAuth, updateOrderStatus);

export default router;