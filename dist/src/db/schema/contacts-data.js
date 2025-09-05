import { integer, pgTable, serial, timestamp, varchar, } from "drizzle-orm/pg-core";
import { contacts } from "./contacts.js";
export const contacts_data = pgTable("contacts_data", {
    id: serial().primaryKey(),
    contact_id: integer()
        .notNull()
        .references(() => contacts.id),
    field_type: varchar(),
    field_key: varchar().notNull(),
    label: varchar().notNull(),
    value: varchar().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});
