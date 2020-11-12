module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-tabs': 'off',
    'space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'never'
    }],
    "indent": ["off", 2],
    'padded-blocks': 0,
    "prefer-const": 0,
    "no-unneeded-ternary": 0,
    "no-prototype-builtins": 0
,    'space-before-blocks': ['warn', {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],
    "vue/no-use-v-if-with-v-for": ["off", {
      "allowUsingIterationVar": false
    }],
    "vue/no-unused-components": "warn",
    "no-trailing-spaces": 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
