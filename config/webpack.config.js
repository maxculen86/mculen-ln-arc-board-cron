const paths = require('./paths');
const getConfig = require('./getConfig');
const config = require('./config');

module.exports = (env = 'develop') => {
    const webpackConfig = config.map(siteConfig =>
        getConfig(siteConfig, { env, paths })
    );

    return webpackConfig;
};

module.exports();
