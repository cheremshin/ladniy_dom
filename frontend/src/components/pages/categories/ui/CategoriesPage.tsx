import { mapCategoryListItemDTOtoCategoryListItem } from '@/shared/mappers/category.mappers';
import { getCategoriesList } from '@/server/actions/categories';
import { CategoryLink } from '@/components/features/categoryLink';

import './CategoriesPage.styles.css';

export async function CategoriesPage() {
    const categories = await getCategoriesList();
    const categoriesData = categories.map(item => mapCategoryListItemDTOtoCategoryListItem(item));

    return (
        <main className="categories-page">
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
