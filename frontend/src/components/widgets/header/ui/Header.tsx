import { CategoriesLink } from './components/CategoriesLink';
import { HeaderView } from './HeaderView';
import { ProductsSearch } from '@/components/features/productsSearch';

export async function Header() {
    return (
        <HeaderView>
            <CategoriesLink categoriesPageUrl="/catalog" />
            <ProductsSearch />
        </HeaderView>
    );
}
