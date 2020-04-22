import get from 'lodash.get';
import Image from './image';
import Video from './video';
import AperturaReceta from './aperturaReceta';
import Author from '../common/author';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile },
        credits: { by: authors }
    } = article;

    const promoItem = get(article, 'promo_items.basic');
    const recetaPromoItem = get(article, 'promo_items.receta');
    const bajada = get(article, 'subheadlines.basic');
    const autoresFixed = authors && authors.filter(a => a.type === 'author');

    const resp = {
        titulo: tituloMobile || titulo,
        bajada,
        imagenes: []
    };

    if (promoItem) {
        switch (promoItem.type) {
            case 'image':
                resp.imagenes.push(Image(promoItem));
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

    if (autoresFixed && autoresFixed.length > 0) {
        resp.autores = autoresFixed && autoresFixed.map(a => Author(a));
    }

    return resp;
};

export default apertura;
