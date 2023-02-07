import get from '../../../../../common/utils/get';
import { orderArticles } from '../utils/helpers';

export const anexoMobileBox = (
    element,
    featureInfo,
    anexoFn,
    anexoMobileFn
) => {
    const { information, sectionAliasMobile } = element;
    const articles = get(element, 'articles', []);
    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles =
        sectionAliasMobile === 'Anexo'
            ? anexoFn(ordererArticles)
            : anexoMobileFn(ordererArticles);
    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            anexo: resultArticles[0]
        };
    }

    return null;
};

export default anexoMobileBox;
