module.exports = (isProd, paths) => ({
    loader: 'file-loader',
    options: {
        outputPath: paths.outputPath.images,
        publicPath: paths.urlPath.images,
        name: isProd ? '[hash].[ext]' : '[name].[ext]'
    }
});
