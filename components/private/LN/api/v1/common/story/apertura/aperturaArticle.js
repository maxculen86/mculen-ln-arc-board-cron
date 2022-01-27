import get from 'lodash.get';
import Image from '../image';
import Video from '../video';
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

const apertura = article => {
    const { subtype: template } = article;

    let promoItem = get(article, 'promo_items.apertura_multimedia', null);
    let acuImage = null;

    promoItem =
        promoItem == null ? get(article, 'promo_items.basic', null) : promoItem;

    if (template === '4' || template === '8') {
        promoItem = get(article, 'promo_items.storytelling_mobile', null);
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

    if (promoItem) {
        // eslint-disable-next-line default-case
        switch (promoItem.type) {
            case 'image':
                // eslint-disable-next-line no-case-declarations
                const images = [];
                images.push(Image(promoItem));
                resp.imagenes = images;
                break;
            case 'video':
                resp.multimedio = Video(promoItem);
                break;
        }
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
