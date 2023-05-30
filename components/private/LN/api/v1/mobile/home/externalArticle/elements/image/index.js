import get from '../../../../../../../../common/utils/get';
import LNApiErrorArticles from '../../../../../../common/article/models/exceptions/lnApiErrorArticles';
import Image from '../../../../../../common/elements/image/index';

export const getExternalArticleImage = article => {
    const imagedefault =
        get(article, 'additionalProperties.imagen.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    if (!imagedefault)
        throw new LNApiErrorArticles(
            `Revisar Parametros de Articulo en null o undefined en articulo con parametros: ${article}`,
            'ErrorLinkExternalArticle'
        );

    if (imagedefault && imagedefault.type === 'image')
        return Image(imagedefault);

    return null;
};
export default getExternalArticleImage;
