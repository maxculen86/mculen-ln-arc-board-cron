const customReceta = (listData, type) => {
    return {
        type,
        title: listData.embed.config.titleList,
        items: listData.embed.config.items
    };
};

export default customReceta;
