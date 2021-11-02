import get from 'lodash.get';
import Image from '../../../mobile/v1/nota/image';
import Video from '../../../mobile/v1/nota/video';
import AperturaReceta from './aperturaReceta';
import Author from '../../author';
import { getFeaturedTag } from '../../tag';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile },
        subtype: template
    } = article;
    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }
    let promoItem = get(article, 'promo_items.apertura_multimedia', null);
    promoItem =
        promoItem == null ? get(article, 'promo_items.basic', null) : promoItem;

    if (template === '4' || template === '8')
        promoItem = get(article, 'promo_items.storytelling_mobile', null);

    const recetaPromoItem = get(article, 'promo_items.receta', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const autores = get(article, 'credits.by', null);
    const autoresFixed = autores && autores.filter(a => a.type === 'author');

    const resp = {
        titulo: titulo || tituloMobile,
        tituloMobile,
        bajada
    };

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

    if (autoresFixed && autoresFixed.length > 0) {
        resp.autores = autoresFixed && autoresFixed.map(a => Author(a));
    }

    const tagDestacado = getFeaturedTag(article);
    if (tagDestacado) {
        resp.tagDestacado = tagDestacado;
    }

    return resp;
};

export default apertura;
