import get from '../../../get';
import {
    getDefaultSize,
    resizeArcGallery,
    resizeArcImage,
    resizeImgUrl
} from './resizerHelper';

export const buildResizedImages = (
    images,
    originalUrl,
    originalAuth,
    arcSite
) => {
    if (!images) return [];
    const imagesCopy = JSON.parse(JSON.stringify(images));
    return imagesCopy?.map(image => {
        const imageCopy = { ...image };
        const width = get(imageCopy, 'width', 720);
        const newUrl = resizeImgUrl({
            arcImage: {
                url: originalUrl,
                auth: { 1: originalAuth }
            },
            defaultResizeWithSmart: { width },
            arcSite
        });
        imageCopy.src = newUrl;
        return imageCopy;
    });
};

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
        } else if (promoItem?.subtype === 'video_jw') {
            const image = get(
                promoItem,
                'embed.config.videoJw.playlist[0].image',
                ''
            );
            const auth = get(promoItem, 'auth.1', '');
            const images = get(
                promoItem,
                'embed.config.videoJw.playlist[0].images',
                []
            );
            const resizedImages = buildResizedImages(
                images,
                image,
                auth,
                arcSite
            );
            const resizedImage = resizeImgUrl({
                arcImage: {
                    url: image,
                    auth: { 1: auth }
                },
                defaultResizeWithSmart: { width: 720 },
                arcSite
            });
            const promoItemCopy = {
                ...promoItem,
                embed: {
                    ...promoItem.embed,
                    config: {
                        ...promoItem.embed.config,
                        videoJw: {
                            ...promoItem.embed.config.videoJw,
                            playlist: [
                                {
                                    ...promoItem.embed.config.videoJw
                                        .playlist[0],
                                    image: resizedImage,
                                    images: resizedImages
                                }
                            ]
                        }
                    }
                }
            };
            resp[key] = promoItemCopy;
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
    const { type, subtype } = elem;

    if (type === 'image') {
        return resizeArcImage({
            arcImage: elem,
            resizeOptions: presetsContentOrDefault,
            zoomSizes,
            smartCropExcluded: true,
            defaultResize,
            arcSite
        });
    }

    if (type === 'gallery') {
        return resizeArcGallery(
            elem,
            presetsContentOrDefault,
            zoomSizes,
            true,
            arcSite
        );
    }

    if (type === 'video') {
        return {
            ...elem,
            promo_items: {
                basic: {
                    ...resizeArcImage({
                        arcImage: elem.promo_items.basic,
                        resizeOptions: presetsContentOrDefault,
                        zoomSizes,
                        smartCropExcluded: true,
                        defaultResize,
                        arcSite
                    })
                }
            }
        };
    }

    if (subtype === 'video_jw') {
        const image = get(elem, 'embed.config.videoJw.playlist[0].image', '');
        const auth = get(elem, 'auth.1', '');
        const images = get(elem, 'embed.config.videoJw.playlist[0].images', []);
        const resizedImages = buildResizedImages(images, image, auth, arcSite);
        const resizedImage = resizeImgUrl({
            arcImage: {
                url: image,
                auth: { 1: auth }
            },
            defaultResizeWithSmart: { width: 720 },
            arcSite
        });

        return {
            ...elem,
            embed: {
                ...elem.embed,
                config: {
                    ...elem.embed.config,
                    videoJw: {
                        ...elem.embed.config.videoJw,
                        playlist: [
                            {
                                ...elem.embed.config.videoJw.playlist[0],
                                image: resizedImage,
                                images: resizedImages
                            }
                        ]
                    }
                }
            }
        };
    }

    return elem;
};

export const resizeCredits = ({
    credits,
    resizeOptions,
    isInApertura,
    arcSite
}) => {
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
                            isInApertura,
                            arcSite
                        })
                    };
                }
                return c;
            });
    });
    return resp;
};
