import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

class EnvironmentVariables {
  NODE_ENV!: string;
  PORT!: number;

  DB_HOST!: string;
  DB_PORT!: number;
  DB_USERNAME!: string;
  DB_PASSWORD!: string;
  DB_NAME!: string;

  JWT_SECRET!: string;
  JWT_EXPIRATION!: string;

  REDIS_HOST!: string;
  REDIS_PORT!: number;

  KAFKA_BROKERS!: string;
  KAFKA_CLIENT_ID!: string;
  KAFKA_GROUP_ID!: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
