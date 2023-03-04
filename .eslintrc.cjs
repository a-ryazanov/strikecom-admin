module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:effector/recommended',
    'plugin:effector/react',
    '@feature-sliced',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react', 'effector'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
  },
}
