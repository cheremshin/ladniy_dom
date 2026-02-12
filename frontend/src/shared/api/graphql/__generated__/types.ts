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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
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
  productTypes: Array<ProductType>;
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
  specifications?: InputMaybe<Array<SpecificationValueInput>>;
  status?: ProductStatus;
  stockQuantity?: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  warrantyMonths?: Scalars['Int']['input'];
};

export type CreateProductTypeInput = {
  categoryId: Scalars['ID']['input'];
  plural: Scalars['String']['input'];
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

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: UserRole;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attachProductImage: ProductImage;
  createBrand: Brand;
  createCategory: Category;
  createProduct: Product;
  createProductType: ProductType;
  createSpecificationDefinition: SpecificationDefinition;
  createUser: User;
  detachProductImage: ProductImage;
  hardDeleteBrand: Brand;
  hardDeleteCategory: Category;
  hardDeleteProduct: Product;
  hardDeleteProductType: ProductType;
  hardDeleteSpecificationDefinition: SpecificationDefinition;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  register: User;
  restoreBrand: Brand;
  restoreCategory: Category;
  restoreProduct: Product;
  restoreProductType: ProductType;
  restoreSpecificationDefinition: SpecificationDefinition;
  restoreUser: User;
  setProductPrimaryImage: ProductImage;
  softDeleteBrand: Brand;
  softDeleteCategory: Category;
  softDeleteProduct: Product;
  softDeleteProductType: ProductType;
  softDeleteSpecificationDefinition: SpecificationDefinition;
  softDeleteUser: User;
  toggleUserFavourite: UserFavourite;
  updateBrand: Brand;
  updateCategory: Category;
  updateProduct: Product;
  updateProductType: ProductType;
  updateProfileInfo: User;
  updateSpecificationDefinition: SpecificationDefinition;
  updateUser: User;
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


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInputPublic;
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


export type MutationRestoreUserArgs = {
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


export type MutationSoftDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleUserFavouriteArgs = {
  productId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
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


export type MutationUpdateProfileInfoArgs = {
  input: UpdateUserInputPublic;
};


export type MutationUpdateSpecificationDefinitionArgs = {
  input: UpdateSpecificationDefinitionInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
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

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  items: Array<User>;
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
  specificationDefinitions?: Maybe<Array<ProductSpecificationDefinition>>;
  specifications?: Maybe<Scalars['JSON']['output']>;
  status: ProductStatus;
  stockQuantity: Scalars['Int']['output'];
  title: Scalars['String']['output'];
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

export type ProductSpecificationDefinition = {
  __typename?: 'ProductSpecificationDefinition';
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFilterable: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  unit?: Maybe<Scalars['String']['output']>;
};

export type ProductStatus =
  | 'ACTIVE'
  | 'DISCOUNTED'
  | 'DRAFT'
  | 'OUT_OF_STOCK'
  | '%future added value';

export type ProductType = {
  __typename?: 'ProductType';
  categoryId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  plural: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  brand: Brand;
  brandBySlug: Brand;
  brands: PaginatedBrands;
  categories: PaginatedCategories;
  category: Category;
  categoryBySlug: Category;
  favourites: UserFavourites;
  health: Scalars['String']['output'];
  me: User;
  product: Product;
  productBySlug: Product;
  productType: ProductType;
  productTypeBySlug: ProductType;
  productTypes: PaginatedProductTypes;
  products: PaginatedProducts;
  specificationDefinition: SpecificationDefinition;
  specificationDefinitions: PaginatedSpecificationDefinitions;
  user: User;
  users: PaginatedUsers;
};


export type QueryBrandArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBrandBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryBrandsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryFavouritesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
  productTypeId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterUserInputPublic = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SpecificationDefinition = {
  __typename?: 'SpecificationDefinition';
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isFilterable: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  productTypeId: Scalars['ID']['output'];
  unit?: Maybe<Scalars['String']['output']>;
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
  plural?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Новый пароль (если нужно изменить) */
  newPassword?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type UpdateUserInputPublic = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  nickname: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export type UserFavourite = {
  __typename?: 'UserFavourite';
  id: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type UserFavourites = {
  __typename?: 'UserFavourites';
  items: Array<UserFavourite>;
};

export type UserRole =
  | 'ADMIN'
  | 'CUSTOMER'
  | '%future added value';

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInputPublic;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, nickname: string, phone?: string | null } };

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

export type ToggleUserFavouriteMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
}>;


export type ToggleUserFavouriteMutation = { __typename?: 'Mutation', toggleUserFavourite: { __typename?: 'UserFavourite', id: string, userId: string, productId: string } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'PaginatedCategories', items: Array<{ __typename?: 'Category', id: string, title: string, slug: string, imageUrl?: string | null, sortOrder: number }> } };

export type CategoryBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CategoryBySlugQuery = { __typename?: 'Query', categoryBySlug: { __typename?: 'Category', title: string, imageUrl?: string | null, productTypes: Array<{ __typename?: 'ProductType', id: string, slug: string, plural: string }> } };

export type ProductTypesQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ProductTypesQuery = { __typename?: 'Query', productTypes: { __typename?: 'PaginatedProductTypes', items: Array<{ __typename?: 'ProductType', id: string, slug: string, title: string, plural: string, categoryId: string }> } };

export type CatalogProductsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  brandId?: InputMaybe<Scalars['ID']['input']>;
  productTypeId?: InputMaybe<Scalars['ID']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CatalogProductsQuery = { __typename?: 'Query', products: { __typename?: 'PaginatedProducts', items: Array<{ __typename?: 'Product', id: string, title: string, slug: string, basePrice: number, discountPrice?: number | null, status: ProductStatus, isFeatured: boolean, stockQuantity: number, primaryImage?: { __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean } | null }>, meta: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean } } };

export type ProductPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductPageQuery = { __typename?: 'Query', productBySlug: { __typename?: 'Product', id: string, title: string, slug: string, description?: string | null, sku: string, status: ProductStatus, basePrice: number, discountPrice?: number | null, warrantyMonths: number, specifications?: Record<string, unknown> | null, stockQuantity: number, isFeatured: boolean, metaTitle?: string | null, metaDescription?: string | null, category: { __typename?: 'Category', id: string, title: string, slug: string }, brand: { __typename?: 'Brand', id: string, title: string, slug: string, logoUrl?: string | null }, images?: Array<{ __typename?: 'ProductImage', id: string, url: string, altText?: string | null, sortOrder: number, isPrimary: boolean }> | null, specificationDefinitions?: Array<{ __typename?: 'ProductSpecificationDefinition', key: string, displayName: string, description?: string | null, unit?: string | null }> | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, nickname: string, phone?: string | null, role: UserRole } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, nickname: string, phone?: string | null, role: UserRole } };

export type FavouritesQueryVariables = Exact<{ [key: string]: never; }>;


export type FavouritesQuery = { __typename?: 'Query', favourites: { __typename?: 'UserFavourites', items: Array<{ __typename?: 'UserFavourite', productId: string }> } };
