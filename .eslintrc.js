module.exports = {
	env: {
		node: true,
		es6: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: "module"
	},
	rules: {
		indent: ['error', 'tab', { "SwitchCase": 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'key-spacing': ['error', { afterColon: true, mode: 'strict' }],
		'eol-last': ['error', 'always'],
		'no-unused-vars': ['warn'],
		'no-mixed-spaces-and-tabs': ['error'],
		'object-curly-spacing': ["error", "always", { "arraysInObjects": false, "objectsInObjects": false }],
		'array-bracket-spacing': ["error", "never", { "objectsInArrays": false, "singleValue": false, "arraysInArrays": false }],
		'computed-property-spacing': ["error", "never", { "enforceForClassMembers": true }],
		'space-infix-ops': "error",
		'semi-spacing': "error"
	}
};
