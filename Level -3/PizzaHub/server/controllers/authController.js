import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
};

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body;
    
    if (!firstName || !lastName || !email || !password || !phone || !address) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }
    
    user = new User({ firstName, lastName, email, password, phone, address });
    
    // Generate email verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await user.save();
    
    // Send verification email (non-blocking)
    try {
      const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}&email=${encodeURIComponent(user.email)}`;
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email',
        text: `Please verify your email by clicking the link: ${verificationUrl}`
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }
    
    const token = generateToken(user);
    
    res.status(201).json({ success: true, token, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/login
// @desc Login user with email & password
// @access Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    res.json({ success: true, token, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/auth/verify-email
// @desc Verify user email
// @access Public
export const verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.query;
    if (!token || !email) {
      return res.status(400).json({ success: false, message: 'Invalid verification link' });
    }
    
    const user = await User.findOne({ email, emailVerificationToken: token, emailVerificationExpire: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Verification token is invalid or expired' });
    }
    
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();
    
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/forgot-password
// @desc Send password reset link
// @access Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No user found with this email' });
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();
    
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: `Reset your password using the link: ${resetUrl}`
      });
    } catch (emailErr) {
      console.error('Error sending reset email:', emailErr.message);
    }
    
    res.json({ success: true, message: 'Password reset email sent (if email exists)' });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/reset-password
// @desc Reset password
// @access Public
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ success: false, message: 'Missing required fields' });
    
    const user = await User.findOne({ email, resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } }).select('+password');
    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    const tokenJWT = generateToken(user);
    res.json({ success: true, token: tokenJWT, message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};
