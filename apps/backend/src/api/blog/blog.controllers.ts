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
  hasUserLikedBlog_dao,
  likeBlog_dao,
  updateBlogStats_dao,
} from './blog.dao';
import { createBlogValidator } from './blog.validators';
import { parse } from 'node-html-parser';
import { ICreateBlog_dao } from '@src/interfaces/blog.types';
import { optimizeAndUploadProfileImage } from '../file_upload/file_upload.services';
import DomPurify from 'dompurify';
import JSDOM from 'jsdom';

export const getAllBlogs_controller = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const { blogs, count } = await getAllBlogs_dao(Number(page));
    const totalNumberOfPages = Math.ceil(count / 15);
    const nextPage = Number(page) + 1 > totalNumberOfPages ? page : Number(page) + 1;
    res.status(200).json({ success: true, blogs, nextCursor: nextPage, prevCursor: Number(page) - 1 });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getBlogById_controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const blog = await getBlogById_dao(id);
    const date = new Date().toISOString().split('T')[0];
    await updateBlogStats_dao(blog.id, date, 'number_of_views');
    const hasUserLikedBlog = await hasUserLikedBlog_dao({ userId: userId, blogId: id });
    if (hasUserLikedBlog) {
      const temp = { hasUserLikedBlog, ...blog };
      return res.status(200).json({ success: true, blog: temp });
    }
    return res.status(200).json({ success: true, blog: { ...blog, hasUserLikedBlog: false } });
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
  const window = new JSDOM.JSDOM('').window;
  const DOMPurify = DomPurify(window);
  const sanitizedHtml = DOMPurify.sanitize(reqData.data.content);
  const raw_description = parse(sanitizedHtml).text;
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
  const date = new Date().toISOString().split('T')[0];
  await updateBlogStats_dao(blogId, date, 'number_of_comments');
  res.status(200).json({ success: true, blogComment });
};

export const likeBlog_controller = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  const blogComment = await likeBlog_dao({ userId, blogId });
  const date = new Date().toISOString().split('T')[0];
  await updateBlogStats_dao(blogId, date, 'number_of_likes');
  res.status(200).json({ success: true, blogComment });
};
