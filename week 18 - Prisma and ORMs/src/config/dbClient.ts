import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pgClient = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: 5432,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});
