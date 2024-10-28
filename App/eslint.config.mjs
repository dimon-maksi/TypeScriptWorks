import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
	{
		ignores: ['dist', 'node_modules', '.angular'],
	},
	{
		// extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
			},
		},
		plugins: {
			prettier,
		},
		rules: {
			'prettier/prettier': 'warn',
			'no-console': 'error',
			'prefer-const': 'warn',
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
