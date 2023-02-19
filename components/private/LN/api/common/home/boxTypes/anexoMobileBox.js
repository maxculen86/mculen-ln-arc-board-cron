import get from '../../../../../common/utils/get';

export const anexoMobileBox = (element, featureInfo, anexoFn) => {
    const articles = get(element, 'articles', []);
    const resultArticles = anexoFn(articles);
    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            anexo: resultArticles[0]
        };
    }

    return null;
};

export default anexoMobileBox;
