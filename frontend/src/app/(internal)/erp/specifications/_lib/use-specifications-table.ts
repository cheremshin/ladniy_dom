'use client';

import { useCallback, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';

import { useTablePagination, toTableMeta } from '@/app/(internal)/erp/_lib';
import { SPECIFICATION_DEFINITIONS } from '@/shared/api/graphql/queries';
import { SOFT_DELETE_SPECIFICATION_DEFINITION } from '@/shared/api/graphql/mutations';
import type {
    SpecificationDefinitionsQuery,
    SpecificationDefinitionsQueryVariables,
    SoftDeleteSpecificationDefinitionMutation,
    SoftDeleteSpecificationDefinitionMutationVariables,
} from '@/shared/api/graphql/__generated__/types';

import type { SpecificationDefinition } from './types';
import { SPECIFICATIONS_PAGE_SIZE } from './constants';
import { useSpecificationsPageContext } from './specifications-page.context';

type UseSpecificationsTableParams = {
    productTypeId: string | null;
};

export function useSpecificationsTable({ productTypeId }: UseSpecificationsTableParams) {
    const { updateModal } = useSpecificationsPageContext();
    const { openUpdate, setUpdateModalItem } = updateModal;

    const [fetchSpecifications] = useLazyQuery<
        SpecificationDefinitionsQuery,
        SpecificationDefinitionsQueryVariables
    >(SPECIFICATION_DEFINITIONS);

    const [deleteSpecification] = useMutation<
        SoftDeleteSpecificationDefinitionMutation,
        SoftDeleteSpecificationDefinitionMutationVariables
    >(SOFT_DELETE_SPECIFICATION_DEFINITION);

    const fetchPage = useCallback(async (page: number, limit: number) => {
        const result = await fetchSpecifications({
            variables: {
                page,
                limit,
                includeInactive: true,
                productTypeId: productTypeId ?? undefined,
            },
        });
        if (result.error) throw result.error;
        const data = result.data?.specificationDefinitions;
        if (!data) throw new Error('Нет данных');
        return {
            items: data.items,
            meta: toTableMeta(data.meta),
        };
    }, [fetchSpecifications, productTypeId]);

    const pagination = useTablePagination<SpecificationDefinition>({
        pageSize: SPECIFICATIONS_PAGE_SIZE,
        fetchPage,
    });

    const handleEdit = useCallback((item: SpecificationDefinition) => {
        setUpdateModalItem(item);
        openUpdate();
    }, [openUpdate, setUpdateModalItem]);

    const handleDelete = useCallback(
        async (item: SpecificationDefinition) => {
            if (
                !confirm(
                    `Вы действительно хотите удалить спецификацию: "${item.displayName}"?`,
                )
            ) {
                return;
            }
            try {
                await deleteSpecification({
                    variables: { id: item.id },
                });
                await pagination.refetch();
            } catch (err) {
                console.error('Failed to delete specification:', err);
                alert(
                    'Не удалось удалить спецификацию, попробуйте позже или обратитесь в поддержку.',
                );
            }
        },
        [deleteSpecification, pagination],
    );

    return useMemo(
        () => ({
            ...pagination,
            handleEdit,
            handleDelete,
        }),
        [pagination, handleEdit, handleDelete],
    );
}
