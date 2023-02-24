import fieldsToArticles from '../../configs/jsons/configIncludeFieldsByTypeChain.json';

export const getFieldsType = typeChain => {
    return { resp: typeChain };
};

export const articleSourceNotaSourceInclude = typeChain => {
    const keyTypeChain = typeChain || 'default';
    return fieldsToArticles[keyTypeChain];
};
