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
        'react/jsx-indent': true,
        'react/jsx-indent-props': 4
    },
    overrides: [
        {
            files: ['*.jsx'],
            rules: {
                'react/prefer-stateless-function': false,
                'no-underscore-dangle': 0,
                'no-restricted-globals': ['location']
            }
        },
        {
            files: ['*.js', '*.jsx'],
            rules: {
                'import/no-unresolved': false
            }
        },
        {
            files: ['setupTests.js'],
            rules: {
                'import/no-extraneous-dependencies': false
            }
        },
        {
            files: ['*.test.js', '*.spec.js'],
            rules: {
                'import/first': false
            }
        }
    ]
};
