// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'commonjs',
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    stylistic.configs.customize({
        commaDangle: 'always-multiline',
        braceStyle: '1tbs',
        jsx: true,
        arrowParens: true,
        // indent, quotes, semi управляются Prettier
    }),
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            'prettier/prettier': 'error',
            // Отключаем правила Stylistic, которые конфликтуют с Prettier
            '@stylistic/quotes': 'off',
            '@stylistic/semi': 'off',
            '@stylistic/indent': 'off',
            '@stylistic/member-delimiter-style': 'off',
        },
    },
];
