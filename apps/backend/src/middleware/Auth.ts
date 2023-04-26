import { NextFunction, Request, Response } from 'express';
import { decodeJWTToken } from '@src/utils/jwt';
import { ForbiddenError } from '../utils/customErrors';
import { UnauthorizedError } from '../utils/customErrors';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    throw new ForbiddenError('Authentication invalid');
  }
  try {
    const payload = await decodeJWTToken(token);
    if (!payload) throw new UnauthorizedError('Invalid token');
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new ForbiddenError('Authentication invalid');
  }
};
