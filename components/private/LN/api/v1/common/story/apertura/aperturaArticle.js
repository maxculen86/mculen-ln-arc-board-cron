import get from '../../../../../../common/utils/get';
import AperturaReceta from './aperturaReceta';
import {
    authorCommon as Author,
    articleSignature as Signature
} from '../../author';
import { getFeaturedTag } from '../../tag';

export const storyTitleAndResume = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile }
    } = article;
    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }

    const bajada = get(article, 'subheadlines.basic', null);
    return {
        titulo: titulo || tituloMobile,
        tituloMobile,
        bajada
    };
};

export const promoItemArticle = article => {
    const { subtype: template } = article;
    let promoItem = get(article, 'promo_items.apertura_multimedia', null);
    promoItem =
        promoItem == null ? get(article, 'promo_items.basic', null) : promoItem;

    if (template === '4' || template === '8') {
        promoItem = get(article, 'promo_items.storytelling_mobile', null);
    }
    return promoItem;
};

export const apertura = article => {
    const { subtype: template } = article;
    let acuImage = null;
    if (template === '4' || template === '8') {
        acuImage = get(article, 'promo_items.basic', null);
    }

    const recetaPromoItem = get(article, 'promo_items.receta', null);
    const authors = get(article, 'credits.by', null);
    const authorsFixed = authors && authors.filter(a => a.type === 'author');

    const resp = {
        ...storyTitleAndResume(article)
    };

    if (acuImage) {
        const images = [];
        images.push(Image(acuImage));
        resp.imagenesAcumulado = images;
    }
    if (
        article.subtype === '7' &&
        recetaPromoItem &&
        recetaPromoItem.subtype === 'custom-detalle-receta'
    ) {
        resp.receta = AperturaReceta(recetaPromoItem);
    }

    if (authorsFixed && authorsFixed.length > 0) {
        const articleAuthors = authorsFixed.map(a => Author(a));
        resp.autores = articleAuthors;
        resp.marquesina = Signature(articleAuthors);
    }

    const tagDestacado = getFeaturedTag(article);
    if (tagDestacado) {
        resp.tagDestacado = tagDestacado;
    }

    return resp;
};
export default apertura;
