import express from 'express';
import { signup, trackUsage } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// User signup
router.post('/signup', signup);

// Track usage (protected route)
router.post('/trackUsage', authMiddleware, trackUsage);


export default router;
