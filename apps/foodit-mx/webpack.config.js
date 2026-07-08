const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sites = ['foodit'];
const SITE_DIR = { foodit: 'FOODIT' };

module.exports = (env = {}) => {
    const isProd = !env.dev;

    const entries = {};
    sites.forEach(site => {
        const siteDir = SITE_DIR[site];
        const files = glob.sync(`src/statics/${siteDir}/css/**/*.scss`, {
            cwd: __dirname
        });
        files.forEach(file => {
            const key = file
                .replace(`src/statics/${siteDir}/css/`, `${site}/`)
                .replace(/\/_?([^/]+)\.scss$/, (_, n) => `/${n}`)
                .replace(/\.scss$/, '');
            entries[key] = path.resolve(__dirname, file);
        });
    });

    if (Object.keys(entries).length === 0) return [];

    return [
        {
            entry: entries,
            output: {
                path: path.resolve(__dirname, 'resources/dist')
            },
            devtool: isProd ? false : 'eval-cheap-module-source-map',
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: { sourceMap: !isProd }
                            }
                        ]
                    }
                ]
            },
            // Verificar si es necesario agregar css/ al filename, se agrego para que coincida con el path de criticalCss/helpers.js
            plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].css' })]
        }
    ];
};
