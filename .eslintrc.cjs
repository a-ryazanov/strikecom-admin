module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "plugin:effector/recommended",
        "plugin:effector/react",
        "@feature-sliced"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "react",
        "effector"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type" : [
            "error",
            { "allowExpressions": true }
        ]
    }
}
