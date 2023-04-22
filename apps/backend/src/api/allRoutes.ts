import { Router } from 'express';
import authRouter from './auth/auth.routes';
import blogRouter from './blog/blog.routes';
import userRouter from './user/user.routes';

export const intializeRoutes = (app: Router) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/blog', blogRouter);
  app.use('/api/v1/user', userRouter);
};
