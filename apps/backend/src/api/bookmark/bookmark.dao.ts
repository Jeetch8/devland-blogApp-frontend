import { prisma } from '@src/utils/primsa';
import { IBookmarkBlogCreate_dao, IBookmarkCategoryCreate_dao, IBookmarkCategoryUpdate_dao } from '@interfaces/bookmark';

export const createBookmarkCategory_dao = async ({ name, userId, description }: IBookmarkCategoryCreate_dao) => {
  return await prisma.bookmark_Category.create({
    data: {
      name,
      userId,
      description,
    },
  });
};

export const deleteBookmarkCategory_dao = async (id: string) => {
  return await prisma.bookmark_Category.delete({
    where: {
      id,
    },
    include: {
      category_blog: true,
    },
  });
};

export const getAllUserCategory_dao = async (userId: string) => {
  return await prisma.bookmark_Category.findMany({
    where: {
      userId,
    },
    include: {
      category_blog: {
        take: 3,
        include: {
          blog: {
            select: {
              id: true,
              banner_img: true,
            },
          },
        },
      },
    },
  });
};

export const getSingleCategoryById_dao = async (categoryId: string) => {
  return await prisma.bookmark_Category_Blog.findMany({
    where: {
      categoryId,
    },
  });
};

export const updateCategoryInfo_dao = async ({ categoryId, name, description }: IBookmarkCategoryUpdate_dao) => {
  return await prisma.bookmark_Category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      description,
    },
  });
};

export const addBlogToCategory_dao = async ({ categoryId, blogId, note = '' }: IBookmarkBlogCreate_dao) => {
  return await prisma.bookmark_Category_Blog.create({
    data: {
      categoryId,
      blogId,
      note,
    },
  });
};

export const removeBlogFromCategory_dao = async (blogId: string) => {
  return await prisma.bookmark_Category_Blog.delete({
    where: {
      id: blogId,
    },
  });
};

export const updateBlogNote_dao = async (blogId: string, note: string) => {
  return await prisma.bookmark_Category_Blog.update({
    where: {
      id: blogId,
    },
    data: {
      note,
    },
  });
};

export const getAllBlogsOfCategory_dao = async (categoryId: string) => {
  return await prisma.bookmark_Category_Blog.findMany({
    where: {
      categoryId,
    },
    include: {
      blog: {
        select: {
          id: true,
          banner_img: true,
          title: true,
          short_description: true,
          createdAt: true,
          number_of_comments: true,
          number_of_likes: true,
          topicId: true,
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
        },
      },
    },
  });
};

export const getListOfBookmarCategory_dao = async (userId: string) => {
  return await prisma.bookmark_Category.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
    },
  });
};
