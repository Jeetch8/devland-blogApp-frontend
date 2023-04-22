import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  type: z.enum(['public', 'draft']),
});

export const createBlogValidator = createBlogSchema
  .refine(data => data.title !== '', {
    message: "Title can't be empty",
    path: ['title'], // specify the path of the field
  })
  .refine(data => data.content !== '', {
    message: 'Content can not be empty',
    path: ['content'],
  });
