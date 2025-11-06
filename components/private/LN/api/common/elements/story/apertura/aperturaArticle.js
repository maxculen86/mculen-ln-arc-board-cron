import get from '../../../../../../common/utils/get';
import AperturaReceta from './aperturaReceta';
import {
    authorCommon as Author,
    distributorOrAuthorSignature
} from '../../author';
import { getFeaturedTag } from '../../tag';
import { volanta } from '../../label/volanta';
import getDistributor from '../../distributor';

// For to set Image Basic to BookMark when PromoItems is Html regularly
export const validToSetImagenesAcumulado = (article, isPromoInContent) => {
    const validSubtypesForBookmark = [4, 8]; // For Types StoryTelling and Photo Al 100
    const { subtype } = article;
    return (
        isPromoInContent || validSubtypesForBookmark.includes(Number(subtype))
    );
};

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

export const promoItemArticleBasicImage = article => {
    const promoItem = get(article, 'promo_items.basic', null);
    if (promoItem && promoItem.type !== 'image') {
        return null;
    }
    return promoItem;
};

export const promoItemArticle = article => {
    const { subtype: template } = article;
    let promoItem = get(article, 'promo_items.video_jw', null);
    if (promoItem) {
        promoItem.typeCustom = 'video_jw';
    } else {
        promoItem = get(article, 'promo_items.apertura_multimedia', null);
    }

    promoItem =
        promoItem == null ? get(article, 'promo_items.basic', null) : promoItem;

    if (template === '4' || template === '8') {
        promoItem = get(article, 'promo_items.storytelling_mobile', null);
    }
    return promoItem;
};

export const apertura = article => {
    const recetaPromoItem = get(article, 'promo_items.receta', null);
    const authors = get(article, 'credits.by', null);
    const authorsFixed = authors && authors.filter(a => a.type === 'author');

    const resp = {
        ...storyTitleAndResume(article),
        distributor: getDistributor(article, false)
    };

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
        resp.authors = articleAuthors;
        resp.marquesina = distributorOrAuthorSignature(
            resp.distributor,
            articleAuthors
        );
    }

    const tagDestacado = getFeaturedTag(article);
    if (tagDestacado) {
        resp.tagDestacado = tagDestacado;
    }

    const flyer = volanta(article);
    if (flyer) {
        resp.volanta = flyer;
    }

    return resp;
};
export default apertura;
