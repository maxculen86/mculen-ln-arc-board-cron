import get from '../../../../../../../../common/utils/get';
import LNApiErrorArticles from '../../../../../../common/article/models/exceptions/lnApiErrorArticles';

export const getExternalArticleLink = article => {
    const url = get(article, 'additionalProperties.link');

    if (!url) {
        throw new LNApiErrorArticles(
            `Revisar Parametros de Articulo en null o undefined en articulo con parametros: ${article}`,
            'ErrorLinkExternalArticle'
        );
    }

    return url;
};

export default getExternalArticleLink;
