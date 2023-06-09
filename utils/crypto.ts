import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const token = () => {
  return crypto.randomBytes(36).toString('base64url') + '|' + Date.now().toString(32);
};

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const check = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
