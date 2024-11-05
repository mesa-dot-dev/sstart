import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { Resource } from "sst";
import * as schema from "./todo.sql";

const pool = new pg.Pool({
  host: Resource.TSSDatabase.host,
  port: Resource.TSSDatabase.port,
  user: Resource.TSSDatabase.username,
  password: Resource.TSSDatabase.password,
  database: Resource.TSSDatabase.database,
});

export const db = drizzle(pool, { schema });
