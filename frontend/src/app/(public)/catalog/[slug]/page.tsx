import { notFound } from 'next/navigation';
import { mapCatalogCategoryDTOtoCatalogCategory } from '@/shared/mappers/category.mappers';
import { mapProductToProductPreview } from '@/shared/mappers/product.mapper';
import { getCatalogCategory } from '@/server/queries/categories';
import { getCatalogProducts } from '@/server/queries/products';
import { CategoryCard } from '@/components/entities/category/categoryCard';
import { ProductsCatalog, type LayoutType } from '@/components/widgets/productsCatalog';
import { ProductTypesList } from '@/components/widgets/productTypesList';

import './page.styles.css';

export default async function Page({ params, searchParams }: Readonly<PageProps<'/catalog/[slug]'>>) {
    const { slug } = await params;
    const { productType, layout = 'list' } = await searchParams;

    const categoryDTO = await getCatalogCategory(slug);

    if (!categoryDTO) {
        notFound();
    }

    const catalogCategory = mapCatalogCategoryDTOtoCatalogCategory(categoryDTO);

    if (catalogCategory.productTypes.length === 0) {
        notFound();
    }

    const initialProductType = catalogCategory.productTypes.find((item) => item.slug === productType) ?? catalogCategory.productTypes[0];

    const productsDTO = await getCatalogProducts({ productTypeId: initialProductType.id });
    const products = productsDTO?.items.map((item) => mapProductToProductPreview(item)) ?? [];

    return (
        <main className="catalog-page">
            <div className="catalog-page__header">
                <CategoryCard
                    title={catalogCategory.title}
                    imageUrl={catalogCategory.imageUrl ?? null}
                />
            </div>
            <ProductTypesList
                productTypes={catalogCategory.productTypes}
                initialProductType={initialProductType}
            />
            <ProductsCatalog
                productType={initialProductType}
                totalProductsCount={productsDTO?.meta.total ?? 0}
                products={products}
                layout={layout as LayoutType}
            />
        </main>
    );
}
