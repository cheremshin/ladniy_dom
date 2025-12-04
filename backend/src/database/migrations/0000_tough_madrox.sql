CREATE TYPE "public"."product_status" AS ENUM('draft', 'active', 'out_of_stock', 'discounted');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'admin');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"description" text,
	"logo_url" text,
	"country" varchar(64),
	"website" varchar(256),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "title_check" CHECK ((title)::text <> ''::text),
	CONSTRAINT "slug_check" CHECK ((slug)::text <> ''::text),
	CONSTRAINT "slug_lowercase_check" CHECK ((slug)::text = lower(slug)::text),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quantity_check" CHECK (quantity >= 1),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"title" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"image_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "title_check" CHECK ((title)::text <> ''::text),
	CONSTRAINT "slug_check" CHECK ((slug)::text <> ''::text),
	CONSTRAINT "slug_lowercase_check" CHECK ((slug)::text = lower(slug)::text),
	CONSTRAINT "sort_order_check" CHECK (sort_order >= 0),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt_text" varchar(256),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "url_check" CHECK ((url)::text <> ''::text),
	CONSTRAINT "alt_text_check" CHECK (alt_text IS NULL OR (alt_text)::text <> ''::text),
	CONSTRAINT "sort_order_check" CHECK (sort_order >= 0),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(512) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"category_id" uuid NOT NULL,
	"brand_id" uuid NOT NULL,
	"description" text,
	"sku" varchar(64) NOT NULL,
	"status" "product_status" DEFAULT 'draft' NOT NULL,
	"base_price" numeric(10, 2) NOT NULL,
	"discount_price" numeric(10, 2),
	"cost_price" numeric(10, 2) NOT NULL,
	"specifications" jsonb,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"warranty_months" integer DEFAULT 0 NOT NULL,
	"metaTitle" text,
	"metaDescription" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "title_check" CHECK ((title)::text <> ''::text),
	CONSTRAINT "slug_check" CHECK ((slug)::text <> ''::text),
	CONSTRAINT "slug_lowercase_check" CHECK (slug = lower(slug)),
	CONSTRAINT "base_price_positive" CHECK (base_price >= 0),
	CONSTRAINT "cost_price_positive" CHECK (cost_price >= 0),
	CONSTRAINT "discount_price_check" CHECK (discount_price IS NULL OR discount_price < base_price),
	CONSTRAINT "stock_non_negative" CHECK (stock_quantity >= 0),
	CONSTRAINT "warranty_non_negative" CHECK (warranty_months >= 0),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "specification_definitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(256) NOT NULL,
	"display_name" varchar(256) NOT NULL,
	"description" text,
	"unit" varchar(32),
	"is_filterable" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "specification_definitions_key_key" UNIQUE("key"),
	CONSTRAINT "key_check" CHECK (key <> ''::text),
	CONSTRAINT "display_name_check" CHECK (display_name <> ''::text),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"password_hash" varchar(128) NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"nickname" varchar(50) NOT NULL,
	"phone" varchar(15),
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login" timestamp,
	"failed_login_attempts" integer DEFAULT 0 NOT NULL,
	"password_reset_token" varchar(128),
	"password_reset_token_expires" timestamp,
	"temp_verification_code" varchar(6),
	"temp_code_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_nickname_key" UNIQUE("nickname"),
	CONSTRAINT "email_check" CHECK ((email)::text <> ''::text),
	CONSTRAINT "password_hash_check" CHECK ((password_hash)::text <> ''::text),
	CONSTRAINT "role_check" CHECK (role = ANY(ARRAY['customer'::user_role, 'admin'::user_role])),
	CONSTRAINT "failed_login_attempts_check" CHECK (failed_login_attempts >= 0 AND failed_login_attempts <= 3),
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP),
	CONSTRAINT "updated_at_check" CHECK ("updated_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE "wishlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "created_at_check" CHECK ("created_at" <= CURRENT_TIMESTAMP)
);
--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "brands_title_key" ON "brands" USING btree (lower(title));--> statement-breakpoint
CREATE UNIQUE INDEX "brands_slug_key" ON "brands" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "brands_title_index" ON "brands" USING btree ("title");--> statement-breakpoint
CREATE INDEX "brands_slug_index" ON "brands" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "brands_is_active_index" ON "brands" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "cart_items_user_product_key" ON "cart_items" USING btree ("user_id","product_id");--> statement-breakpoint
CREATE INDEX "cart_items_user_id_index" ON "cart_items" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_key" ON "categories" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "categories_parent_id_index" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "categories_slug_index" ON "categories" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "categories_is_active_index" ON "categories" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "categories_parent_active_order_index" ON "categories" USING btree ("parent_id","is_active","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "product_images_url_key" ON "product_images" USING btree ("url");--> statement-breakpoint
CREATE UNIQUE INDEX "product_images_primary_key" ON "product_images" USING btree ("product_id") WHERE is_primary = true;--> statement-breakpoint
CREATE INDEX "product_images_product_id_index" ON "product_images" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "products_sku_key" ON "products" USING btree ("sku");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_key" ON "products" USING btree (lower(slug));--> statement-breakpoint
CREATE INDEX "products_category_id_index" ON "products" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "products_brand_id_index" ON "products" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "products_status_index" ON "products" USING btree ("status");--> statement-breakpoint
CREATE INDEX "products_is_featured_index" ON "products" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "products_base_price_index" ON "products" USING btree ("base_price");--> statement-breakpoint
CREATE INDEX "products_discount_price_index" ON "products" USING btree ("discount_price");--> statement-breakpoint
CREATE INDEX "products_specifications_gin_index" ON "products" USING gin ("specifications");--> statement-breakpoint
CREATE INDEX "products_active_catalog_index" ON "products" USING btree ("category_id","status","base_price") WHERE status = 'active' AND deleted_at IS NULL;--> statement-breakpoint
CREATE INDEX "products_sku_index" ON "products" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "specification_definitions_key_index" ON "specification_definitions" USING btree ("key");--> statement-breakpoint
CREATE INDEX "specification_definitions_is_filterable_index" ON "specification_definitions" USING btree ("is_filterable");--> statement-breakpoint
CREATE INDEX "specification_definitions_is_active_index" ON "specification_definitions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "specification_definitions_filterable_active_index" ON "specification_definitions" USING btree ("is_filterable","is_active") WHERE is_filterable = true AND is_active = true;--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "wishlist_user_product_key" ON "wishlist" USING btree ("user_id","product_id");--> statement-breakpoint
CREATE INDEX "wishlist_user_id_index" ON "wishlist" USING btree ("user_id");