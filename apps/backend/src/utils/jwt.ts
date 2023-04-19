import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '@config/index';
import { ForbiddenError } from './customErrors';

interface IJWTUser {
  userId: string;
  email: string;
  name: string;
}

export const generateJWTToken = (payload: IJWTUser) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
};

export const decodeJWTToken = (token: string): IJWTUser => {
  const userExist = jwt.decode(token) as IJWTUser | null;
  if (!userExist) throw new ForbiddenError('Invalid token');
  return userExist;
};
