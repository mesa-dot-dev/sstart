import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resource } from "sst";
import { db } from "~/database/db";

export const auth = betterAuth({
  secret: Resource.BetterAuthSecret.value,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "https://d1p64y1v9iordo.cloudfront.net",
    "https://dadc32hngl0az.cloudfront.net",
    "https://d1l6gad6488u49.cloudfront.net",
  ],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
});
