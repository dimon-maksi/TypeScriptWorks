module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|html)$': [
			'jest-preset-angular',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.html$',
			},
		],
	},
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
