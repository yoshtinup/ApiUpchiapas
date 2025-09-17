import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3002,
  database: {
    host: process.env.DB_BASEUP_HOST || 'localhost',
    port: parseInt(process.env.DB_BASEUP_PORT || '3306'),
    username: process.env.DB_BASEUP_USERNAME || 'root',
    password: process.env.DB_BASEUP_PASSWORD || '',
    database: process.env.DB_BASEUP_DATABASE || 'baseup',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key-upchiapas',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  frontend: {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3002/auth/google/callback',
  frontendRedirectUri: process.env.FRONTEND_REDIRECT_URI || '',
  },
};
