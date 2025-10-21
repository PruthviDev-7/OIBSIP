// Export all models for easy importing
export { default as User } from './User.js';
export { PizzaBase, Sauce, Cheese, Vegetable, Meat } from './Ingredient.js';
export { default as Order } from './Order.js';

// You can also import like this in other files:
// import { User, Order, PizzaBase, Sauce, Cheese, Vegetable, Meat } from '../models/index.js';