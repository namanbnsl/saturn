import { clsx, type ClassValue } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export const shortenEmail = (email: string) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const name = email.slice(0, atIndex);
    return name + '@' + '...';
  }

  return email;
};
