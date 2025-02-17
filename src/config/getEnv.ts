import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

interface IEnv {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

export const getEnv = (): IEnv => {
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Database Config:", {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });

  return {
    database: process.env.DB_NAME || 'mydb',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypass',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
  };
};
