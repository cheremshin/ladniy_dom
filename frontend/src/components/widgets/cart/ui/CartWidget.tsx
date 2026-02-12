'use client';

import { useCartItems } from '@/components/features/cart/model/cart.selectors';
import { ProductsListView } from '@/components/widgets/productsCatalog/ui/components/ProductsListView';
import { ProductPreview } from '@/shared/entities/product.types';
import { FC, useMemo } from 'react';
import { EmptyCard } from '../components/EmptyCard';
import { TotalCard } from '../components/TotalCard';
import { formatPrice } from '@/shared/entities/common.types';

import './CartWidget.styles.css';

type PropsT = {
    initialProducts: ProductPreview[];
};

export const CartWidget: FC<PropsT> = ({ initialProducts }) => {
    const cartItems = useCartItems();

    const visibleProducts = useMemo(() => {
        return initialProducts.filter((product) => cartItems.has(product.id));
    }, [initialProducts, cartItems]);

    const [totalPrice, totalAmount] = useMemo(() => {
        let currentPrice = 0, currentAmount = 0;

        visibleProducts.forEach((item) => {
            const realPrice = item.rawPricing.discountPrice ?? item.rawPricing.base;
            const amount = cartItems.get(item.id)!;
            currentPrice += realPrice * amount;
            currentAmount += amount;
        });

        return [formatPrice(currentPrice), currentAmount];
    }, [cartItems, visibleProducts]);

    return (
        <div className="cart-container">
            {visibleProducts.length > 0 ? (
                <>
                    <ProductsListView
                        products={visibleProducts}
                        productPageBaseUrl="/product"
                        view="cart"
                    />
                    <TotalCard
                        totalPrice={totalPrice}
                        totalAmount={totalAmount}
                    />
                </>
            ) : (
                <EmptyCard />
            )}
        </div>
    );
};
