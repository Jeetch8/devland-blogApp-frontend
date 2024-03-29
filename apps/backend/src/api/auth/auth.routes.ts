import express from 'express';
import {
  register_controller,
  login_controller,
  forgotPasswordEmailRequest_controller,
  verifyEmailRequest_controller,
  forgotPasswordupdatePassword_controller,
} from './auth.controllers';
import { authenticateUser } from '@src/middleware/Auth';
const router = express.Router();
import { upload } from '../file_upload/file_upload.routes';

router.post('/register', upload.single('profile'), register_controller);
router.post('/login', login_controller);
router.post('/forgot-password', forgotPasswordEmailRequest_controller);
router.get('/verify-email-update', authenticateUser, verifyEmailRequest_controller);
router.post('/forgot-password-update', authenticateUser, forgotPasswordupdatePassword_controller);

export default router;
