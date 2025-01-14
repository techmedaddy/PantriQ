import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { KafkaService } from './kafka/kafka.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ErrorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Set Global Prefix
  app.setGlobalPrefix('api/v1');

  // Enable ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Apply Middlewares
  app.use(new LoggerMiddleware().use);
  app.use(new RateLimiterMiddleware().use);
  app.use(new ErrorHandlerMiddleware().use);

  // Redis Connection
  const redisService = app.get(RedisService);
  await redisService.onModuleInit();

  // Kafka Connection
  const kafkaService = app.get(KafkaService);
  kafkaService.onModuleInit();

  // Application Port
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  logger.log(`Application is running on http://localhost:${PORT}/api/v1`);
}

// Start the application
bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('Application failed to start', err.stack);
});
