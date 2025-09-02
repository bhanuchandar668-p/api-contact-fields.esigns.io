CREATE TABLE "custom_field_definitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_type" varchar NOT NULL,
	"label" varchar NOT NULL,
	"field_key" varchar NOT NULL,
	"field_type" varchar,
	"options" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "custom_field_definitions_contact_type_unique" UNIQUE("contact_type")
);
--> statement-breakpoint
CREATE TABLE "custom_field_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" varchar NOT NULL,
	"field_id" integer,
	"field_key" varchar NOT NULL,
	"value" jsonb
);
--> statement-breakpoint
ALTER TABLE "custom_field_values" ADD CONSTRAINT "custom_field_values_field_id_custom_field_definitions_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."custom_field_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contact_type_idx" ON "custom_field_definitions" USING btree ("contact_type");--> statement-breakpoint
CREATE INDEX "contact_idx" ON "custom_field_values" USING btree ("contact_id");