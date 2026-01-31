import { Router } from 'express';
import { sendQuote } from '../controllers/quoteController.js';

const router = Router();
router.post('/', sendQuote);

export default router;
