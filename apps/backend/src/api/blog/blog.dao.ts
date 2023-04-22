import { prisma } from '@src/primsa';

export const getAllBlogs_dao = async (page: number) => {
  return await prisma.user_blog.findMany({
    skip: (page - 1) * 15,
    take: 15,
    orderBy: { createdAt: 'asc' },
    include: {
      blog: true,
      user: true,
    },
  });
};

export const getBlogById_dao = async (id: string) => {
  return await prisma.blog.findUnique({
    where: { id },
  });
};

export const createBlog_dao = async (data: any, userId: string) => {
  const result = await prisma.blog.create({ data }).then(createdBlog =>
    prisma.user_blog.create({
      data: {
        userId: userId,
        blogId: createdBlog.id,
      },
    }),
  );
  return result;
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

export const commentOnBlog_dao = async ({ value, userId, blogId }: { value: string; userId: string; blogId: string }) => {
  return await prisma.comment.create({
    data: {
      userId,
      content: value,
      blogId,
    },
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
