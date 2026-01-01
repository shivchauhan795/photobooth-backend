import { Router } from 'express';
import { login, signup, resetPassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', authMiddleware, resetPassword);

export default router;