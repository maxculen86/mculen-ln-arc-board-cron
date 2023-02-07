import get from '../../../../../../common/utils/get';

export const getArticleTitle = article => {
    const title = get(article, 'additionalProperties.title', null);
    const originalTitle =
        get(article, 'headlines.mobile', null) ||
        get(article, 'headlines.basic', null);
    return title || originalTitle;
};

export default getArticleTitle;
