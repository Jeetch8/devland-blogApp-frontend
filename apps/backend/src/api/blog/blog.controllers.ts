import { Request, Response } from 'express';
import {
  createBlog_dao,
  updateBlog_dao,
  deleteBlog_dao,
  getAllBlogs_dao,
  getBlogById_dao,
  commentOnBlog_dao,
  getAllBlogComments_dao,
  getAllBlogLikedProfile_dao,
} from './blog.dao';
import { createBlogValidator } from './blog.validators';
import { prisma } from '@src/primsa';

export const getAllBlogs_controller = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const blogs = await getAllBlogs_dao(Number(page));
    res.status(200).json({ success: true, blogs, nextPage: Number(page) + 1, prevPage: Number(page) - 1 });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getBlogById_controller = async (req: Request, res: Response) => {
  try {
    const blog = await getBlogById_dao(req.params.id);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const createBlog_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;
  // const reqData = createBlogValidator.safeParse(req.body);
  // console.log(reqData);
  // if (!reqData.success) {
  //   return res.status(400).json(reqData.error);
  // }
  const blog = await createBlog_dao(req.body, userId);
  res.status(200).json({ success: true, blog });
};

// export const updateBlog_controller = async (req: Request, res: Response) => {
