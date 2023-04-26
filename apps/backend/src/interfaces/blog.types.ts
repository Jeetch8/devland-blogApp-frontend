import { BlogType } from '@prisma/client';

export interface ICreateBlog_dao {
  title: string;
  content: string;
  short_description: string;
  type: BlogType;
  topicId: string;
  authorId: string;
  banner_img: string;
}
