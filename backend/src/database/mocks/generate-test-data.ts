import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema';
import {
    brands,
    categories,
    productTypes,
    specificationDefinitions,
    users,
    products,
} from '../schema';
import { Database } from '../database.types';
import { generateSlug } from '@/common/presentation/utils/slug.util';
import { hash } from 'bcrypt';

import brandsJson from './data/brands.sample.json';
import categoriesJson from './data/categories.sample.json';
import specificationDefinitionsJson from './data/specification-defitions.sample.json';
import productsJson from './data/products.sample.json';

dotenv.config();

type CategoryRecord = typeof categories.$inferSelect;
type ProductTypeRecord = typeof productTypes.$inferSelect;
type BrandRecord = typeof brands.$inferSelect;
type SpecificationDefinitionRecord = typeof specificationDefinitions.$inferSelect;
type ProductInsert = typeof products.$inferInsert;

async function seedBrands(db: Database) {
    const data = brandsJson.brands.map((b) => ({
        title: b.title,
        slug: generateSlug(b.title),
        description: b.description,
        country: b.country,
        website: b.website,
    }));

    return await db.insert(brands).values(data).returning();
}

async function seedCategories(db: Database) {
    const data = categoriesJson.categories.map((c) => ({
        title: c.title,
        slug: generateSlug(c.title),
        sortOrder: c.sortOrder,
        isActive: true,
    }));

    return await db.insert(categories).values(data).returning();
}

async function seedProductTypes(db: Database, categories: CategoryRecord[]) {
    const data = categoriesJson.productTypes.map((pt) => {
        const category = categories[pt.categoryId];

        if (!category) {
            throw new Error(`Category with id ${pt.categoryId} not found`);
        }

        return {
            title: pt.title,
            slug: generateSlug(pt.title),
            plural: pt.plural,
            categoryId: category?.id,
        };
    });

    return await db.insert(productTypes).values(data).returning();
}

async function seedSpecificationDefinitions(db: Database, productTypes: ProductTypeRecord[]) {
    const data = specificationDefinitionsJson.specificationDefinitions.map((sd) => {
        const productType = productTypes[Number(sd.productTypeId)];

        if (!productType) {
            throw new Error(`Product type with id ${sd.productTypeId} not found`);
        }

        return {
            productTypeId: productType.id,
            key: sd.key,
            displayName: sd.displayName,
            description: sd.description,
            unit: sd.unit,
            isFilterable: sd.isFilterable,
        };
    });

    return await db.insert(specificationDefinitions).values(data).returning();
}

async function seedUsers(db: Database) {
    const data = [
        {
            email: 'admin@yandex.ru',
            passwordHash: await hash('admin123', 12),
            nickname: 'admin',
            role: 'admin' as const,
            isActive: true,
        },
        {
            email: 'sample@yandex.ru',
            passwordHash: await hash('sample123', 12),
            firstName: 'Иван',
            lastName: 'Иванов',
            isActive: true,
        },
    ];

    return await db.insert(users).values(data).returning();
}

function buildSpecifications(
    productTypeId: string,
    definitions: SpecificationDefinitionRecord[],
    values: Record<string, unknown>,
) {
    const typeDefinitions = definitions.filter(
        (definition) => definition.productTypeId === productTypeId,
    );

    const missingKeys = typeDefinitions
        .map((definition) => definition.key)
        .filter((key) => !(key in values));

    if (missingKeys.length > 0) {
        throw new Error(`Missing specification values for keys: ${missingKeys.join(', ')}`);
    }

    return typeDefinitions.reduce<Record<string, unknown>>((result, definition) => {
        result[definition.key] = values[definition.key];
        return result;
    }, {});
}

async function seedProducts(
    db: Database,
    productTypes: ProductTypeRecord[],
    brands: BrandRecord[],
    specificationDefinitions: SpecificationDefinitionRecord[],
) {
    const data = productsJson.products.map((product) => {
        const productType = productTypes.find((type) => type.title === product.productTypeTitle);

        if (!productType) {
            throw new Error(`Product type not found: ${product.productTypeTitle}`);
        }

        if (!productType.categoryId) {
            throw new Error(`Product type categoryId is missing: ${product.productTypeTitle}`);
        }

        const brand = brands[product.brandIndex];

        if (!brand) {
            throw new Error(`Brand with index ${product.brandIndex} not found`);
        }

        return {
            title: product.title,
            slug: generateSlug(product.title),
            categoryId: productType.categoryId,
            productTypeId: productType.id,
            brandId: brand.id,
            description: product.description,
            sku: product.sku,
            status: product.status as ProductInsert['status'],
            basePrice: product.basePrice,
            discountPrice: product.discountPrice ?? null,
            costPrice: product.costPrice,
            stockQuantity: product.stockQuantity,
            isFeatured: product.isFeatured,
            warrantyMonths: product.warrantyMonths,
            specifications: buildSpecifications(
                productType.id,
                specificationDefinitions,
                product.specifications,
            ),
        };
    });

    return await db.insert(products).values(data).returning();
}

async function generateTestData() {
    console.log('Запуск скрипта генерации тестовых данных');

    const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    const client = postgres(connectionString, {
        ssl: false,
    });
    const db = drizzle(client, { schema });

    const categories = await seedCategories(db);
    console.log(`Создано ${categories.length} категорий`);

    const productTypes = await seedProductTypes(db, categories);
    console.log(`Создано ${productTypes.length} типов продуктов`);

    const brands = await seedBrands(db);
    console.log(`Создано ${brands.length} брендов`);

    const specificationDefinitions = await seedSpecificationDefinitions(db, productTypes);
    console.log(`Создано ${specificationDefinitions.length} определений спецификаций`);

    const users = await seedUsers(db);
    console.log(`Создано ${users.length} пользователей`);

    const seededProducts = await seedProducts(db, productTypes, brands, specificationDefinitions);
    console.log(`Создано ${seededProducts.length} товаров`);

    await client.end();
    console.log('Генерация данных завершена');
}

generateTestData().catch((error) => {
    console.error('Ошибка при генерации данных:', error);
    process.exit(1);
});
