module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["prettier"],
	overrides: [],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "script",
	},
	rules: {
		semi: ["error", "always"],
		"no-unused-vars": ["off"],
		"prettier/prettier": ["error"],
	},
};
