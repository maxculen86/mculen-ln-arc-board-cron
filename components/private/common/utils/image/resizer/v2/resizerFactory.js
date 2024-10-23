import get from '../../../get';
import {
    getDefaultSize,
    resizeArcGallery,
    resizeArcImage
} from './resizerHelper';

export const resizePromoItems = ({
    resizeOptions,
    zoomSizes,
    subtype,
    promoItems = {},
    isInApertura = false,
    arcSite = 'lanacionar',
    resizerUrl
}) => {
    const resp = {};

    const { defaultResize, shouldExcludeCrop } = getDefaultSize(subtype);

    const optionsFinal = get(resizeOptions, 'sizes', [defaultResize]);
    Object.keys(promoItems).forEach(key => {
        const promoItem = promoItems[key];

        if (promoItem.type === 'image') {
            resp[key] = resizeArcImage({
                arcImage: promoItem,
                resizeOptions: optionsFinal,
                zoomSizes,
                smartCropExcluded: shouldExcludeCrop,
                defaultResize,
                isInApertura,
                arcSite,
                resizerUrl
            });
        } else if (promoItem.type === 'video') {
            resp[key] = {
                ...promoItem,
                promo_items: {
                    basic: {
                        ...resizeArcImage({
                            arcImage: promoItem.promo_items.basic,
                            resizeOptions: optionsFinal,
                            zoomSizes,
                            smartCropExcluded: shouldExcludeCrop,
                            defaultResize,
                            isInApertura,
                            arcSite,
                            resizerUrl
                        })
                    }
                }
            };
        } else {
            resp[key] = promoItem;
        }
    });
    return resp;
};

export const resizeContentElements = (
    elem,
    presetsContentOrDefault,
    zoomSizes,
    defaultResize,
    arcSite
) => {
    const { type } = elem;
    return (
        (type === 'image' &&
            resizeArcImage({
                arcImage: elem,
                resizeOptions: presetsContentOrDefault,
                zoomSizes,
                smartCropExcluded: true,
                defaultResize,
                arcSite
            })) ||
        (type === 'gallery' &&
            resizeArcGallery(elem, presetsContentOrDefault, zoomSizes, true)) ||
        (type === 'video' && {
            ...elem,
            promo_items: {
                basic: {
                    ...resizeArcImage({
                        arcImage: elem.promo_items.basic,
                        resizeOptions: presetsContentOrDefault,
                        zoomSizes,
                        smartCropExcluded: true,
                        defaultResize
                    })
                }
            }
        }) ||
        elem
    );
};

export const resizeCredits = ({ credits, resizeOptions, isInApertura }) => {
    const resp = {};
    const optionsFinal = get(resizeOptions, 'sizes', [
        {
            width: 768,
            height: 513,
            media: '(min-width: 768px)'
        }
    ]);

    Object.keys(credits).forEach(key => {
        const credit = credits[key];
        resp[key] =
            !!credit &&
            credit.map(c => {
                if (!!c.image && !!c.image.url) {
                    return {
                        ...c,
                        image: resizeArcImage({
                            arcImage: { ...c.image, type: 'image' },
                            resizeOptions: optionsFinal,
                            isInApertura
                        })
                    };
                }
                return c;
            });
    });
    return resp;
};
