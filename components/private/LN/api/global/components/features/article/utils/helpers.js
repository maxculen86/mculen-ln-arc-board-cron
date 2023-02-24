import fieldsToArticles from '../config/articleSourceNota/configIncludeFieldsByTypeChain.json';

export const getFieldsType = typeChain => {
    return { resp: typeChain };
};

export const getFieldsArticlesByTypeChain = typeChain => {
    const keyTypeChain = typeChain || 'default';
    return fieldsToArticles[keyTypeChain];
};
