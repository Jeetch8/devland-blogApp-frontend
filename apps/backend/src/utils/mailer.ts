import { Resend } from 'resend';
import { RESEND_SECRET } from '@config/index';
import { BadRequestError } from './customErrors';

const sendEmail = async (email: string, subject: string, html: string) => {
  const resend = new Resend(RESEND_SECRET);
  const { data, error } = await resend.emails.send({
    from: 'blog_app@jeetchawda.me',
    to: email,
    subject: subject,
    html: html,
  });
  if (error) {
    throw new BadRequestError(error.message);
  }
  return data;
};

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const subject = 'Reset your password';
  const html = `<a href="http://localhost:3000/reset-password?token=${token}">Click here to reset your password</a>`;
  return await sendEmail(email, subject, html);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const subject = 'Verify your email';
  const html = `<a href="http://localhost:3000/verify-email?token=${token}">Click here to verify your email</a>`;
  return await sendEmail(email, subject, html);
};
