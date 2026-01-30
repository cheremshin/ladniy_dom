export type ProductImageId = string;

export type ProductImage = Readonly<{
    id: ProductImageId;
    url: string;
    altText: string | null;
    sortOrder: number;
    isPrimary: boolean;
}>;
