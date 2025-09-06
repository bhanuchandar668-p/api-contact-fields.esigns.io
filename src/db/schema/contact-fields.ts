import {
  jsonb,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const contact_fields = pgTable(
  "contact_fields",
  {
    id: serial().primaryKey(),
    resource_id: varchar().notNull(),
    owner_id: varchar(),
    user_id: varchar(),
    field_type: varchar(),
    field_key: varchar().notNull(),
    label: varchar(),
    properties: jsonb().$default(() => ({})),
    value: jsonb(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (t) => [uniqueIndex("user_idx").on(t.resource_id, t.user_id)]
);

export type ContactField = typeof contact_fields.$inferSelect;
export type NewContactField = typeof contact_fields.$inferInsert;
export type ContactFieldsTable = typeof contact_fields;
