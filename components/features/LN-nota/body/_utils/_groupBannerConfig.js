const groupBannerConfig = (customFields = {}) => {
    const optionsSet = Object.keys(customFields);
    const numberGroups = optionsSet
        .filter(el => el.startsWith('position'))
        .map(el => el.match(/\d+/g)[0]);

    const config = [];
    filterConfig({ config, numberGroups, optionsSet, customFields });

    return config;
};

const filterConfig = ({ config, numberGroups, optionsSet, customFields }) => {
    numberGroups.forEach(n => {
        const configKeys = optionsSet.filter(
            el => el.match(/\d+/g)[0].length === n.length && el.endsWith(n)
        );
        const configOpt = {};

        configKeys.forEach(ck => {
            configOpt[ck.replace(/\d+/g, '')] = customFields[ck];
        });

        config.push(configOpt);
    });
};

export default groupBannerConfig;
