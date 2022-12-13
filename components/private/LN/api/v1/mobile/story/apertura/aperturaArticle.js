import { IS_DEV, IS_SANDBOX } from 'fusion:environment';
import devImageDefault from './devImageDefault.json';
import sandboxImageDefault from './sandboxImageDefault.json';
import prodImageDefault from './prodImageDefault.json';
import {
    promoItemArticle,
    apertura
} from '../../../common/story/apertura/aperturaArticle';
import get from '../../../../../../common/utils/get';
import video from '../cuerpo/elements/video';
import image from '../cuerpo/elements/image';
import htmlRaw from '../cuerpo/elements/html';

const imageDefault = () => {
    if (IS_DEV === 'true') {
        return devImageDefault;
    }
    if (IS_SANDBOX === 'true') {
        return sandboxImageDefault;
    }
    return prodImageDefault;
};
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
            case 'raw_html':
                resp.html = htmlRaw(promoItem);
                break;
        }
    }
    if (resp.video && resp.imagenes === undefined) {
        const basic = get(article, 'promo_items.basic', null);
        if (basic && basic.type === 'image') {
            resp.imagenes = [image(basic)];
        } else {
            resp.imagenes = [image(imageDefault())];
            // eslint-disable-next-line no-console
            console.error(
                // eslint-disable-next-line no-underscore-dangle
                `La nota id: ${article._id} , tiene seteado en Medio destacado Básico "Origen del vídeo" una imagen. Se esta enviando una imagen por defecto hasta su correción`
            );
        }
    }
    return {
        ...apertura(article),
        ...resp
    };
};
export default aperturaArticle;
