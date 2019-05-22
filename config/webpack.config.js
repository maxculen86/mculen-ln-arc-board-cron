const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const importer = require('node-sass-glob-importer');
const paths = require('./paths');

const sites = ['OTT'];

const entries = sites.reduce((config, site) => {
    const files = ['style.scss'];

    files.forEach(file => {
        const ext = path.extname(file);
        const filename = path.basename(file, ext);
        const name = `${site}/${filename}`.toLocaleLowerCase();

        // eslint-disable-next-line no-param-reassign
        config[name] = `${paths.resources}/${site}/${file}`;
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
            exclude: [/images/],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                        publicPath: '/pf/resources/dist/fonts',
                        name: isProd ? '[hash].[ext]' : '[name].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        publicPath: '/pf/resources/dist/images',
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
            path: paths.dist,
            filename: 'js/[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isProd ? 'css/[name].css' : 'css/[name].css'
            })
        ]
    };
};
