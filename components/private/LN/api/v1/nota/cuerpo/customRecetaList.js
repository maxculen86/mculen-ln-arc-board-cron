import get from 'lodash.get';

const customReceta = (listData, type) => {
    const config = get(listData, 'embed.config');
    if (!config) return null;
    console.log(config);
    return {
        _t: type,
        title: config.titleList,
        items: config.items
    };
};

export default customReceta;
