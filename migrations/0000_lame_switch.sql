CREATE TABLE "contact_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"resource_id" varchar NOT NULL,
	"owner_id" varchar,
	"user_id" varchar,
	"field_type" varchar,
	"field_key" varchar NOT NULL,
	"label" varchar,
	"properties" jsonb,
	"value" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
