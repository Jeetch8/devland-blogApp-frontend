import { NextFunction, Request, Response } from 'express';

import ErrorResponse from '../interfaces/ErrorResponse';
import { CustomError } from '../utils/customErrors';
import { Prisma } from '@prisma/client';

const handlePrismaError = (err: any) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
    case 'P2014':
      // handling invalid id errors
      return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      // handling invalid data errors
      return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
    default:
      // handling all other errors
      return new CustomError(`Something went wrong: ${err.message}`, 500);
  }
};

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

const handleJWTError = () => new CustomError('Invalid token please login again', 400);

const handleJWTExpiredError = () => new CustomError('Token has expired please login again', 400);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  console.log(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let error = { ...err };
  error.message = err.message;
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log('handlePrismaError');
    error = handlePrismaError(err);
  } else if (error.name === 'JsonWebTokenError') {
    error = handleJWTError();
  } else if (error.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }
  res.status(statusCode);
  res.json({
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
