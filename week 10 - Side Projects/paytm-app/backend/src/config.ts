import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT || !process.env.MONGO_URI || !process.env.USER_JWT_SECRET || !process.env.ADMIN_JWT_SECRET) {
  throw new Error('Missing required environment variables.');
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  USER_JWT_SECRET: process.env.USER_JWT_SECRET,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
};

console.log(process.env);

export { config };