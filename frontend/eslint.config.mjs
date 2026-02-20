import stylistic from '@stylistic/eslint-plugin';
import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

const eslintConfig = [
    eslint.configs.recommended,
    {
        files: ['**/*.{ts,js,tsx,jsx}'],
        languageOptions: {
            parser: typescriptEslint,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.serviceworker,
                React: 'readonly',
                JSX: 'readonly',
                PageProps: 'readonly',
                LayoutProps: 'readonly',
            },
        },
        plugins: {
            '@stylistic': stylistic,
            '@typescript-eslint': typescriptEslintPlugin,
            'react': reactPlugin,
            'react-hooks': reactHooks,
            '@next/next': nextPlugin,
        },
        rules: {
            ...stylistic.configs.customize({
                commaDangle: 'always-multiline',
                braceStyle: '1tbs',
                indent: 4,
                jsx: true,
                quotes: 'single',
                semi: true,
            }).rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^(_|ignore)',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: false,
                    vars: 'all',
                    varsIgnorePattern: '^_',
                },
            ],
            'no-unused-vars': 'off',
            '@stylistic/arrow-parens': 'off',
            '@stylistic/eol-last': 'error',
            '@stylistic/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'semi'
                    },
                },
            ],
            '@stylistic/multiline-ternary': 'off',
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-multi-spaces': [
                'error',
                {
                    ignoreEOLComments: true
                }
            ],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            ...reactHooks.configs.recommended.rules,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        ignores: [
            '**/*.d.ts',
            'node_modules',
            '.yarn',
            '.pnp.cjs',
            '.pnp.loader.mjs',
            '.next',
            '**/__generated__/*',
            'postcss.config.js',
        ],
    },
];

export default eslintConfig;
