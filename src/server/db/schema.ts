import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "timestamp" }),
    unsubscribed: integer("unsubscribed", { mode: "timestamp" }),
    confirmationToken: text("confirmation_token").unique(),
    trafficSource: text("traffic_source"),
    device: text("device", { enum: ["mobile", "desktop"] }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [check("email_format_check", sql`${table.email} GLOB '*@*.*'`)],
);

export type SubscriberInsert = typeof subscribers.$inferInsert;
