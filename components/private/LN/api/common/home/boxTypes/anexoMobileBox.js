import get from '../../../../../common/utils/get';
import { orderArticles } from '../utils/helpers';

export const anexoMobileBox = (element, featureInfo, anexoFn) => {
    const { information, sectionAliasMobile } = element;
    const articles = get(element, 'articles', []);
    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles = anexoFn(ordererArticles);
    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            anexo: resultArticles[0]
        };
    }

    return null;
};

export default anexoMobileBox;
