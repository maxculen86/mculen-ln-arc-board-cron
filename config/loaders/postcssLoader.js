module.exports = isProd => ({
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                ['@tailwindcss/postcss', {}],
                [
                    'postcss-prefix-selector',
                    {
                        prefix: '[data-tw]',
                        exclude: [':root', 'html', 'body', /^\*/, /^::/, /^::/],
                        transform(prefix, selector, prefixedSelector) {
                            if (selector.includes('[data-tw]')) {
                                return selector;
                            }
                            return prefixedSelector;
                        }
                    }
                ],
                ['autoprefixer', {}],
                ...(isProd ? [['cssnano', { preset: 'default' }]] : [])
            ]
        }
    }
});
