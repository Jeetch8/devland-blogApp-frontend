import express from 'express';
const router = express.Router();
import { createBlog_controller, getAllBlogs_controller, getBlogById_controller } from './blog.controllers';
import { authenticateUser } from '@src/middleware/Auth';

router.get('/', getAllBlogs_controller);
router.get('/:id', authenticateUser, getBlogById_controller);
router.post('/', authenticateUser, createBlog_controller);

export default router;
