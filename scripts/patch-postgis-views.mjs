#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const astroDir = path.resolve(__dirname, '..');
const schemaPath = path.join(astroDir, 'src', 'db', 'schema.ts');

if (!existsSync(schemaPath)) {
  console.error(`schema.ts not found at ${schemaPath}`);
  process.exit(1);
}

const original = readFileSync(schemaPath, 'utf8');
let updated = original;

// Remove Drizzle-generated TODO comments for Postgres name type parsing.
updated = updated.replace(/^\s*\/\/ TODO: failed to parse database type 'name'\s*\n/gm, '');

const replacements = [
  ['unknown("f_table_catalog")', 'varchar("f_table_catalog", { length: 63 })'],
  ['unknown("f_table_schema")', 'varchar("f_table_schema", { length: 63 })'],
  ['unknown("f_table_name")', 'varchar("f_table_name", { length: 63 })'],
  ['unknown("f_geography_column")', 'varchar("f_geography_column", { length: 63 })'],
  ['unknown("f_geometry_column")', 'varchar("f_geometry_column", { length: 63 })'],
];

for (const [from, to] of replacements) {
  updated = updated.split(from).join(to);
}

if (updated === original) {
  console.log('No PostGIS view patches needed.');
  process.exit(0);
}

writeFileSync(schemaPath, updated, 'utf8');
console.log('Patched PostGIS view columns in schema.ts');