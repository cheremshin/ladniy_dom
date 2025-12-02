import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    eslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptEslint,
        },
    },
    stylistic.configs.customize({
        commaDangle: 'always-multiline',
        braceStyle: '1tbs',
        indent: 4,
        jsx: true,
        quotes: 'single',
        semi: true,
    }),
    {
        plugins: {
            '@stylistic': stylistic,
            '@typescript-eslint': typescriptEslintPlugin,
        },
        rules: {
            'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],
            '@stylistic/arrow-parens': 'off',
            '@stylistic/eol-last': 'error',
            '@stylistic/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^React$', argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        },
    },
    {
        ignores: ['**/*.d.ts', 'node_modules', '.yarn', '.pnp.cjs', '.pnp.loader.mjs', '.next'],
    },
    ...compat.extends(
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'next/core-web-vitals',
    ),
];

export default eslintConfig;
