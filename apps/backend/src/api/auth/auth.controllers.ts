import { Request, Response } from 'express';
import { registerValidator, loginValidator } from './auth.validators';
import { BadRequestError } from '@src/utils/customErrors';
import {
  createNewUser_dao,
  findUserByEmail_dao,
  findUserById_dao,
  updatePassword_dao,
  findUserTokenByUserId_dao,
  updatePasswordChangeStatus_dao,
  updateEmailVerificationStatus_dao,
  createUserEmailToken_dao,
  createUserPasswordToken_dao,
} from './auth.dao';
import { comparePassword, hashPassword } from '@src/utils/bcrypt';
import { generateJWTToken } from '@src/utils/jwt';
import { sendForgotPasswordEmail, sendVerificationEmail } from '@src/utils/mailer';

export const register_controller = async (req: Request, res: Response) => {
  const validationResult = registerValidator.safeParse(req.body);
  if (!validationResult.success) {
    throw new BadRequestError(validationResult.error.message);
  }
  const reqUser = validationResult.data;
  const temp = {
    ...reqUser,
    password: await hashPassword(reqUser.password),
  };
  const user = await createNewUser_dao(temp);
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  const token = generateJWTToken(payload);
  await createUserEmailToken_dao(user.id, token);
  await sendVerificationEmail(user.email, token);
  const temp2 = {
    ...payload,
    profile_img: user.profile_img,
    token,
  };
  res.status(200).json({ success: true, user: temp2 });
};

export const login_controller = async (req: Request, res: Response) => {
  const validationResult = loginValidator.safeParse(req.body);
  if (!validationResult.success) {
    throw new BadRequestError(validationResult.error.message);
  }
  const { email, password } = validationResult.data;
  const user = await findUserByEmail_dao(email);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequestError('Incorrect password');
  }
  const userToken = await findUserTokenByUserId_dao(user.id);
  if (userToken?.email_verification_status === false) {
    throw new BadRequestError('Please verify your email');
  }
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  const token = generateJWTToken(payload);
  const temp = {
    ...payload,
    profile_img: user.profile_img,
    token,
  };
  res.status(200).json({ success: true, user: temp });
};

export const verifyEmailRequest_controller = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { userId } = req.user;
  const user = await findUserById_dao(userId);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  const userToken = await findUserTokenByUserId_dao(userId);
  if (!userToken) {
    throw new BadRequestError('User not found');
  }
  if (userToken.email_verification_token !== token) {
    throw new BadRequestError('Something went wrong');
  }
  await updateEmailVerificationStatus_dao(userId);
  res.status(200).json({ success: true });
};

export const forgotPasswordEmailRequest_controller = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await findUserByEmail_dao(email);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  const token = generateJWTToken(payload);
  await createUserPasswordToken_dao(user.id, token);
  await sendForgotPasswordEmail(email, token);
  res.status(200).json({ success: true });
};

export const forgotPasswordupdatePassword_controller = async (req: Request, res: Response) => {
  const { password, token } = req.body;
  const { userId } = req.user;
  const user = await findUserById_dao(userId);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  const userToken = await findUserTokenByUserId_dao(userId);
  if (!userToken) {
    throw new BadRequestError('User not found');
  }
  if (userToken.change_password_token !== token) {
    throw new BadRequestError('Something went wrong');
  }
  const hashedPassword = await hashPassword(password);
  await updatePasswordChangeStatus_dao(userId);
  await updatePassword_dao(userId, hashedPassword);
  res.status(200).json({ success: true });
};
