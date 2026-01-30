-- Custom SQL migration file, put your code below! --
DROP TRIGGER IF EXISTS specification_definitions_set_updated_at ON specification_definitions;
DROP TRIGGER IF EXISTS product_types_set_updated_at ON product_types;
DROP TRIGGER IF EXISTS users_set_updated_at ON users;
DROP TRIGGER IF EXISTS files_set_updated_at ON files;
DROP TRIGGER IF EXISTS products_set_updated_at ON products;
DROP TRIGGER IF EXISTS categories_set_updated_at ON categories;
DROP TRIGGER IF EXISTS brands_set_updated_at ON brands;

DROP FUNCTION IF EXISTS set_updated_at();

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- brands
DROP TRIGGER IF EXISTS brands_set_updated_at ON brands;
CREATE TRIGGER brands_set_updated_at
BEFORE UPDATE ON brands
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- categories
DROP TRIGGER IF EXISTS categories_set_updated_at ON categories;
CREATE TRIGGER categories_set_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- products
DROP TRIGGER IF EXISTS products_set_updated_at ON products;
CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- files
DROP TRIGGER IF EXISTS files_set_updated_at ON files;
CREATE TRIGGER files_set_updated_at
BEFORE UPDATE ON files
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- users
DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- product_types
DROP TRIGGER IF EXISTS product_types_set_updated_at ON product_types;
CREATE TRIGGER product_types_set_updated_at
BEFORE UPDATE ON product_types
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- specification_definitions
DROP TRIGGER IF EXISTS specification_definitions_set_updated_at ON specification_definitions;
CREATE TRIGGER specification_definitions_set_updated_at
BEFORE UPDATE ON specification_definitions
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
