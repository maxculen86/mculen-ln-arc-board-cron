import Image from './imageArticle';
import Video from './videoArticle';
import AperturaReceta from './aperturaReceta';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile },
        subheadlines: { basic: bajada },
        promo_items: { basic: promoItem, receta: recetaPromoItem }
    } = article;

    const resp = {
        title: tituloMobile || titulo,
        subTitle: bajada
    };

    if (promoItem) {
        switch (promoItem.type) {
            case 'image':
                resp.image = Image(promoItem);
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
