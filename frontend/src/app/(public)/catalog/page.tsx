import { CategoryLink } from '@/components/features/categoryLink';
import { getCategoriesList } from '@/server/queries/categories';
import { mapCategoryListItemDTOToCategoryListItem } from '@/shared/mappers/category.mapper';
import { Metadata } from 'next';

import './page.styles.css';

export const metadata: Metadata = {
    title: 'Ладный Дом - Категории товаров',
};

export default async function Page() {
    const categories = await getCategoriesList();
    const categoriesData = categories.map(item => mapCategoryListItemDTOToCategoryListItem(item));

    return (
        <main className="categories-page">
            <h2 className="categories-page__title">Категории</h2>
            {categoriesData.map(item => (
                <CategoryLink
                    key={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl ?? null}
                    href={`catalog/${item.slug}`}
                />
            ))}
        </main>
    );
}
