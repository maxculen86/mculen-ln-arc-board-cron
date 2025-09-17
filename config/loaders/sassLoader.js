/* eslint-disable import/no-extraneous-dependencies */
const importer = require('node-sass-glob-importer');

module.exports = isProd => ({
    loader: 'sass-loader',
    options: {
        sassOptions: {
            sourceMap: true,
            importer: importer(),
            outputStyle: isProd ? 'compressed' : 'expanded'
        }
    }
});
