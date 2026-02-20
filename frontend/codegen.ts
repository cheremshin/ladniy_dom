import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql',
    documents: [
        'src/shared/api/graphql/fragments.ts',
        'src/shared/api/graphql/queries/**/*.ts',
        'src/shared/api/graphql/mutations/*.ts',
    ],
    ignoreNoDocuments: true,
    generates: {
        'src/shared/api/graphql/__generated__/types.ts': {
            plugins: ['typescript', 'typescript-operations'],
            config: {
                skipTypename: false,
                enumsAsTypes: true,
                futureProofEnums: true,
                scalars: {
                    DateTime: 'string',
                    JSON: 'Record<string, unknown>',
                },
            },
        },
    },
};

export default config;
