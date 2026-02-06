'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useProductsSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get('search') ?? '');

    const handleSearch = useCallback(() => {
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?search=${encodeURIComponent(trimmed)}`);
    }, [query, router]);

    return { query, setQuery, handleSearch };
}
