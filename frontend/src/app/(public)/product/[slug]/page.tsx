import { ReviewsSummary } from '@/components/features/reviewsSummary';
import { ProductDetailsTabs } from '@/components/widgets/productTabs/server/ProductDetailsTabs';
import { getProductBySlug } from '@/server/queries/products';
import { mapProductToProductDetails, mapProductToProductOverview } from '@/shared/mappers/product.mapper';
import { notFound } from 'next/navigation';
import { ProductOverviewCard } from '@/components/entities/product/productOverviewCard';
import { Suspense } from 'react';
import { ProductActions } from '@/components/widgets/productActions';

import './page.styles.css';

const ratingMock = {
    rating: 4.5,
    totalReviews: 213,
};

export default async function Page({ params }: Readonly<PageProps<'/product/[slug]'>>) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const productOverview = mapProductToProductOverview(product);
    const productDetails = mapProductToProductDetails(product);

    return (
        <main className="product-page">
            <div className="product-container">
                <ProductOverviewCard product={productOverview}>
                    <Suspense>
                        <ProductActions
                            productId={productOverview.id}
                            isAvailable={productOverview.stockQuantity > 0}
                        />
                    </Suspense>
                </ProductOverviewCard>
                <div className="product-container__details">
                    <ReviewsSummary
                        rating={ratingMock.rating}
                        totalReviews={ratingMock.totalReviews}
                    />
                    <ProductDetailsTabs product={productDetails} />
                </div>
            </div>
        </main>
    );
}
