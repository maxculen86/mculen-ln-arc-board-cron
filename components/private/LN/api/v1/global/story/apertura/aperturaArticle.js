import {
    promoItemArticle,
    apertura
} from '../../../common/story/apertura/aperturaArticle';
import get from '../../../../../../common/utils/get';
import video from '../cuerpo/elements/video';
import image from '../cuerpo/elements/image';

const aperturaArticle = (article, type, idsElements = null) => {
    if (article.subtype === '9' && type === 'global') return null;
    let promoItem = promoItemArticle(article);
    if (
        promoItem &&
        idsElements &&
        idsElements.includes(get(promoItem, '_id', null))
    ) {
        promoItem = null;
    }
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
        ...apertura(article),
        ...resp
    };
};
export default aperturaArticle;
