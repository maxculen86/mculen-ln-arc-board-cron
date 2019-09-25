module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    settings: {
        react: { version: '16.6.1' }
    },
    extends: ['airbnb', 'prettier', 'react-app'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'jsx-a11y/href-no-hash': [0],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4]
    },
    overrides: [
        {
            files: ['*.jsx'],
            rules: {
                'react/prefer-stateless-function': [0],
                'no-underscore-dangle': 0
            }
        },
        {
            files: ['*.js', '*.jsx'],
            rules: {
                'import/no-unresolved': [0],
                'import/order': [1],
                'object-shorthand': [1],
                'no-console': [2],
                'no-unused-vars': [2]
            }
        },
        {
            files: ['setupTests.js'],
            rules: {
                'import/no-extraneous-dependencies': [0]
            }
        },
        {
            files: ['*.test.js', '*.spec.js'],
            rules: {
                'import/first': [0]
            }
        }
    ]
};
