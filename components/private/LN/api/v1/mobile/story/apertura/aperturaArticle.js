import {
    promoItemArticle,
    promoItemArticleBasicImage,
    apertura,
    validToSetImagenesAcumulado,
    validToSetImagenesForStorytelling
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
            if (validToSetImagenesForStorytelling(article)) {
                resp.imagenes = [image(promoItem)];
                // eslint-disable-next-line no-underscore-dangle
                if (
                    // eslint-disable-next-line no-underscore-dangle
                    promoItemBasicImage &&
                    get(promoItem, '_id', null) !==
                        get(promoItemBasicImage, '_id', null)
                ) {
                    resp.imagenesAcumulado = [
                        imageAcumulado(promoItemBasicImage)
                    ];
                }
            }
            break;
        case 'video':
            resp.video = video(promoItem);
            if (promoItemBasicImage) {
                resp.imagenes = [image(promoItemBasicImage)];
            }
            break;
        case 'video_jw':
            resp.video = videoJW(promoItem);
            if (promoItemBasicImage) {
                resp.imagenes = [image(promoItemBasicImage)];
            }

            break;
        default:
            // Here it goes because the promoItem is null or other type how us html
            if (
                promoItemBasicImage &&
                get(promoItemBasicImage, '_id', null) &&
                validToSetImagenesForStorytelling(article)
            ) {
                if (validToSetImagenesAcumulado(article, isPromoInContent)) {
                    resp.imagenesAcumulado = [
                        imageAcumulado(promoItemBasicImage)
                    ];
                } else {
                    resp.imagenes = [image(promoItemBasicImage)];
                }
            }
            break;
    }
    return resp;
};

const aperturaArticle = (article = {}, idsElements = null) => {
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
