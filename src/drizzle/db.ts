import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
import { Schema } from 'hono';
import "dotenv/config";

const env = process.env.Database_URL;
if (!env) {
   throw Error("DATABASE_URL is not set");
}
console.log("creating neaon client...")

 const sql = neon(process.env.Database_URL!)

//  const db = drizzle(sql);
console.log("initializing drizzleorm...");

export const db = drizzle(sql, { schema, logger: true });
