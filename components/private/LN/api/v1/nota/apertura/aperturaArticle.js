import get from 'lodash.get';
import Image from '../image';
import Video from '../video';
import AperturaReceta from './aperturaReceta';
import Author from '../../common/author';
import TagDestacado from './tagDestacado';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile }
    } = article;

    const promoItem = get(article, 'promo_items.basic');
    const recetaPromoItem = get(article, 'promo_items.receta');
    const bajada = get(article, 'subheadlines.basic');
    const autores = get(article, 'credits.by');
    const autoresFixed = autores && autores.filter(a => a.type === 'author');
    const volanta = get(article, 'label.volanta.text');

    const resp = {
        volanta,
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

    const tagDestacado = TagDestacado(article);
    if (tagDestacado) {
        resp.tagDestacado = tagDestacado;
    }

    return resp;
};

export default apertura;
