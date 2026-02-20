ALTER TABLE "files" ADD COLUMN "entity_type" varchar(64);--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "entity_id" uuid;