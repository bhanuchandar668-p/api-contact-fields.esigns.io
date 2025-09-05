ALTER TABLE "contact_fields" ALTER COLUMN "label" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_fields" ADD COLUMN "properties" jsonb;