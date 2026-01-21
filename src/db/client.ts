import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString = import.meta.env.DIRECTUS_DATABASE_URL
if (!connectionString) {
  throw new Error('DIRECTUS_DATABASE_URL is not set')
}

const pool = new Pool({ connectionString })

export const db = drizzle(pool, { schema })
