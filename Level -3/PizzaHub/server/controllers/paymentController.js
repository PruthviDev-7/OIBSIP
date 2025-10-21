import Razorpay from 'razorpay';
import crypto from 'crypto';

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are not configured');
  }
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
};

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    if (!amount) return res.status(400).json({ success: false, message: 'Amount is required' });

    const options = {
      amount: Math.round(amount * 100), // rupees to paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!process.env.RAZORPAY_KEY_SECRET) throw new Error('Razorpay key secret not configured');
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    next(error);
  }
};
