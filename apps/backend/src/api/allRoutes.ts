import { Router } from 'express';
import authRouter from './auth/auth.routes';
import blogRouter from './blog/blog.routes';
import userRouter from './user/user.routes';
import fileRouter from './file_upload/file_upload.routes';
import bookmarkRouter from './bookmark/bookmark.routes';

export const intializeRoutes = (app: Router) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/blog', blogRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/file', fileRouter);
  app.use('/api/v1/bookmark', bookmarkRouter);
};
