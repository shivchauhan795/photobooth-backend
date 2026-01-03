import { Router } from 'express';
import { getAllImages, sendAllImages, sendImages, getImages } from '../controllers/mediaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/images', authMiddleware, getAllImages);
router.post('/images', sendAllImages);
router.post('/images/inaccount', authMiddleware, sendImages);
router.get('/images/inaccount', authMiddleware, getImages);

export default router;