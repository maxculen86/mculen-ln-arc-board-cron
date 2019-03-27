module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
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
    }
};
