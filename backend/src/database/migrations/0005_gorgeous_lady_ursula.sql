ALTER TABLE "files" ADD COLUMN "upload_date" date DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "files_upload_date_index" ON "files" USING btree ("upload_date");