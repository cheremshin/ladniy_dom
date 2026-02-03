import { ProductPage } from '@/components/pages/ProductPage';
import { getProductBySlug } from '@/server/actions/products';
import { notFound } from 'next/navigation';

export default async function Page({ params }: Readonly<PageProps<'/product/[slug]'>>) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);
    console.log('[DEV: PRODUCT_BY_SLUG] PRODUCT:', product);

    if (!product) {
        notFound();
    }

    return <ProductPage product={product} />
}
