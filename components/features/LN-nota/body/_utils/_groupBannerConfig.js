const groupBannerConfig = props => {
    const optionsSet = Object.keys(props.customFields);
    const numberGroups = optionsSet
        .filter(el => el.startsWith('position'))
        .map(el => el.match(/\d+/g)[0]);

    const config = [];
    filterConfig({ config, numberGroups, optionsSet, props });

    return config;
};

const filterConfig = ({ config, numberGroups, optionsSet, props }) => {
    numberGroups.forEach(n => {
        const configKeys = optionsSet.filter(
            el => el.match(/\d+/g)[0].length === n.length && el.endsWith(n)
        );
        const configOpt = {};

        configKeys.forEach(ck => {
            configOpt[ck.replace(/\d+/g, '')] = props.customFields[ck];
        });

        config.push(configOpt);
    });
};

export default groupBannerConfig;
