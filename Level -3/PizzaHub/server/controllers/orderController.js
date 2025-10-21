import mongoose from 'mongoose';
import Order from '../models/Order.js';
import { PizzaBase, Sauce, Cheese, Vegetable, Meat } from '../models/Ingredient.js';
import { checkAndNotifyLowStock, getModelByType } from '../utils/stockNotifier.js';

// Create Order
export const createOrder = async (req, res, next) => {
  try {
    const payload = req.body;
    // Basic validation - ensure pizza config and customer
    if (!payload.pizzaConfiguration || !payload.customer) {
      return res.status(400).json({ success: false, message: 'Missing pizzaConfiguration or customer' });
    }
    // Fallback approach for standalone MongoDB: atomic conditional updates with rollback
    const cfg = payload.pizzaConfiguration;
    // Prepare list of modifications: [{ model, id, qty }]
    const modifications = [];
    modifications.push({ model: PizzaBase, id: cfg.pizzaBase.ingredient, qty: 1 });
    modifications.push({ model: Sauce, id: cfg.sauce.ingredient, qty: 1 });
    modifications.push({ model: Cheese, id: cfg.cheese.ingredient, qty: 1 });
    if (Array.isArray(cfg.vegetables)) {
      for (const veg of cfg.vegetables) modifications.push({ model: Vegetable, id: veg.ingredient, qty: 1 });
    }
    if (Array.isArray(cfg.meat)) {
      for (const m of cfg.meat) modifications.push({ model: Meat, id: m.ingredient, qty: 1 });
    }

    const updatedItems = [];
    try {
      for (const mod of modifications) {
        const updated = await mod.model.findOneAndUpdate(
          { _id: mod.id, stockQuantity: { $gte: mod.qty } },
          { $inc: { stockQuantity: -mod.qty } },
          { new: true }
        );
        if (!updated) throw new Error(`Insufficient stock or ingredient not found: ${mod.id}`);
        updatedItems.push({ model: mod.model, item: updated, qty: mod.qty });
      }

      // Create order now that stock is adjusted
      const order = new Order(payload);
      await order.save();

      // Trigger low stock notifications asynchronously
      for (const ui of updatedItems) {
        try { await checkAndNotifyLowStock(ui.item); } catch (e) { console.error('Notifier error', e.message); }
      }

      return res.status(201).json({ success: true, data: order });
    } catch (err) {
      // Rollback any updates we performed
      for (const ui of updatedItems) {
        try {
          await ui.model.findByIdAndUpdate(ui.item._id, { $inc: { stockQuantity: ui.qty } });
        } catch (rbErr) {
          console.error('Rollback failed for', ui.item._id, rbErr.message);
        }
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// List Orders (for admin or user by query)
export const listOrders = async (req, res, next) => {
  try {
    const { customerId, status } = req.query;
    let filter = {};
    if (customerId) filter.customer = customerId;
    if (status) filter.status = status;

    const orders = await Order.find(filter).populate('customer', 'firstName lastName phone email').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    await order.updateStatus(status, req.user ? req.user.id : null, notes || '');
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Get single order
export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('customer', 'firstName lastName phone email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
