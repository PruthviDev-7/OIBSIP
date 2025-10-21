import express from 'express';
import { register, login, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController.js';
import { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/reset-password', resetPasswordValidator, resetPassword);

export default router;