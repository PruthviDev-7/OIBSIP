import mongoose from 'mongoose';

// Custom Pizza Configuration Schema
const pizzaConfigurationSchema = new mongoose.Schema({
  pizzaBase: {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PizzaBase',
      required: [true, 'Pizza base is required']
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: [true, 'Size is required']
    }
  },
  sauce: {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sauce',
      required: [true, 'Sauce is required']
    },
    quantity: {
      type: String,
      enum: ['light', 'regular', 'extra'],
      default: 'regular'
    }
  },
  cheese: {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cheese',
      required: [true, 'Cheese is required']
    },
    quantity: {
      type: String,
      enum: ['light', 'regular', 'extra'],
      default: 'regular'
    }
  },
  vegetables: [{
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vegetable'
    },
    quantity: {
      type: String,
      enum: ['light', 'regular', 'extra'],
      default: 'regular'
    }
  }],
  meat: [{
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meat'
    },
    quantity: {
      type: String,
      enum: ['light', 'regular', 'extra'],
      default: 'regular'
    }
  }],
  specialInstructions: {
    type: String,
    maxlength: [200, 'Special instructions cannot exceed 200 characters']
  }
}, { _id: false });

// Order Schema
const orderSchema = new mongoose.Schema({
  // Order Identification
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Customer Information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required']
  },
  
  // Pizza Configuration
  pizzaConfiguration: {
    type: pizzaConfigurationSchema,
    required: [true, 'Pizza configuration is required']
  },
  
  // Delivery Information
  deliveryAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required']
    },
    landmark: {
      type: String
    },
    deliveryInstructions: {
      type: String,
      maxlength: [200, 'Delivery instructions cannot exceed 200 characters']
    }
  },
  
  // Order Details
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  
  // Pricing
  itemPrice: {
    type: Number,
    required: [true, 'Item price is required'],
    min: [0, 'Price cannot be negative']
  },
  deliveryFee: {
    type: Number,
    default: 50,
    min: [0, 'Delivery fee cannot be negative']
  },
  tax: {
    type: Number,
    required: [true, 'Tax is required'],
    min: [0, 'Tax cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  
  // Order Status Tracking
  status: {
    type: String,
    enum: ['received', 'confirmed', 'preparing', 'baking', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'received'
  },
  
  // Status Timeline
  statusHistory: [{
    status: {
      type: String,
      enum: ['received', 'confirmed', 'preparing', 'baking', 'ready', 'out-for-delivery', 'delivered', 'cancelled']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cod'],
    default: 'razorpay'
  },
  paymentId: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  
  // Timing
  estimatedDeliveryTime: {
    type: Date
  },
  actualDeliveryTime: {
    type: Date
  },
  
  // Additional Information
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
  
}, {
  timestamps: true
});

// Indexes for better query performance (avoid duplicate index on orderNumber; unique defined on field)
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ 'deliveryAddress.zipCode': 1 });

// Pre-validate middleware to generate order number before validation
orderSchema.pre('validate', async function(next) {
  if (this.isNew) {
    // Generate unique order number
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `PZ${Date.now()}${String(count + 1).padStart(4, '0')}`;

    // Ensure statusHistory exists and add initial status to history
    if (!Array.isArray(this.statusHistory)) this.statusHistory = [];
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      notes: 'Order received'
    });

    // Calculate estimated delivery time (30-45 minutes from now)
    const now = new Date();
    this.estimatedDeliveryTime = new Date(now.getTime() + (Math.random() * 15 + 30) * 60000);
  }
  next();
});

// Method to update order status
orderSchema.methods.updateStatus = function(newStatus, updatedBy = null, notes = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    updatedBy,
    notes
  });
  
  // Set actual delivery time when delivered
  if (newStatus === 'delivered') {
    this.actualDeliveryTime = new Date();
  }
  
  return this.save();
};

// Virtual to get full delivery address
orderSchema.virtual('fullDeliveryAddress').get(function() {
  return `${this.deliveryAddress.street}, ${this.deliveryAddress.city}, ${this.deliveryAddress.state} ${this.deliveryAddress.zipCode}`;
});

// Virtual to check if order is active
orderSchema.virtual('isActive').get(function() {
  return !['delivered', 'cancelled'].includes(this.status);
});

// Static method to get orders by status
orderSchema.statics.getOrdersByStatus = function(status) {
  return this.find({ status }).populate('customer', 'firstName lastName phone email');
};

const Order = mongoose.model('Order', orderSchema);

export default Order;