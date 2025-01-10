import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const rateLimitMap = new Map<string, { count: number; lastRequestTime: number }>();
const LIMIT = 100; // Max requests per time window
const WINDOW = 60 * 1000; // Time window in milliseconds

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientIP = req.ip || 'unknown';
    const now = Date.now();

    const entry = rateLimitMap.get(clientIP) || { count: 0, lastRequestTime: now };

    if (now - entry.lastRequestTime > WINDOW) {
      rateLimitMap.set(clientIP, { count: 1, lastRequestTime: now });
    } else if (entry.count >= LIMIT) {
      throw new BadRequestException('Rate limit exceeded');
    } else {
      rateLimitMap.set(clientIP, { count: entry.count + 1, lastRequestTime: entry.lastRequestTime });
    }

    next();
  }
}
