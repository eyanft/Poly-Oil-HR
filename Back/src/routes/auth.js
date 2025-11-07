import { Router } from 'express';
import { login, logout, refresh, register, me } from '../controllers/authController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', requireAuth, requireAdmin, me);

export default router;


