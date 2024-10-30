import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./app/**/*.sql.ts"],
  out: "./app/database/migrations/",
  dbCredentials: {
    host: Resource.TssDatabase.host,
    port: Resource.TssDatabase.port,
    user: Resource.TssDatabase.username,
    password: Resource.TssDatabase.password,
    database: Resource.TssDatabase.database,
  },
});
