import { Request } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  export interface Request {
    user: { userId: string; email: string };
  }
}
