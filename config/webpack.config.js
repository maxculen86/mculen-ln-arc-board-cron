const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const importer = require('node-sass-glob-importer');
const glob = require('glob');
const paths = require('./paths');

const sites = {
    OTT: [{ '[site]/style': 'style.scss' }],
    LN: [
        { '[site]/amp': 'css/amp/*.scss' },
        { '[site]/base': 'css/base/*.scss' },
        { '[site]/abstracts': 'css/abstracts/*.scss' },
        {
            '[site]/[dirname]/[basename]': {
                pattern: 'css/*/*.scss',
                ignore: ['css/abstracts/**']
            }
        }
    ]
};

const defaultOptions = {};
const entries = Object.keys(sites).reduce((config, site) => {
    const patterns = sites[site];

    patterns.forEach((item, i) => {
        Object.entries(item).forEach(([name, _pattern]) => {
            const { pattern, ignore } =
                typeof _pattern === 'string' ? { pattern: _pattern } : _pattern;

            const options = {
                ...defaultOptions,
                ignore:
                    ignore &&
                    ignore.map(p => `${paths.sourcePath.base}/${site}/${p}`)
            };

            const files = glob.sync(
                `${paths.sourcePath.base}/${site}/${pattern}`,
                options
            );

            files.forEach(file => {
                const pathbase = path.dirname(file);
                const dirname = path.basename(pathbase);
                const extname = path.extname(file);
                const basename = path
                    .basename(file, extname)
                    .replace(/_/gi, '');

                const key = name
                    .replace(/\[site\]/gi, site)
                    .replace(/\[pathbase\]/gi, pathbase)
                    .replace(/\[dirname\]/gi, dirname)
                    .replace(/\[basename\]/gi, basename)
                    .replace(/\[baseextname\]/gi, basename + extname)
                    .toLocaleLowerCase();

                config[key] = config[key] || [];

                config[key].push(file);

                config[key] = config[key].filter(
                    (element, indexOf) =>
                        config[key].indexOf(element) === indexOf
                );
            });
        });
    });

    return config;
}, {});

const isProduction = env =>
    env &&
    (env.prod === true ||
        env.prod === 'prod' ||
        env.prod === 'production' ||
        env.prod === 'true');

const getRules = env => {
    const isProd = isProduction(env);

    return [
        {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: !isProd
                    }
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'resolve-url-loader',
                    options: {}
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        importer: importer(),
                        outputStyle: isProd ? 'compressed' : 'expanded'
                    }
                }
            ]
        },
        {
            test: /\.(ttf|eot|svg|woff(2?))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: [/images/, /img/],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: paths.outputPath.fonts,
                        publicPath: paths.urlPath.fonts,
                        name: isProd ? '[hash].[ext]' : '[name].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: [/fonts/],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: paths.outputPath.images,
                        publicPath: paths.urlPath.images,
                        name: isProd ? '[hash].[ext]' : '[name].[ext]'
                    }
                }
            ]
        }
    ];
};

// Configuration
module.exports = (env = {}) => {
    const isProd = isProduction(env);
    const rules = getRules(env);

    return {
        module: {
            rules
        },
        devtool: isProd ? 'none' : 'source-map',
        mode: isProd ? 'production' : 'development',
        entry: entries,
        output: {
            path: paths.outputPath.base,
            filename: `[name].js`
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${paths.outputPath.css}/[name].css`
            })
        ]
    };
};
