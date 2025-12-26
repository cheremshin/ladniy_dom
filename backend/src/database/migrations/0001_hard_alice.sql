CREATE TABLE "product_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(128) NOT NULL,
	"slug" varchar(128) NOT NULL,
	"category_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "title_check" CHECK ((title)::text <> ''::text),
	CONSTRAINT "slug_check" CHECK ((slug)::text <> ''::text)
);
--> statement-breakpoint
ALTER TABLE "specification_definitions" ADD COLUMN "product_type_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "product_types" ADD CONSTRAINT "product_types_category_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "product_types_title_key" ON "product_types" USING btree (lower(title));--> statement-breakpoint
CREATE UNIQUE INDEX "product_types_slug_ky" ON "product_types" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "product_types_title_index" ON "product_types" USING btree ("title");--> statement-breakpoint
CREATE INDEX "product_types_category_index" ON "product_types" USING btree ("category_id");