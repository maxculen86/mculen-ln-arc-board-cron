const paths = require('./paths');
const getConfig = require('./getConfig');
const config = require('./config');

module.exports = (env = 'prod') =>
    config.map(siteConfig => getConfig(siteConfig, { env, paths }));
