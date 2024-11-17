import { compare, hash } from 'bcryptjs';
const HASH_SALT_LENGTH = 8;
export const createHash = async (value: string): Promise<string> => {
  return hash(value, HASH_SALT_LENGTH);
};
export const compareHash = async (value: string, hash: string): Promise<boolean> => {
  return compare(value, hash);
};