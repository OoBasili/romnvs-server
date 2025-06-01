import 'reflect-metadata';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';

function readSecret(path?: string): string {
  if (path == undefined) return '';
  try {
    return readFileSync(path, 'utf8').trim();
  } catch (err) {
    throw new Error(`Failed to read secret: ${path}`);
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: readSecret(process.env.DB_USERNAME_FILE),
  port: parseInt(readSecret(process.env.DB_PORT_FILE)),
  username: readSecret(process.env.DB_USERNAME_FILE),
  password: readSecret(process.env.DB_PASSWORD_FILE),
  database: readSecret(process.env.DB_NAME_FILE),
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});
