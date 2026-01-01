import { Router } from 'express';
import { getImages, sendImages } from '../controllers/mediaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/images', authMiddleware, getImages);
router.post('/images', sendImages);

export default router;