import {
    promoItemArticle,
    apertura
} from '../../../common/story/apertura/aperturaArticle';
import get from '../../../../../../common/utils/get';
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
                images.push(image(promoItem));
                resp.imagenes = images;
                break;
            case 'video':
                resp.video = video(promoItem);
                break;
        }
    }
    if (resp.video && resp.imagenes === undefined) {
        const basic = get(article, 'promo_items.basic', null);
        if (basic) {
            resp.imagenes = [image(basic)];
        }
    }
    return {
        ...apertura(article),
        ...resp
    };
};
export default aperturaArticle;
