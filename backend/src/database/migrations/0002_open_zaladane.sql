DROP INDEX "brands_slug_index";--> statement-breakpoint
DROP INDEX "product_types_slug_ky";--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "product_type_id" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "public"."product_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "product_types_slug_key" ON "product_types" USING btree (lower(slug));--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "deleted_at_check" CHECK ("deleted_at" <= CURRENT_TIMESTAMP);