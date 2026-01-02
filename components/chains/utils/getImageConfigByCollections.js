const getImageConfigByCollections = (rules = []) =>
    rules?.map(rule => rule.imageConfig).join(',') || '';

export default getImageConfigByCollections;
