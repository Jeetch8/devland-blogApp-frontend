import { z } from 'zod';

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerValidator = registerSchema
  .refine(data => data.name !== '', {
    message: "Name can't be empty",
    path: ['name'], // specify the path of the field
  })
  .refine(data => data.email.includes('@'), {
    message: 'Email must be a valid email',
    path: ['email'],
  })
  .refine(data => data.password.length >= 8, {
    message: 'Password must be at least 8 characters long',
    path: ['password'],
  });

export type ILoginReqType = z.infer<typeof loginValidator>;
export type IRegisterReqType = z.infer<typeof registerValidator>;
