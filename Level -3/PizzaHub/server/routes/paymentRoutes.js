import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/razorpay/create-order', auth, createRazorpayOrder);
router.post('/razorpay/verify', auth, verifyRazorpayPayment);

export default router;