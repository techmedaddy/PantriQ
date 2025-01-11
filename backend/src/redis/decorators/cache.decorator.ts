import { RedisService } from '../redis.service';
import { Injectable } from '@nestjs/common';

export function Cache(ttl: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const redisService: RedisService = new RedisService();
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
      const cachedValue = await redisService.get(cacheKey);

      if (cachedValue) {
        console.log(`Cache hit for key: ${cacheKey}`);
        return cachedValue;
      }

      console.log(`Cache miss for key: ${cacheKey}`);
      const result = await originalMethod.apply(this, args);
      await redisService.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}
