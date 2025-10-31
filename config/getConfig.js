/* eslint-disable import/no-extraneous-dependencies */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const glob = require('glob');
const postCssLoader = require('./loaders/postcssLoader');
const cssLoader = require('./loaders/cssLoader');
const sassLoader = require('./loaders/sassLoader');
const resolveUrlLoader = require('./loaders/resolveUrlLoader');
const miniCssExtractPluginLoader = require('./loaders/miniCssExtractPluginLoader');
const fileLoader = require('./loaders/fileLoader');

const { isProduction } = require('./aux');

const getPlugins = ({ paths }) => [
    new MiniCssExtractPlugin({
        filename: `${paths.outputPath.css}/[name].css`
    })
];

const getModule = settings => {
    const { isProd, paths } = settings;

    return {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPluginLoader,
                    cssLoader,
                    resolveUrlLoader,
                    sassLoader(isProd)
                ]
            },
            {
                test: /\.css$/,
                include: /\/tailwind\//,
                use: [
                    miniCssExtractPluginLoader,
                    cssLoader,
                    postCssLoader(isProd)
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2?))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/images/, /img/],
                use: [fileLoader(isProd, paths)]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: [/fonts/],
                use: [fileLoader(isProd, paths)]
            }
        ]
    };
};
const getDevtool = settings =>
    settings.devtool ||
    (settings.isProd ? 'eval' : 'eval-cheap-module-source-map');

const getMode = settings => (settings.isProd ? 'production' : 'development');

const defaultOptions = {};
const getEntry = settings => {
    const entry = {};
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
                    ?.replace(/\[site\]/gi, siteName)
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
    const isProd = isProduction(config.env || settings.env || env);
    settings.isProd = isProd;

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
        devtool: devtool || {},
        mode,
        entry,
        output,
        plugins
    };
};
