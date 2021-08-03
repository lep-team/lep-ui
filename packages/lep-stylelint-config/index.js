"use strict";

module.exports = {
	extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order"
    ],
    plugins: ["stylelint-order"],
    "ignoreFiles": [
        "**/*.js",
        "**/*.ts"
    ],
	rules: {
	}
};