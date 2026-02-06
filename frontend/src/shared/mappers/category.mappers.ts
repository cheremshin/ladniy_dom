import { CatalogCategory, CatalogCategoryDTO, CategoryListItem, CategoryListItemDTO } from '../entities/category.types';
import { mapImageUrlValueToRealUrl } from './image-url.mapper';

export function mapCategoryListItemDTOtoCategoryListItem(categoryListItemDTO: CategoryListItemDTO): CategoryListItem {
    return {
        id: categoryListItemDTO.id,
        slug: categoryListItemDTO.slug,
        title: categoryListItemDTO.title,
        imageUrl: categoryListItemDTO.imageUrl ? mapImageUrlValueToRealUrl(categoryListItemDTO.imageUrl) : null,
        sortOrder: categoryListItemDTO.sortOrder,
    };
}

export function mapCatalogCategoryDTOtoCatalogCategory(catalogCategoryDTO: CatalogCategoryDTO): CatalogCategory {
    return {
        title: catalogCategoryDTO.title,
        imageUrl: catalogCategoryDTO.imageUrl ? mapImageUrlValueToRealUrl(catalogCategoryDTO.imageUrl) : null,
        productTypes: catalogCategoryDTO.productTypes.map((item) => ({
            id: item.id,
            plural: item.plural,
        })),
    };
}
