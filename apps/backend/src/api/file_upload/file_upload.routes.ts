import express from 'express';
const router = express.Router();
import { uploadProfileImage_controller } from './file_upload.controller';
import multer from 'multer';
export const upload = multer({ dest: 'uploads/' });

router.post('/image/profile', upload.single('profile'), uploadProfileImage_controller);

export default router;
