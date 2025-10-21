import express from 'express';
import { listIngredients, createIngredient, updateIngredient, deleteIngredient, adjustStock } from '../controllers/ingredientController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: list ingredients (optionally filter by type)
router.get('/', listIngredients);

// Admin: create ingredient
router.post('/', auth, adminAuth, createIngredient);

// Admin: update ingredient by type and id
router.put('/:type/:id', auth, adminAuth, updateIngredient);

// Admin: delete ingredient
router.delete('/:type/:id', auth, adminAuth, deleteIngredient);

// Admin: adjust stock
router.patch('/:type/:id/stock', auth, adminAuth, adjustStock);

export default router;