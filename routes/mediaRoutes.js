import { Router } from 'express';
import { getImages, sendImages } from '../controllers/mediaController.js';

const router = Router();

router.get('/images', getImages);
router.post('/images', sendImages);

export default router;