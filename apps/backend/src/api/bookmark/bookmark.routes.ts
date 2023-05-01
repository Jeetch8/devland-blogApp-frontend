import express from 'express';
import {
  updateBlogNote_controller,
  addBlogToCategory_controller,
  updateCategoryInfo_controller,
  getAllUserCategory_controller,
  getSingleCategoryById_controller,
  createBookmarkCategory_controller,
  deleteBookmarkCategory_controller,
  removeBlogFromCategory_controller,
  getAllBlogsOfCategory_controller,
  getListOfBookmarCategory_controller,
} from './bookmark.controllers';
const router = express.Router();
import { authenticateUser } from '@src/middleware/Auth';

router.post('/category', authenticateUser, createBookmarkCategory_controller);
router.delete('/category/:categoryId', authenticateUser, deleteBookmarkCategory_controller);
router.get('/category', authenticateUser, getAllUserCategory_controller);
router.get('/category/list', authenticateUser, getListOfBookmarCategory_controller);
router.get('/category/:categoryId', authenticateUser, getSingleCategoryById_controller);
router.put('/category/:categoryId', authenticateUser, updateCategoryInfo_controller);
router.post('/category/:categoryId/blog', authenticateUser, addBlogToCategory_controller);
router.delete('/category/:categoryId/blog/:blogId', authenticateUser, removeBlogFromCategory_controller);
router.put('/category/:categoryId/blog/:blogId', authenticateUser, updateBlogNote_controller);
router.get('/category/:categoryId/blog', authenticateUser, getAllBlogsOfCategory_controller);

export default router;
