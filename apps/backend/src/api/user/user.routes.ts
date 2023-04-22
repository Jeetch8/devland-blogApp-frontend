import express from 'express';
const router = express.Router();
import { getMe } from './user.controllers';

router.get('/me', getMe);

export default router;
