ALTER TABLE "custom_field_definitions" ADD COLUMN "properties" jsonb;--> statement-breakpoint
ALTER TABLE "custom_field_definitions" DROP COLUMN "options";--> statement-breakpoint
ALTER TABLE "custom_field_definitions" DROP COLUMN "created_at";