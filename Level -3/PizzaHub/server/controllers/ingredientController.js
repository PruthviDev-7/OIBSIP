import { PizzaBase, Sauce, Cheese, Vegetable, Meat } from '../models/Ingredient.js';

// Utility to choose model by type
const modelMap = {
  'pizza-base': PizzaBase,
  'sauce': Sauce,
  'cheese': Cheese,
  'vegetable': Vegetable,
  'meat': Meat
};

export const listIngredients = async (req, res, next) => {
  try {
    const { type } = req.query; // optional filter
    let Model;
    if (type) {
      Model = modelMap[type];
      if (!Model) return res.status(400).json({ success: false, message: 'Invalid ingredient type' });
      const items = await Model.find();
      return res.json({ success: true, data: items });
    }

    // If no type specified, list all types
    const [bases, sauces, cheeses, vegetables, meats] = await Promise.all([
      PizzaBase.find(), Sauce.find(), Cheese.find(), Vegetable.find(), Meat.find()
    ]);
    return res.json({ success: true, data: { bases, sauces, cheeses, vegetables, meats } });
  } catch (error) {
    next(error);
  }
};

export const createIngredient = async (req, res, next) => {
  try {
    const { type, payload } = req.body; // payload contains ingredient fields
    if (!type || !payload) return res.status(400).json({ success: false, message: 'Type and payload are required' });

    const Model = modelMap[type];
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid ingredient type' });

    const item = new Model(payload);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateIngredient = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const payload = req.body;
    const Model = modelMap[type];
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid ingredient type' });

    const item = await Model.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Ingredient not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteIngredient = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const Model = modelMap[type];
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid ingredient type' });

    const item = await Model.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Ingredient not found' });
    res.json({ success: true, message: 'Ingredient deleted' });
  } catch (error) {
    next(error);
  }
};

export const adjustStock = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const { change } = req.body; // positive to add, negative to reduce
    const Model = modelMap[type];
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid ingredient type' });

    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Ingredient not found' });

    item.stockQuantity = Math.max(0, item.stockQuantity + (change || 0));
    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
