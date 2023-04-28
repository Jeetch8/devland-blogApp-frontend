import { ICreateBlog_dao } from '@src/interfaces/blog.types';
import { prisma } from '@src/utils/primsa';

export const getAllBlogs_dao = async (page: number) => {
  return await prisma.blog.findMany({
    where: {
      type: 'publish',
    },
    skip: (page - 1) * 15,
    take: 15,
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      title: true,
      type: true,
      short_description: true,
      number_of_comments: true,
      number_of_likes: true,
      banner_img: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          profile_img: true,
        },
      },
    },
  });
};

export const getBlogById_dao = async (id: string) => {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      comments: true,
      //  {
      //   take: 20,
      //   orderBy: { createdAt: 'asc' },
      //   include: {
      //     user: {
      //       select: {
      //         id: true,
      //         name: true,
      //         email: true,
      //         profile_img: true,
      //       },
      //     },
      //   },
      // },
      likes: true,
      //  {
      //   take: 20,
      //   orderBy: { createdAt: 'asc' },
      //   include: {
      //     user: {
      //       select: {
      //         id: true,
      //         name: true,
      //         profile_img: true,
      //       },
      //     },
      //   },
      // },
    },
  });
};

export const createBlog_dao = async (data: ICreateBlog_dao) => {
  const createBlog = await prisma.blog.create({
    data,
  });
  return createBlog;
};

export const updateBlog_dao = async (id: string, data: any) => {
  return await prisma.blog.update({
    where: { id },
    data,
  });
};

export const deleteBlog_dao = async (id: string) => {
  return await prisma.blog.delete({
    where: { id },
  });
};

export const getAllBlogComments_dao = async ({ blogId, skip, take }: { blogId: string; skip: number; take: number }) => {
  return await prisma.comment.findMany({
    where: {
      blogId,
    },
    skip,
    take,
    include: {
      user: true,
    },
  });
};

export const getAllBlogLikedProfile_dao = async ({ blogId, skip, take }: { blogId: string; skip: number; take: number }) => {
  return await prisma.like.findMany({
    where: {
      blogId,
    },
    skip,
    take,
    include: {
      user: true,
    },
  });
};

export const likeBlog_dao = async ({ userId, blogId }: { userId: string; blogId: string }) => {
  return await prisma.like.create({
    data: {
      userId,
      blogId,
    },
  });
};

export const commentOnBlog_dao = async ({ value, userId, blogId }: { value: string; userId: string; blogId: string }) => {
  return await prisma.comment.create({
    data: {
      userId,
      content: value,
      blogId,
    },
  });
};
