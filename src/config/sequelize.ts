import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { getEnv } from './getEnv';

const env = getEnv();

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: env.database,
  user: env.user,
  password: env.password,
  host: env.host,
  port: env.port,
});