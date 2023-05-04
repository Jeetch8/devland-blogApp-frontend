import express from 'express';
const router = express.Router();
import { getMe_controller, getUserStats_controller } from './user.controllers';
import { authenticateUser } from '@src/middleware/Auth';

router.get('/me', authenticateUser, getMe_controller);
router.get('/stats', authenticateUser, getUserStats_controller);

export default router;
