import * as crypto from 'crypto';

export class RandomUtil {
  static generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }

  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateUUID(): string {
    return crypto.randomUUID();
  }
}
