import { prisma } from '@src/utils/primsa';

export const getUserById_dao = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profile_img: true,
    },
  });
};

export const getUserStats_dao = async (userId: string) => {
  return await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
    include: {
      blog_stats: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
};
