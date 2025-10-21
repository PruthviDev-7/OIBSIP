import { body, validationResult } from 'express-validator';

export const registerValidator = [
  body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').matches(/^\d{5,6}$/).withMessage('ZIP code must be 5 or 6 digits'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

export const forgotPasswordValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

export const resetPasswordValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('token').notEmpty().withMessage('Token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
