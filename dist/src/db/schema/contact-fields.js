import { jsonb, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
export const contact_fields = pgTable("contact_fields", {
    id: serial().primaryKey(),
    resource_id: varchar().notNull(),
    field_type: varchar(),
    field_key: varchar().notNull(),
    label: varchar(),
    properties: jsonb().$default(() => ({})),
    value: jsonb(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});
