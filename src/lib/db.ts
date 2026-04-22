import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL ?? '';

export const isDbConfigured = connectionString.length > 0;

export function getDb() {
  if (!isDbConfigured) {
    throw new Error('DATABASE_URL no está configurada');
  }
  return neon(connectionString);
}
