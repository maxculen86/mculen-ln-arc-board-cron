import get from '../../../../../../../../common/utils/get';
import LNApiErrorArticles from '../../../../../../common/article/models/exceptions/lnApiErrorArticles';

export const getExternalArticleId = article => {
    const id = get(article, '_id', null);

    if (!id) {
        const itemArticle =
            typeof article === 'object' ? JSON.stringify(article) : '';
        throw new LNApiErrorArticles(
            `Revisar Parametros de Articulo en null o undefined en articulo con parametros: ${itemArticle}`,
            'ErrorIdExternalArticle'
        );
    }

    return id;
};

export default getExternalArticleId;
