import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  MAILGUN_SECRET,
  RESEND_SECRET,
  aws_secret_access_key,
  aws_access_key_id,
  aws_bucket_region,
} = process.env;
