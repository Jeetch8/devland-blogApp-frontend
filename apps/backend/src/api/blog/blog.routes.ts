import express from 'express';
const router = express.Router();
import {
  createBlog_controller,
  getAllBlogs_controller,
  getBlogById_controller,
  commentOnBlog_controller,
  likeBlog_controller,
} from './blog.controllers';
import { authenticateUser } from '@src/middleware/Auth';
import { upload } from '../file_upload/file_upload.routes';

router.get('/', getAllBlogs_controller);
router.get('/:id', authenticateUser, getBlogById_controller);
router.post('/', upload.single('banner_img'), authenticateUser, createBlog_controller);
router.post('/comment', authenticateUser, commentOnBlog_controller);
router.post('/:blogId/like', authenticateUser, likeBlog_controller);

export default router;
