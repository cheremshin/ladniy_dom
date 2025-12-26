import * as dotenv from 'dotenv';
import { AppModule } from '@/modules/app.module';
import { NestFactory } from '@nestjs/core';
import { hash } from 'bcrypt';
import { Database } from '../database.types';
import { DATABASE_CONNECTION } from '../database.provider';
import { brands, categories, products, productTypes, users } from '../schema';

dotenv.config();

async function generateTestData() {
    console.log('Запуск скрипта генерации тестовых данных');

    const app = await NestFactory.createApplicationContext(AppModule);
    const db = app.get<Database>(DATABASE_CONNECTION);

    console.log('Создание категорий...');
    const parentCategories = [
        { title: 'Крупная бытовая техника', slug: 'krypnaya-bitovaya-tehnika' },
        { title: 'Приготовление блюд', slug: 'prigotovlenie-blud' },
        { title: 'Блендеры, миксеры, измельчители', slug: 'blendery-miksery-izmelchiteli' },
        { title: 'Кофемашины, кофеварки', slug: 'kofemachiny-kofevarki' },
    ];

    const insertedParentCategories = await db
        .insert(categories)
        .values(
            parentCategories.map((category, index) => ({
                title: category.title,
                slug: category.slug,
                sortOrder: index,
                isActive: true,
            })),
        )
        .returning();

    console.log(`Создано ${insertedParentCategories.length} родительских категорий`);

    const subCategories = [
        {
            title: 'Холодильники',
            slug: 'holodilniki',
            parentId: insertedParentCategories[0].id,
        },
        {
            title: 'Посудомоечные машины',
            slug: 'posudomoechnie-machiny',
            parentId: insertedParentCategories[0].id,
        },
        {
            title: 'Стиральные машины',
            slug: 'stiralnie-machiny',
            parentId: insertedParentCategories[0].id,
        },
        {
            title: 'Микроволновые печи',
            slug: 'mikrovolnovie-pechi',
            parentId: insertedParentCategories[1].id,
        },
        {
            title: 'Мультиварки',
            slug: 'multivarki',
            parentId: insertedParentCategories[1].id,
        },
        {
            title: 'Блендеры',
            slug: 'blendery',
            parentId: insertedParentCategories[2].id,
        },
        {
            title: 'Мясорубки',
            slug: 'myasorubki',
            parentId: insertedParentCategories[2].id,
        },
        {
            title: 'Миксеры',
            slug: 'miksery',
            parentId: insertedParentCategories[2].id,
        },
        {
            title: 'Кофемашины',
            slug: 'kofemachiny',
            parentId: insertedParentCategories[3].id,
        },
        {
            title: 'Кофеварки',
            slug: 'kofevarki',
            parentId: insertedParentCategories[3].id,
        },
    ];

    const insertedSubCategories = await db
        .insert(categories)
        .values(
            subCategories.map((category, index) => ({
                title: category.title,
                parentId: category.parentId,
                slug: category.slug,
                sortOrder: index,
                isActive: true,
            })),
        )
        .returning();

    console.log(`Создано ${insertedSubCategories.length} подкатегорий`);

    const brandsData = [
        {
            title: 'Bosch',
            slug: 'bosch',
            country: 'Германия',
        },
        {
            title: 'Samsung',
            slug: 'samsung',
            country: 'Южная Корея',
        },
        {
            title: 'Redmond',
            slug: 'redmond',
            country: 'Россия',
        },
        {
            title: 'Vitek',
            slug: 'vitek',
            country: 'Россия',
        },
        {
            title: 'Polaris',
            slug: 'polaris',
            country: 'Великобритания',
        },
    ];

    const insertedBrands = await db.insert(brands).values(brandsData).returning();
    console.log(`Создано ${insertedBrands.length} брендов`);

    const productTypesData = [
        {
            title: 'холодильник',
            slug: 'holodilnik',
            categoryId: insertedSubCategories[0].id,
        },
        {
            title: 'мультиварка',
            slug: 'multivarka',
            categoryId: insertedSubCategories[5].id,
        },
    ];

    const insertedProductTypes = await db.insert(productTypes).values(productTypesData).returning();
    console.log(`Создано ${insertedProductTypes.length} типов товаров`);

    const usersData = [
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

    const insertedUsers = await db.insert(users).values(usersData).returning();
    console.log(`Создано ${insertedUsers.length} пользователей`);

    const productsData = [
        {
            title: 'Холодильник двухкамерный Bosch KGN86AW32U белый',
            slug: 'holodilnik-dvuhkamernyi-bosch-kgn86aw32u-belyi',
            categoryId: insertedSubCategories[0].id,
            brandId: insertedBrands[0].id,
            description:
                'Холодильник с морозильником Bosch KGN86AW32U белого цвета имеет увеличенную холодильную и морозильную камеру, где можно хранить продукты для семьи из 3-5 человек.',
            sku: 'KGN86AW32U',
            status: 'active' as const,
            basePrice: '138999',
            costPrice: '80000',
            stockQuantity: 4,
            isFeatured: false,
            warrantyMonths: 12,
            specifications: {
                productType: 'холодильник',
                model: 'Bosch KGN86AW32U',
                color: 'белый',
                numberOfCameras: 'двухкамерный',
                volume: '682 л',
                energyConsumption: '378 кВтч/год',
                maxFreezerTemperature: '-16 °C',
            },
        },
        {
            title: 'Холодильник двухкамерный Samsung RB33J3515WW/EF инвенторный белый',
            slug: 'holodilnik-samsung-rb34j3515ww-ef-2-hkamern-belyi',
            categoryId: insertedSubCategories[0].id,
            brandId: insertedBrands[1].id,
            description:
                'Зона Cool Select+ позволяет вам настроить холодильник в соответствии с вашими текущими потребностями, регулируя температуру морозильника для определенного типа продуктов.',
            sku: 'RB33J3515WW',
            status: 'active' as const,
            basePrice: '75250',
            costPrice: '47600',
            stockQuantity: 7,
            isFeatured: false,
            warrantyMonths: 12,
            specifications: {
                productType: 'холодильник',
                model: 'Samsung RB33J3515WW/EF',
                color: 'белый',
                numberOfCameras: 'двухкамерный',
                volume: '339 л',
                energyConsumption: '253 кВтч/год',
            },
        },
        {
            title: 'Мультварка Redmond RMC-M95 черный',
            slug: 'multivarka-redmond-rmc-m95-cerniy',
            categoryId: insertedSubCategories[5].id,
            brandId: insertedBrands[2].id,
            description:
                'Мультиварка Redmond RMC-M95 станет отличным приобретением для пользователей, не располагающих большим количеством свободного места на кухне, ведь это устройство смогло объединить в себе функционал сразу нескольких представителей кухонной техники.',
            sku: 'RMC-M95',
            status: 'active' as const,
            basePrice: '7399',
            costPrice: '3500',
            stockQuantity: 30,
            isFeatured: true,
            warrantyMonths: 12,
            specifications: {
                productType: 'мультиварка',
                model: 'Redmond RMC-M95',
                color: 'черный',
                power: '1000 Вт',
                maxVolume: '5 л',
                usefulVolume: '3.5 л',
                material: ['металл', 'пластик'],
                nonStickBowlCoating: 'керамика',
                modes: ['выпечка', 'десерт', 'жарка', 'йогурт'],
            },
        },
    ];

    const insertedProducts = await db.insert(products).values(productsData).returning();
    console.log(`Создано ${insertedProducts.length} товаров`);

    await app.close();
}

generateTestData()
    .then(() => {
        process.exit(0);
    })
    .catch((error: any) => {
        console.log(`Генерация данных прервана ошибкой: ${error}`);
        process.exit(1);
    });
