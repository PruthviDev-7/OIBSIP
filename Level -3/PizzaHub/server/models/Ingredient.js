import mongoose from 'mongoose';

// Base Ingredient Schema (will be used by all ingredient types)
const baseIngredientSchema = {
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 20,
    min: [0, 'Threshold cannot be negative']
  }
};

// Pizza Base Schema
const pizzaBaseSchema = new mongoose.Schema({
  ...baseIngredientSchema,
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: [true, 'Size is required']
  },
  baseType: {
    type: String,
    enum: ['thin-crust', 'thick-crust', 'stuffed-crust', 'whole-wheat', 'gluten-free'],
    required: [true, 'Base type is required']
  }
}, {
  timestamps: true
});

// Sauce Schema  
const sauceSchema = new mongoose.Schema({
  ...baseIngredientSchema,
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'extra-hot'],
    default: 'mild'
  },
  sauceType: {
    type: String,
    enum: ['tomato', 'white-sauce', 'pesto', 'bbq', 'garlic'],
    required: [true, 'Sauce type is required']
  }
}, {
  timestamps: true
});

// Cheese Schema
const cheeseSchema = new mongoose.Schema({
  ...baseIngredientSchema,
  cheeseType: {
    type: String,
    enum: ['mozzarella', 'cheddar', 'parmesan', 'feta', 'goat-cheese'],
    required: [true, 'Cheese type is required']
  },
  quantity: {
    type: String,
    enum: ['light', 'regular', 'extra'],
    default: 'regular'
  }
}, {
  timestamps: true
});

// Vegetables Schema
const vegetableSchema = new mongoose.Schema({
  ...baseIngredientSchema,
  category: {
    type: String,
    enum: ['fresh', 'roasted', 'grilled', 'pickled'],
    default: 'fresh'
  },
  vegetableType: {
    type: String,
    enum: [
      'onions', 'bell-peppers', 'mushrooms', 'tomatoes', 'olives',
      'spinach', 'corn', 'jalapenos', 'pineapple', 'broccoli',
      'zucchini', 'eggplant', 'artichokes'
    ],
    required: [true, 'Vegetable type is required']
  }
}, {
  timestamps: true
});

// Meat Schema
const meatSchema = new mongoose.Schema({
  ...baseIngredientSchema,
  meatType: {
    type: String,
    enum: ['pepperoni', 'sausage', 'chicken', 'beef', 'bacon', 'ham', 'turkey'],
    required: [true, 'Meat type is required']
  },
  cookingStyle: {
    type: String,
    enum: ['grilled', 'roasted', 'smoked', 'fried'],
    default: 'grilled'
  }
}, {
  timestamps: true
});

// Add indexes for better performance
pizzaBaseSchema.index({ isAvailable: 1, size: 1 });
sauceSchema.index({ isAvailable: 1, sauceType: 1 });
cheeseSchema.index({ isAvailable: 1, cheeseType: 1 });
vegetableSchema.index({ isAvailable: 1, vegetableType: 1 });
meatSchema.index({ isAvailable: 1, meatType: 1 });

// Add pre-save middleware to check low stock
const addLowStockCheck = function(schema) {
  schema.pre('save', function(next) {
    if (this.stockQuantity <= this.lowStockThreshold) {
      console.log(`⚠️  Low stock alert: ${this.name} - Only ${this.stockQuantity} left!`);
      // Here we can trigger email notification later
    }
    next();
  });
};

// Apply low stock check to all schemas
addLowStockCheck(pizzaBaseSchema);
addLowStockCheck(sauceSchema);
addLowStockCheck(cheeseSchema);
addLowStockCheck(vegetableSchema);
addLowStockCheck(meatSchema);

// Create models
const PizzaBase = mongoose.model('PizzaBase', pizzaBaseSchema);
const Sauce = mongoose.model('Sauce', sauceSchema);
const Cheese = mongoose.model('Cheese', cheeseSchema);
const Vegetable = mongoose.model('Vegetable', vegetableSchema);
const Meat = mongoose.model('Meat', meatSchema);

export { PizzaBase, Sauce, Cheese, Vegetable, Meat };