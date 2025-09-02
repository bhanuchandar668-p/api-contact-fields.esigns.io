import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { custom_field_definitions } from "./custom-field-definitions.js";
import { relations } from "drizzle-orm";

export const custom_field_values = pgTable(
  "custom_field_values",
  {
    id: serial().primaryKey(),
    contact_id: varchar().notNull(),
    field_id: integer().references(() => custom_field_definitions.id),
    field_key: varchar().notNull(),
    value: jsonb(),
  },
  (t) => [index("contact_idx").on(t.contact_id)]
);

export const fieldValRelation = relations(custom_field_values, ({ one }) => ({
  custom_field_definition: one(custom_field_definitions, {
    fields: [custom_field_values.field_id],
    references: [custom_field_definitions.id],
  }),
}));

export type CustomFieldValue = typeof custom_field_values.$inferSelect;
export type NewCustomFieldValue = typeof custom_field_values.$inferInsert;
export type CustomFieldValuesTable = typeof custom_field_values;
