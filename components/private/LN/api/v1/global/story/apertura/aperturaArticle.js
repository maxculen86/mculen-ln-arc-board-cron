import {
    promoItemArticle,
    apertura
} from '../../../common/story/apertura/aperturaArticle';
import video from '../cuerpo/elements/video';
import image from '../cuerpo/elements/image';

const aperturaArticle = article => {
    const promoItem = promoItemArticle(article);
    const resp = {};
    if (promoItem) {
        // eslint-disable-next-line default-case
        switch (promoItem.type) {
            case 'image':
                // eslint-disable-next-line no-case-declarations
                const images = [];
                images.push(image(promoItem).valor);
                resp.imagenes = images;
                break;
            case 'video':
                resp.multimedio = video(promoItem).valor;
                break;
        }
    }
    return {
        apertura: {
            ...apertura(article),
            ...resp
        }
    };
};
export default aperturaArticle;
