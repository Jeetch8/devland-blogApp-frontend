import { faker } from '@faker-js/faker';
import { prisma } from './primsa';
import { BlogType } from '@prisma/client';

function createFakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: '$2b$10$Tpc1CSiuQvA6f9hqAFgbDOLUgwXwwmnBbU7Z0.k4YgBGWgEPtl5Ea',
    profile_img: faker.image.avatar(),
  };
}

function createBlobgs() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    banner_img: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'nature' }),
    type: BlogType.publish,
    short_description: faker.lorem.paragraph(),
  };
}

function createTopics() {
  return {
    name: faker.lorem.words(),
  };
}

function createComments() {
  return {
    content: faker.lorem.paragraphs(),
  };
}

function createBookmarkCategory(userId: string) {
  return {
    name: faker.person.fullName(),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    userId: userId,
  };
}

export async function seedFakeData() {
  if (process.env.NODE_ENV !== 'development') return;
  try {
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.user_token.deleteMany();
    await prisma.user.deleteMany();
    await prisma.bookmark_Category.deleteMany();
    await prisma.bookmark_Category_Blog.deleteMany();
    const usersArr = Array.from({ length: 10 }, createFakeUser);
    await prisma.user.createMany({ data: usersArr });
    const userIds = await prisma.user.findMany({ select: { id: true } });
    const topicsArr = Array.from({ length: 20 }, createTopics);
    await prisma.topic.createMany({ data: topicsArr });
    const topicIds = await prisma.topic.findMany({ select: { id: true } });
    const blogsArr: any = [];
    topicIds.forEach(topic => {
      userIds.forEach(user => {
        blogsArr.push({
          ...createBlobgs(),
          authorId: user.id,
          topicId: topic.id,
        });
      });
    });
    await prisma.blog.createMany({ data: blogsArr });
    const blogIds = await prisma.blog.findMany({ select: { id: true } });
    blogIds.forEach(blog => {
      userIds.forEach(async user => {
        await prisma.blog.update({
          where: { id: blog.id },
          data: {
            number_of_comments: {
              increment: 1,
            },
            number_of_likes: {
              increment: 1,
            },
            likes: {
              create: {
                userId: user.id,
              },
            },
            comments: {
              create: {
                content: faker.lorem.paragraphs(),
                userId: user.id,
              },
            },
          },
        });
      });
    });
    await prisma.bookmark_Category.createMany({
      data: [createBookmarkCategory(userIds[0].id), createBookmarkCategory(userIds[0].id)],
    });
    const allBookmarkCategoryIds = await prisma.bookmark_Category.findMany({ select: { id: true } });
    const temp1 = Array.from({ length: 10 }, (_, ind) => {
      return {
        categoryId: allBookmarkCategoryIds[0].id,
        note: faker.lorem.sentence(),
        blogId: blogIds[ind].id,
      };
    });
    const temp2 = Array.from({ length: 10 }, (_, ind) => {
      return {
        categoryId: allBookmarkCategoryIds[1].id,
        note: faker.lorem.sentence(),
        blogId: blogIds[ind].id,
      };
    });
    await prisma.bookmark_Category_Blog.createMany({
      data: temp1,
    });
    await prisma.bookmark_Category_Blog.createMany({
      data: temp2,
    });
    console.log('DB seeded with fake data');
  } catch (error) {
    console.log(error);
  }
}
