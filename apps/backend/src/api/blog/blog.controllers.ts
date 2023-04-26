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
import { parse } from 'node-html-parser';
import { ICreateBlog_dao } from '@src/interfaces/blog.types';
import { optimizeAndUploadProfileImage } from '../file_upload/file_upload.services';

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
  const reqData = createBlogValidator.safeParse(req.body);
  if (!reqData.success) {
    return res.status(400).json(reqData.error);
  }
  const { originalImageUrl: banner_img } = await optimizeAndUploadProfileImage(req.file as Express.Multer.File, 400);
  const raw_description = parse(req.body.content).text;
  const spacesRemovedDesc = raw_description.replace(/\s+/g, ' ').trim();
  const escapedKeysDesc = spacesRemovedDesc.replace(/\\n|\\r|\\t/g, '').slice(0, 250);
  const temp: ICreateBlog_dao = { ...reqData.data, short_description: escapedKeysDesc, authorId: userId, banner_img };
  const blog = await createBlog_dao(temp);
  res.status(200).json({ success: true, blog });
};

export const commentOnBlog_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { value, blogId } = req.body;
  console.log(value, blogId);
  if (!value) return res.status(400).json({ success: false, error: 'Comment is required' });
  const blogComment = await commentOnBlog_dao({ value, userId, blogId });
  res.status(200).json({ success: true, blogComment });
};

// export const updateBlog_controller = async (req: Request, res: Response) => {
