export const JwtConfig = {
  secret: process.env.JWT_SECRET || 'secretKey', // Use environment variable in production
  expiresIn: process.env.JWT_EXPIRATION || '1h',
};
