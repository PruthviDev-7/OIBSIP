import jwt from 'jsonwebtoken';

// Authentication middleware
export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided, authorization denied' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

// Admin authentication middleware
export const adminAuth = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Authorization error' 
    });
  }
};