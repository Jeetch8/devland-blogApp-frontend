import { Request, Response } from 'express';
import {
  addBlogToCategory_dao,
  updateBlogNote_dao,
  deleteBookmarkCategory_dao,
  getAllUserCategory_dao,
  updateCategoryInfo_dao,
  getSingleCategoryById_dao,
  createBookmarkCategory_dao,
  removeBlogFromCategory_dao,
  getAllBlogsOfCategory_dao,
  getListOfBookmarCategory_dao,
} from './bookmark.dao';

export const createBookmarkCategory_controller = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { userId } = req.user;

  try {
    const category = await createBookmarkCategory_dao({ name, description, userId });
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deleteBookmarkCategory_controller = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    await deleteBookmarkCategory_dao(categoryId);
    res.status(200).json({ success: true, message: 'Delete category successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllUserCategory_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const categories = await getAllUserCategory_dao(userId);
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getSingleCategoryById_controller = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    const blogs = await getSingleCategoryById_dao(categoryId);
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateCategoryInfo_controller = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  try {
    const category = await updateCategoryInfo_dao({ categoryId, name, description });
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const addBlogToCategory_controller = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { blogId, note } = req.body;

  try {
    const blog = await addBlogToCategory_dao({ categoryId, blogId, note });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const removeBlogFromCategory_controller = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    await removeBlogFromCategory_dao(blogId);
    res.status(200).json({ success: true, message: 'Remove blog from category successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateBlogNote_controller = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { note } = req.body;

  try {
    const blog = await updateBlogNote_dao(blogId, note);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllBlogsOfCategory_controller = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    const blogs = await getAllBlogsOfCategory_dao(categoryId);
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getListOfBookmarCategory_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const categories = await getListOfBookmarCategory_dao(userId);
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
