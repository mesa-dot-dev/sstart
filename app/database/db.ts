import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { Resource } from "sst";
import * as schema from "./todo.sql";

const pool = new pg.Pool({
  host: Resource.TssDatabase.host,
  port: Resource.TssDatabase.port,
  user: Resource.TssDatabase.username,
  password: Resource.TssDatabase.password,
  database: Resource.TssDatabase.database,
});

export const db = drizzle(pool, { schema });
