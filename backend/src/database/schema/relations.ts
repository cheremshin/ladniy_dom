import { relations } from 'drizzle-orm';
import { users } from './users';
import { products } from './products';
import { categories } from './categories';
import { brands } from './brands';
import { cartItems } from './cart-items';
import { wishlist } from './wishlist';
import { productImages } from './product-images';

export const usersRelations = relations(users, ({ many }) => ({
    cartItems: many(cartItems),
    wishlistItems: many(wishlist),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
    brand: one(brands, {
        fields: [products.brandId],
        references: [brands.id],
    }),
    images: many(productImages),
    cartItems: many(cartItems),
    wishlistItems: many(wishlist),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    parent: one(categories, {
        fields: [categories.parentId],
        references: [categories.id],
        relationName: 'parentCategory',
    }),
    children: many(categories, {
        relationName: 'parentCategory',
    }),
    products: many(products),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
    products: many(products),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id],
    }),
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
    user: one(users, {
        fields: [wishlist.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [wishlist.productId],
        references: [products.id],
    }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id],
    }),
}));
