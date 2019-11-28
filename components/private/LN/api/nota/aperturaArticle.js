import Image from './imageArticle';
import Video from './videoArticle';

const apertura = article => {
    const {
        headlines: { basic: titulo, mobile: tituloMobile },
        subheadlines: { basic: bajada },
        promo_items: { basic: promoItem }
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

    return resp;
};

export default apertura;
