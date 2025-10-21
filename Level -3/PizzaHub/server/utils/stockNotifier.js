import { PizzaBase, Sauce, Cheese, Vegetable, Meat } from '../models/Ingredient.js';
import { sendEmail } from './email.js';

const modelMap = {
  PizzaBase,
  Sauce,
  Cheese,
  Vegetable,
  Meat
};

export const checkAndNotifyLowStock = async (item) => {
  try {
    if (item.stockQuantity <= item.lowStockThreshold) {
      const subject = `Low stock alert: ${item.name}`;
      const text = `The stock for ${item.name} is low (remaining: ${item.stockQuantity}). Please restock.`;
      // Send to admin
      await sendEmail({ to: process.env.SEED_ADMIN_EMAIL || process.env.EMAIL_USER, subject, text });
      console.log('Low stock email sent for', item.name);
    }
  } catch (error) {
    console.error('Failed to send low stock email:', error.message);
  }
};

export const getModelByType = (type) => {
  const map = {
    'pizzaBase': PizzaBase,
    'sauce': Sauce,
    'cheese': Cheese,
    'vegetable': Vegetable,
    'meat': Meat
  };
  return map[type];
};
