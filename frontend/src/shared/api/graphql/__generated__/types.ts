export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type AttachImageInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  isPrimary?: Scalars['Boolean']['input'];
  productId: Scalars['ID']['input'];
  sortOrder?: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type Brand = {
  __typename?: 'Brand';
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['ID']['output']>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBrandInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sortOrder?: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateProductInput = {
  basePrice: Scalars['Float']['input'];
  brandId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  costPrice: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountPrice?: InputMaybe<Scalars['Float']['input']>;
  isFeatured?: Scalars['Boolean']['input'];
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  productTypeId: Scalars['ID']['input'];
  sku: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Array<SpecificationValueInput>>;
  status?: ProductStatus;
  stockQuantity?: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  warrantyMonths?: Scalars['Int']['input'];
};

export type CreateProductTypeInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type CreateSpecificationDefinitionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  isFilterable?: Scalars['Boolean']['input'];
  key: Scalars['String']['input'];
  productTypeId: Scalars['ID']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  attachProductImage: ProductImage;
  createBrand: Brand;
  createCategory: Category;
  createProduct: Product;
  createProductType: ProductType;
  createSpecificationDefinition: SpecificationDefinition;
  detachProductImage: ProductImage;
  hardDeleteBrand: Brand;
  hardDeleteCategory: Category;
  hardDeleteProduct: Product;
  hardDeleteProductType: ProductType;
  hardDeleteSpecificationDefinition: SpecificationDefinition;
  restoreBrand: Brand;
  restoreCategory: Category;
  restoreProduct: Product;
  restoreProductType: ProductType;
  restoreSpecificationDefinition: SpecificationDefinition;
  setProductPrimaryImage: ProductImage;
  softDeleteBrand: Brand;
  softDeleteCategory: Category;
  softDeleteProduct: Product;
  softDeleteProductType: ProductType;
  softDeleteSpecificationDefinition: SpecificationDefinition;
  updateBrand: Brand;
  updateCategory: Category;
  updateProduct: Product;
  updateProductType: ProductType;
  updateSpecificationDefinition: SpecificationDefinition;
};


export type MutationAttachProductImageArgs = {
  input: AttachImageInput;
};


export type MutationCreateBrandArgs = {
  input: CreateBrandInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductTypeArgs = {
  input: CreateProductTypeInput;
};


export type MutationCreateSpecificationDefinitionArgs = {
  input: CreateSpecificationDefinitionInput;
};


export type MutationDetachProductImageArgs = {
  imageId: Scalars['ID']['input'];
};


export type MutationHardDeleteBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteProductTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteSpecificationDefinitionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreProductTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreSpecificationDefinitionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetProductPrimaryImageArgs = {
  imageId: Scalars['ID']['input'];
};


export type MutationSoftDeleteBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteProductTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteSpecificationDefinitionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBrandArgs = {
  input: UpdateBrandInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateProductTypeArgs = {
  input: UpdateProductTypeInput;
};


export type MutationUpdateSpecificationDefinitionArgs = {
  input: UpdateSpecificationDefinitionInput;
};

export type PaginatedBrands = {
  __typename?: 'PaginatedBrands';
  items: Array<Brand>;
  meta: PaginationMeta;
};

export type PaginatedCategories = {
  __typename?: 'PaginatedCategories';
  items: Array<Category>;
  meta: PaginationMeta;
};

export type PaginatedProductTypes = {
  __typename?: 'PaginatedProductTypes';
  items: Array<ProductType>;
  meta: PaginationMeta;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  items: Array<Product>;
  meta: PaginationMeta;
};

export type PaginatedSpecificationDefinitions = {
  __typename?: 'PaginatedSpecificationDefinitions';
  items: Array<SpecificationDefinition>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  basePrice: Scalars['Float']['output'];
  brand: Brand;
  brandId: Scalars['ID']['output'];
  category: Category;
  categoryId: Scalars['ID']['output'];
  costPrice: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountPrice?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  isFeatured: Scalars['Boolean']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  primaryImage?: Maybe<ProductImage>;
  productType?: Maybe<ProductType>;
  productTypeId?: Maybe<Scalars['ID']['output']>;
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  specifications?: Maybe<Scalars['JSON']['output']>;
  status: ProductStatus;
  stockQuantity: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  warrantyMonths: Scalars['Int']['output'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  altText?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPrimary: Scalars['Boolean']['output'];
  sortOrder: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type ProductStatus =
  | 'ACTIVE'
  | 'DISCOUNTED'
  | 'DRAFT'
  | 'OUT_OF_STOCK'
  | '%future added value';

export type ProductType = {
  __typename?: 'ProductType';
  categoryId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  brand: Brand;
  brandBySlug: Brand;
  brands: PaginatedBrands;
  categories: PaginatedCategories;
  category: Category;
  categoryBySlug: Category;
  health: Scalars['String']['output'];
  product: Product;
  productBySlug: Product;
  productType: ProductType;
  productTypeBySlug: ProductType;
  productTypes: PaginatedProductTypes;
  products: PaginatedProducts;
  specificationDefinition: SpecificationDefinition;
  specificationDefinitions: PaginatedSpecificationDefinitions;
};


export type QueryBrandArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBrandBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryBrandsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  rootOnly?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductTypeBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductTypesArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  page?: Scalars['Int']['input'];
  productTypeId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
};


export type QuerySpecificationDefinitionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpecificationDefinitionsArgs = {
  displayNameSearch?: InputMaybe<Scalars['String']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  productTypeId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type SpecificationDefinition = {
  __typename?: 'SpecificationDefinition';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isFilterable: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  productTypeId: Scalars['ID']['output'];
  unit?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SpecificationValueInput = {
  key: Scalars['String']['input'];
  value: Scalars['JSON']['input'];
};

export type UpdateBrandInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  brandId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountPrice?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['ID']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Array<SpecificationValueInput>>;
  status?: InputMaybe<ProductStatus>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  warrantyMonths?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductTypeInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSpecificationDefinitionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isFilterable?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogProductsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  brandId?: InputMaybe<Scalars['ID']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CatalogProductsQuery = { __typename?: 'Query', products: { __typename?: 'PaginatedProducts', items: Array<{ __typename?: 'Product', id: string, title: string, slug: string, basePrice: number, discountPrice?: number | null, status: ProductStatus, isFeatured: boolean, stockQuantity: number, productTypeId?: string | null, brandId: string, categoryId: string, primaryImage?: { __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean } | null, images?: Array<{ __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean }> | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean } } };

export type ProductPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductPageQuery = { __typename?: 'Query', productBySlug: { __typename?: 'Product', id: string, title: string, slug: string, description?: string | null, sku: string, status: ProductStatus, basePrice: number, discountPrice?: number | null, warrantyMonths: number, specifications?: Record<string, unknown> | null, stockQuantity: number, isFeatured: boolean, metaTitle?: string | null, metaDescription?: string | null, category: { __typename?: 'Category', id: string, title: string, slug: string }, brand: { __typename?: 'Brand', id: string, title: string, slug: string }, productType?: { __typename?: 'ProductType', id: string, title: string, slug: string } | null, primaryImage?: { __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean } | null, images?: Array<{ __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean }> | null } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, title: string, slug: string, status: ProductStatus, basePrice: number } };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, title: string, basePrice: number, discountPrice?: number | null, status: ProductStatus } };

export type SoftDeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteProductMutation = { __typename?: 'Mutation', softDeleteProduct: { __typename?: 'Product', id: string, status: ProductStatus } };

export type RestoreProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreProductMutation = { __typename?: 'Mutation', restoreProduct: { __typename?: 'Product', id: string, status: ProductStatus } };
