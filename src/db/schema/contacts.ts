import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial().primaryKey(),
  first_name: varchar().notNull(),
  last_name: varchar().notNull(),
  email: varchar().notNull(),
  phone_number: varchar(),
  address: varchar(),
  company: varchar(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type ContactTable = typeof contacts;
