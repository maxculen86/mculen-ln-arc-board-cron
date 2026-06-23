module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    settings: {
        react: { version: '19.2.0' }
    },
    extends: ['airbnb', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
    },
    plugins: ['prettier', '@nx'],
    rules: {
        'prettier/prettier': ['error'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/scripts/**',
                    '**/*.test.js',
                    '**/*.spec.js',
                    '**/dev/**'
                ]
            }
        ],
        'no-console': [2, { allow: ['warn', 'error', 'info'] }],
        'react/prop-types': 'off',
        '@nx/enforce-module-boundaries': [
            'error',
            {
                allow: [],
                depConstraints: [
                    {
                        sourceTag: 'type:app',
                        notDependOnLibsWithTags: ['type:app']
                    }
                ]
            }
        ]
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
                'import/no-unresolved': ['error', { ignore: ['fusion:'] }],
                'import/order': [1],
                'object-shorthand': [1]
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
