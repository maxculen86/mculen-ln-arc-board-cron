import get from 'lodash.get';
import Image from './image';
import Video from './video';
import AperturaReceta from './aperturaReceta';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile }
    } = article;

    const promoItem = get(article, 'promo_items.basic');
    const recetaPromoItem = get(article, 'promo_items.receta');
    const bajada = get(article, 'subheadlines.basic');

    const resp = {
        titulo: tituloMobile || titulo,
        bajada
    };

    if (promoItem) {
        switch (promoItem.type) {
            case 'image':
                resp.imagen = Image(promoItem);
                break;
            case 'video':
                resp.video = Video(promoItem);
                break;
            default:
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

    return resp;
};

export default apertura;
