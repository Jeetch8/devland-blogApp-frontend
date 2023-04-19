import { prisma } from '@src/primsa';
import { IRegisterReqType } from './auth.validators';

export const createNewUser_dao = async (data: IRegisterReqType) => {
  const { name, email, password, profile_img } = data;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      profile_img,
    },
  });
  return user;
};

export const findUserByEmail_dao = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findUserById_dao = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const createUserEmailToken_dao = async (userId: string, token: string) => {
  const userToken = await prisma.user_token.create({
    data: {
      userId,
      email_verification_token: token,
      email_verification_status: false,
      email_verification_token_expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return userToken;
};

export const createUserPasswordToken_dao = async (userId: string, token: string) => {
  const userToken = await prisma.user_token.update({
    where: {
      userId,
    },
    data: {
      change_password_token: token,
      change_password_status: false,
      change_password_token_expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return userToken;
};

export const updateEmailVerificationStatus_dao = async (userId: string) => {
  const user = await prisma.user_token.update({
    where: {
      userId,
    },
    data: {
      email_verification_status: true,
    },
  });
  return user;
};

export const updatePasswordChangeStatus_dao = async (userId: string) => {
  const user = await prisma.user_token.update({
    where: {
      userId,
    },
    data: {
      change_password_status: true,
    },
  });
  return user;
};

export const updatePassword_dao = async (userId: string, password: string) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
  return user;
};

export const findUserTokenByUserId_dao = async (userId: string) => {
  const userToken = await prisma.user_token.findUnique({
    where: {
      userId,
    },
  });
  return userToken;
};
