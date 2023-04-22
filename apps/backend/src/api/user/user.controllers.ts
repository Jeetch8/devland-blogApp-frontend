import { Request, Response } from 'express';
import { getUserById_dao } from './user.dao';

export const getMe = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const user = await getUserById_dao(userId);
  res.status(200).json(user);
};
