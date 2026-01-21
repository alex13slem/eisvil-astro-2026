import type { Config } from 'drizzle-kit'

let connectionString = process.env.DIRECTUS_DATABASE_URL
if (!connectionString) {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env
  if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_DATABASE) {
    throw new Error('Missing DIRECTUS_DATABASE_URL or DB_* environment variables')
  }

  connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config
