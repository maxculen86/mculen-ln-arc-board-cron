import get from '../../../../../../../../common/utils/get';
import LNApiErrorArticles from '../../../../../../common/article/models/exceptions/lnApiErrorArticles';

export const getExternalArticleLink = article => {
    const url = get(article, 'additionalProperties.link');

    if (!url) {
        const itemArticle =
            typeof article === 'object' ? JSON.stringify(article) : '';
        throw new LNApiErrorArticles(
            `Revisar Parametros de Articulo en null o undefined en articulo con parametros: ${itemArticle}`,
            'ErrorLinkExternalArticle'
        );
    }

    return url;
};

export default getExternalArticleLink;
