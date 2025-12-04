import { boolean, check, index, pgTable, text, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { notInFutureCheck, timestampDefaultNow } from '../utils/common-fields';

export const specificationDefinitions = pgTable(
    'specification_definitions',
    {
        id: uuid('id').defaultRandom().primaryKey(),

        key: varchar('key', { length: 256 }).notNull(),
        displayName: varchar('display_name', { length: 256 }).notNull(),
        description: text('description'),
        unit: varchar('unit', { length: 32 }),

        isFilterable: boolean('is_filterable').default(false).notNull(),

        isActive: boolean('is_active').default(true).notNull(),

        createdAt: timestampDefaultNow('created_at'),
        updatedAt: timestampDefaultNow('updated_at'),
    },
    (table) => [
        unique('specification_definitions_key_key').on(table.key),

        check('key_check', sql`key <> ''::text`),
        check('display_name_check', sql`display_name <> ''::text`),

        notInFutureCheck('created_at'),
        notInFutureCheck('updated_at'),

        index('specification_definitions_key_index').on(table.key),
        index('specification_definitions_is_filterable_index').on(table.isFilterable),
        index('specification_definitions_is_active_index').on(table.isActive),
        index('specification_definitions_filterable_active_index')
            .on(table.isFilterable, table.isActive)
            .where(sql`is_filterable = true AND is_active = true`),
    ],
);
