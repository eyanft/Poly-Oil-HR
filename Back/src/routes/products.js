import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  regenerateTranslations,
  updateProduct,
} from '../controllers/productController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, requireAdmin, createProduct);
router.put('/:id', requireAuth, requireAdmin, updateProduct);
router.post('/:id/regenerate-translations', requireAuth, requireAdmin, regenerateTranslations);
router.delete('/:id', requireAuth, requireAdmin, deleteProduct);

export default router;
