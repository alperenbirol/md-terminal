module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		"prettier"
	],
	env: {
		node: true,
	}
};