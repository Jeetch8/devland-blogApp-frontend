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
