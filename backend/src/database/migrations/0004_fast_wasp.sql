CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(512) NOT NULL,
	"mime_type" varchar(256) NOT NULL,
	"size" integer NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "name_check" CHECK ((name)::text <> ''::text),
	CONSTRAINT "mime_type_check" CHECK ((mime_type)::text <> ''::text),
	CONSTRAINT "size_check" CHECK (size > 0),
	CONSTRAINT "path_check" CHECK ((path)::text <> ''::text),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "deleted_at_check" CHECK ("deleted_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE INDEX "files_path_index" ON "files" USING btree ("path");