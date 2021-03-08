/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const importer = require('node-sass-glob-importer');

const { isProduction } = require('./aux');

const getPlugins = ({ siteName, settings, isProd, paths }) => {
    return [
        new MiniCssExtractPlugin({
            filename: `${paths.outputPath.css}/[name].css`
        })
    ];
};

const getModule = settings => {
    const { isProd, paths } = settings;

    return {
        rules: [
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
        ]
    };
};
const getDevtool = settings => {
    return settings.devtool || (settings.isProd ? 'none' : 'source-map');
};

const getMode = settings => (settings.isProd ? 'production' : 'development');

const defaultOptions = {};
const getEntry = settings => {
    const entry = {};
    // console.log(settings);
    const { site: siteName, entries, paths } = settings;

    entries.forEach(setting => {
        Object.entries(setting).forEach(([name, patternSetting]) => {
            const { pattern, ignore = [] } =
                typeof patternSetting === 'string'
                    ? { pattern: patternSetting }
                    : patternSetting;

            const options = {
                ...defaultOptions,
                ignore: (ignore || []).map(
                    p => `${paths.sourcePath.base}/${siteName}/${p}`
                )
            };

            glob.sync(
                `${paths.sourcePath.base}/${siteName}/${pattern}`,
                options
            ).forEach(file => {
                const pathbase = path.dirname(file);
                const dirname = path.basename(pathbase);
                const extname = path.extname(file);
                const basename = path
                    .basename(file, extname)
                    .replace(/_/gi, '');

                const key = name
                    .replace(/\[site\]/gi, siteName)
                    .replace(/\[pathbase\]/gi, pathbase)
                    .replace(/\[dirname\]/gi, dirname)
                    .replace(/\[basename\]/gi, basename)
                    .replace(/\[baseextname\]/gi, basename + extname)
                    .toLocaleLowerCase();

                entry[key] = entry[key] || [];

                if (!entry[key].some(f => f === file)) {
                    entry[key].push(file);
                }
            });
        });
    });

    return entry;
};

const getOutput = ({ paths }) => ({
    path: paths.outputPath.base,
    filename: `[name].js`
});

const getPerformance = settings => {
    if (settings.maxSize) {
        const maxSize =
            typeof settings.maxSize === 'number'
                ? settings.maxSize
                : settings.maxSize[settings.env];
        return {
            // maxAssetSize: settings.maxSize,
            maxEntrypointSize: maxSize,
            assetFilter(assetFilename) {
                return assetFilename.endsWith('.css');
            },
            hints: 'error'
        };
    }

    return undefined;
};

module.exports = (config, options) => {
    const { site, entries, maxSize, env } = config;

    const settings = { site, entries, maxSize, ...options };
    settings.isProd = isProduction(config.env || settings.env || env);

    const mode = getMode(settings);
    const entry = getEntry(settings);
    const module = getModule(settings);
    const output = getOutput(settings);
    const devtool = getDevtool(settings);
    const plugins = getPlugins(settings);
    const performance = getPerformance(settings);

    return {
        module,
        performance,
        devtool,
        mode,
        entry,
        output,
        plugins
    };
};
