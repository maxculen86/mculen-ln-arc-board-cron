import get from '../../../../../../common/utils/get';

export const getArticleOpinionSubtype = article => {
    return get(article, 'additionalProperties.subtype', null);
};

export default getArticleOpinionSubtype;
