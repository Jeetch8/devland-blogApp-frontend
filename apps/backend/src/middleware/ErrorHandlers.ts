import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

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
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    customError.msg = handlePrismaError(err);
  } else if (err.name === 'JsonWebTokenError') {
    customError.msg = handleJWTError();
  } else if (err.name === 'TokenExpiredError') {
    customError.msg = handleJWTExpiredError();
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
