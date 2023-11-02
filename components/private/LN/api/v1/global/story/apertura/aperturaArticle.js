import {
    promoItemArticle,
    promoItemArticleBasicImage,
    apertura,
    validToSetImagenesAcumulado
} from '../../../../common/elements/story/apertura/aperturaArticle';
import get from '../../../../../../common/utils/get';
import video from '../cuerpo/elements/video';
import videoJW from '../cuerpo/elements/videoJW';
import image from '../cuerpo/elements/image';
import imageAcumulado from '../../../../common/elements/story/image';

const setPromoByType = (
    typePromoItem,
    article,
    isPromoInContent,
    promoItem,
    promoItemBasicImage
) => {
    const resp = {};
    // eslint-disable-next-line default-case
    switch (typePromoItem) {
        case 'image':
            resp.imagenes = [image(promoItem).valor];
            if (
                promoItemBasicImage &&
                get(promoItem, '_id', null) !==
                    get(promoItemBasicImage, '_id', null)
            ) {
                resp.imagenesAcumulado = [imageAcumulado(promoItemBasicImage)];
            }
            break;
        case 'video':
            resp.multimedio = video(promoItem).valor;
            // eslint-disable-next-line no-underscore-dangle
            // if (promoItemBasicImage && promoItemBasicImage._id) {
            //     resp.imagenes = [image(promoItemBasicImage).valor];
            // }
            break;
        case 'video_jw':
            resp.multimedio = videoJW(promoItem).valor;
            break;
        default:
            // Here it goes because the promoItem is null or other type how us html
            // eslint-disable-next-line no-underscore-dangle
            if (promoItemBasicImage && promoItemBasicImage._id) {
                if (validToSetImagenesAcumulado(article, isPromoInContent)) {
                    resp.imagenesAcumulado = [
                        imageAcumulado(promoItemBasicImage)
                    ];
                } else {
                    resp.imagenes = [image(promoItemBasicImage).valor];
                }
            }
            break;
    }
    return resp;
};

const aperturaArticle = (article, type, idsElements = null) => {
    if (article.subtype === '9' && type === 'global') return null;

    const promoItemBasicImage = promoItemArticleBasicImage(article);
    let promoItem = promoItemArticle(article);
    let isPromoInContent = false;
    const indexFindPromoInContents =
        idsElements &&
        Array.isArray(idsElements) &&
        idsElements.findIndex(x => x === get(promoItem, '_id', null));

    if (promoItem && idsElements && indexFindPromoInContents === 0) {
        promoItem = null;
        isPromoInContent = true;
    }
    const typePromoItem =
        get(promoItem, 'type', null) || get(promoItem, 'typeCustom', null);

    const resp = setPromoByType(
        typePromoItem,
        article,
        isPromoInContent,
        promoItem,
        promoItemBasicImage
    );

    return {
        ...apertura(article),
        ...resp
    };
};
export default aperturaArticle;
