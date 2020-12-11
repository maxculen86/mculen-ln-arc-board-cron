const isProduction = env =>
    env &&
    (env === 'prod' ||
        env === 'production' ||
        env === 'true' ||
        env.prod === true ||
        env.prod === 'prod' ||
        env.prod === 'production' ||
        env.prod === 'true');

exports.isProduction = isProduction;
