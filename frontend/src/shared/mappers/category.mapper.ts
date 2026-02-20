import {
    CatalogCategory,
    CatalogCategoryDTO,
    CategoryListItem,
    CategoryListItemDTO,
} from '../entities/category.types';
import { mapImageUrlValueToRealUrl } from './image-url.mapper';

export function mapCategoryListItemDTOToCategoryListItem(
    dto: CategoryListItemDTO,
): CategoryListItem {
    return {
        id: dto.id,
        slug: dto.slug,
        title: dto.title,
        imageUrl: dto.imageUrl ? mapImageUrlValueToRealUrl(dto.imageUrl) : null,
        sortOrder: dto.sortOrder,
    };
}

export function mapCatalogCategoryDTOToCatalogCategory(
    dto: CatalogCategoryDTO,
): CatalogCategory {
    return {
        title: dto.title,
        imageUrl: dto.imageUrl ? mapImageUrlValueToRealUrl(dto.imageUrl) : null,
        productTypes: dto.productTypes.map((item) => ({
            id: item.id,
            slug: item.slug,
            plural: item.plural,
        })),
    };
}
