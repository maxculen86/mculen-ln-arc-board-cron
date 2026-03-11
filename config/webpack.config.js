const paths = require('./paths');
const getConfig = require('./getConfig');
const config = require('./config.json');

module.exports = (env = {}) => {
    const envValue = env.dev ? 'dev' : 'prod';

    return config
        .map(siteConfig => getConfig(siteConfig, { env: envValue, paths }))
        .filter(cfg => cfg && cfg.entry && Object.keys(cfg.entry).length > 0);
};
