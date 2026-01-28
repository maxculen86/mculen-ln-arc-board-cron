import get from '../../../../../../common/utils/get';
import { STORYTELLING } from '../../../../../../common/utils/subtypes/subtypeHelper';
import {
    authorCommon as Author,
    distributorOrAuthorSignature
} from '../../author';
import { getPrincipalCategory } from '../../category';
import getDistributor from '../../distributor';
import { volanta as getVolanta } from '../../label/volanta';
import { getFeaturedTag } from '../../tag';
import AperturaReceta from './aperturaReceta';

// For to set Image Basic to BookMark when PromoItems is Html regularly
export const validToSetImagenesAcumulado = (article, isPromoInContent) => {
    const validSubtypesForBookmark = [4, 8]; // For Types StoryTelling and Photo Al 100
    const { subtype } = article;
    return (
        isPromoInContent || validSubtypesForBookmark.includes(Number(subtype))
    );
};

export const storyTitleAndResume = article => {
    const titulo = get(article, 'headlines.basic', null);
    const tituloMobile = get(article, 'headlines.mobile', null);
    const tituloNative = get(article, 'headlines.native', null);
    const subtype = get(article, 'subtype', null);

    if (!titulo) throw new Error('Titulo de la nota es null o undefined');

    const bajada = get(article, 'subheadlines.basic', null);

    return {
        titulo: titulo || tituloMobile,
        tituloMobile,
        ...(subtype === STORYTELLING && tituloNative && { tituloNative }),
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

const getAuthors = article =>
    get(article, 'credits.by', []).filter(a => a.type === 'author');

const patchReceta = article => {
    const recetaPromoItem = get(article, 'promo_items.receta', null);
    const isDetalleReceta =
        article.subtype === '7' &&
        recetaPromoItem?.subtype === 'custom-detalle-receta';

    return isDetalleReceta ? { receta: AperturaReceta(recetaPromoItem) } : {};
};

const patchAutores = (article, distributor) => {
    const authorsFixed = getAuthors(article);
    if (!authorsFixed.length) return {};

    const articleAuthors = authorsFixed.map(Author);
    return {
        autores: articleAuthors,
        authors: articleAuthors,
        marquesina: distributorOrAuthorSignature(distributor, articleAuthors)
    };
};

const patchTagDestacado = article => {
    const tagDestacado = getFeaturedTag(article);
    return tagDestacado ? { tagDestacado } : {};
};

const patchVolanta = article => {
    const volanta = getVolanta(article);
    return volanta ? { volanta } : {};
};

const patchBrand = article => {
    const {
        taxonomy: { primary_section: primarySection }
    } = article;
    const category = primarySection && getPrincipalCategory(primarySection);
    let brand = category?.slug;
    const aFondo = false; // TODO resolver como identificamos la nota A FONDO se deja logica implementada
    if (aFondo) brand = '/a-fondo';
    return brand ? { brand } : {};
};

const patchDiagram = article => {
    const diagram = get(
        article,
        'promo_items.custom_storytelling_opening.embed.config.diagram',
        null
    );

    return diagram ? { diagram } : {};
};

const patchStorytelling = article =>
    get(article, 'subtype', null) === STORYTELLING
        ? { ...patchBrand(article), ...patchDiagram(article) }
        : {};

export const apertura = article => {
    const distributor = getDistributor(article, false);
    return {
        ...storyTitleAndResume(article),
        distributor,
        ...patchReceta(article),
        ...patchAutores(article, distributor),
        ...patchTagDestacado(article),
        ...patchVolanta(article),
        ...patchStorytelling(article)
    };
};

export default apertura;
