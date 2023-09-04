const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
  ].map(require.resolve),
  plugins: ['jest'],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    commonjs: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', 'next.config.js'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    'unicorn/filename-case': 'off',
    'react/no-array-index-key': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'no-implicit-coercion': ['error', { allow: ['!!', '~'] }],
  },
}
