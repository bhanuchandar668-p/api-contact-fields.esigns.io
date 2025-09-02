import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { custom_field_values } from "./custom-field-values.js";

export const custom_field_definitions = pgTable(
  "custom_field_definitions",
  {
    id: serial().primaryKey(),
    contact_type: varchar().notNull(),
    label: varchar().notNull(),
    field_key: varchar().notNull(),
    field_type: varchar(),
    value: jsonb(),
    properties: jsonb().$default(() => ({})),
  },
  (t) => [index("contact_type_idx").on(t.contact_type)]
);

export const fieldRelations = relations(
  custom_field_definitions,
  ({ many }) => ({
    custom_field_values: many(custom_field_values),
  })
);

export type CustomField = typeof custom_field_definitions.$inferSelect;
export type NewCustomField = typeof custom_field_definitions.$inferInsert;
export type CustomFieldsTable = typeof custom_field_definitions;
