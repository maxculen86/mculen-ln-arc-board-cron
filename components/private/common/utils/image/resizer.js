/* eslint-disable no-underscore-dangle */
// TODO: asegurar que utilice una configuracion por defecto cuando no tiene una especifica. Por ej. si no hay config para credits, o para ese subtype, o para ese tamaño de nota

import { RESIZER_URL_PUBLIC, SITE_LANACION } from 'fusion:environment';
import { FOTOAL100, RECETA, STORYTELLING } from '../subtypes/subtypeHelper';
import get from '../get';
import { getAspectRatio } from '../../../../../content/sources/utils/getRatio';

export const setHeight = (width, proportion) => {
    const [axisX, axisY] = proportion.split(':');

    return axisX > axisY
        ? parseInt((width / axisX) * axisY, 10)
        : parseInt((width / axisY) * axisX, 10);
};

const setFilter = (thumbor, [type, value]) =>
    thumbor.filter(`${type}(${value})`);

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5}x${y + 5}:${x + 5}x${y - 5}`;

export const setCropMethod = ({
    thumbor,
    resizeOptions,
    originalWidth,
    originalHeight,
    focalPoint,
    smartCropExcluded
}) => {
    const { proportion, isNotSmart } = resizeOptions;
    if (proportion) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const notEqualProportion = !(aspectRatio === proportion);

        if (notEqualProportion) {
            const [focalX, focalY] = focalPoint;
            const hasFocalPoint = focalPoint.length === 2;
            const hasAnyDimensions = originalWidth || originalHeight;

            if (hasFocalPoint && hasAnyDimensions && isNotSmart) {
                const focalFilter = setStrFocal(focalX, focalY);
                setFilter(thumbor, ['focal', focalFilter]);
            } else if (!smartCropExcluded) {
                thumbor.smartCrop(true);
            }
        }
    }
};

export const createResizer = (
    resizerKey,
    resizerUrl,
    isInApertura = false,
    isAdmin = false
) => {
    const Thumbor =
        // eslint-disable-next-line no-eval
        typeof window === 'undefined' ? eval('require("thumbor")') : () => {};

    const resizeUrl = (
        originalUrl,
        originalWidth,
        originalHeight,
        resizeOptions = {},
        focalPoint = [],
        smartCropExcluded,
        filterQuality = 80
    ) => {
        const { useFullSize, proportion, width: newWidth = 0 } = resizeOptions;
        let { height: newHeight = 0 } = resizeOptions;

        newHeight = !useFullSize ? 0 : newHeight;

        if (!newHeight && !newWidth)
            throw new Error('Height and Width required');

        const thumbor = new Thumbor(resizerKey, resizerUrl);
        const cleanedUrl = originalUrl.replace(
            /.*\/resizer\/[a-zA-Z0-9_\-=]+((?:\/[0-9x]+)?(?:\/smart)?(?:\/+(?:filters:.+?)?)?)?\/|(^\w+:\/\/|^)/,
            ''
        );

        setFilter(thumbor, ['format', 'webp']);
        setFilter(thumbor, ['quality', filterQuality]);

        setCropMethod({
            thumbor,
            resizeOptions,
            originalWidth,
            originalHeight,
            focalPoint,
            smartCropExcluded
        });

        proportion && (newHeight = setHeight(newWidth, proportion));

        const url = thumbor
            .setImagePath(cleanedUrl)
            .resize(newWidth, newHeight)
            .buildUrl();

        return isInApertura && !isAdmin
            ? url.replace(/^.*\/\/[^\/]+/, SITE_LANACION)
            : url.replace(/^.*\/\/[^\/]+/, RESIZER_URL_PUBLIC);
    };

    const resizeUrls = (
        originalUrl,
        originalWidth,
        originalHeight,
        presets,
        focalPoint,
        smartCropExcluded
    ) => {
        const resp = [];
        const finalPreset = presets;
        finalPreset &&
            finalPreset.forEach(opt => {
                const resizedUrl = resizeUrl(
                    originalUrl,
                    originalWidth,
                    originalHeight,
                    opt,
                    focalPoint,
                    smartCropExcluded
                );
                resp.push({
                    resizedUrl,
                    option: opt
                });
            });

        return resp;
    };
    return {
        resizeUrl,
        resizeUrls
    };
};

export const resizeArcGallery = (
    arcgallery,
    resizeOptions,
    resizer,
    zoomSizes,
    smartCropExcluded = false
) => {
    if (arcgallery.type !== 'gallery') {
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "gallery"'
        );
    }

    return {
        ...arcgallery,
        content_elements:
            arcgallery &&
            arcgallery.content_elements &&
            arcgallery.content_elements.map(i =>
                resizeArcImage(
                    i,
                    resizeOptions,
                    resizer,
                    zoomSizes,
                    smartCropExcluded
                )
            )
    };
};

const mediaMinWidth = '(min-width: 768px)';

export const resizeArcImage = (
    arcImage,
    resizeOptions,
    resizer,
    zoomSizes,
    smartCropExcluded = false,
    defaultResize = {
        width: 768,
        height: 513,
        media: mediaMinWidth
    }
) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );

    /**
     * Antes del paso por resizer validamos que no venga de bucket para así
     * usar el resizer de bucket y no de Arc
     */

    if (arcImage.url.match(/\/\/bucket+[\d]+.glanacion.com+/g)) {
        const getUrlwithWidth = (url, width) =>
            url.replace('.jpg', `w${defaultResize.width}.jpg`);

        return {
            ...arcImage,
            url: getUrlwithWidth(arcImage.url, defaultResize.width),
            ...defaultResize,
            resized_urls: resizeOptions.map(config => {
                const { width, height, media } = config || defaultResize;

                return {
                    resizedUrl: getUrlwithWidth(arcImage.url, width), // transformar la url con with necesario
                    option: { width, height, media }
                };
            })
        };
    }

    const fp = get(
        arcImage,
        'additional_properties.focal_point.min',
        undefined
    );

    const defaultResizeWithSmart = {
        ...defaultResize,
        isNotSmart: typeof fp !== 'undefined'
    };

    const _resizeOptions =
        typeof fp !== 'undefined'
            ? resizeOptions &&
              resizeOptions.map(e => ({ ...e, isNotSmart: true }))
            : resizeOptions;

    const _zoomSizes =
        typeof fp !== 'undefined'
            ? zoomSizes && zoomSizes.map(e => ({ ...e, isNotSmart: true }))
            : zoomSizes;

    return {
        ...arcImage,
        width: fp || !smartCropExcluded ? 768 : arcImage.width,
        height: fp || !smartCropExcluded ? 513 : arcImage.height,
        url: resizer.resizeUrl(
            arcImage.url,
            arcImage.width,
            arcImage.height,
            defaultResizeWithSmart,
            fp,
            smartCropExcluded
        ),
        resized_urls: resizer.resizeUrls(
            arcImage.url,
            arcImage.width,
            arcImage.height,
            _resizeOptions,
            fp,
            smartCropExcluded
        ),
        resized_urls_zoom: resizer.resizeUrls(
            arcImage.url,
            arcImage.width,
            arcImage.height,
            _zoomSizes,
            fp,
            smartCropExcluded
        )
    };
};

const resizeCredits = (credits, resizeOptions, resizer) => {
    const resp = {};
    const optionsFinal = get(resizeOptions, 'sizes', [
        {
            width: 768,
            height: 513,
            media: mediaMinWidth
        }
    ]);

    Object.keys(credits).forEach(key => {
        const credit = credits[key];
        resp[key] =
            credit &&
            credit.map(c => {
                if (!!c.image && !!c.image.url) {
                    const resizes = resizer.resizeUrls(
                        c.image.url,
                        c.image.width,
                        c.image.height,
                        optionsFinal
                    );
                    return {
                        ...c,
                        image: {
                            ...c.image,
                            resized_urls: resizes
                        }
                    };
                }
                return c;
            });
    });
    return resp;
};

export const resizePromoItems = (
    promoItems,
    resizeOptions,
    resizer,
    zoomSizes,
    subtype
) => {
    const resp = {};

    const { defaultResize, shouldExcludeCrop } = getDefaultSize(subtype);

    const optionsFinal = get(resizeOptions, 'sizes', [defaultResize]);

    Object.keys(promoItems).forEach(key => {
        const pi = promoItems[key];

        if (pi.type === 'image') {
            resp[key] = resizeArcImage(
                pi,
                optionsFinal,
                resizer,
                zoomSizes,
                shouldExcludeCrop,
                defaultResize
            );
        } else {
            resp[key] = pi;
        }
    });

    return resp;
};

const getDefaultSize = subtype => {
    const defaultResize =
        subtype === FOTOAL100 || subtype === STORYTELLING
            ? {
                  width: 1920,
                  height: 850,
                  media: '(min-width: 1280px)'
              }
            : { width: 768, height: 513, media: mediaMinWidth };

    const shouldExcludeCrop =
        subtype === FOTOAL100 || subtype === STORYTELLING || subtype === RECETA;

    return { defaultResize, shouldExcludeCrop };
};

export const addResizedUrls = (ansDoc, options) => {
    const {
        resizerSecret,
        resizerUrl,
        presets,
        presets: {
            promoItems: presetsPromoItems,
            contentElements: { sizes: presetsContentElements } = {},
            credits: presetsCredits,
            zoomSizes = []
        },
        presetsDefault,
        subtype,
        isInApertura,
        isAdmin
    } = options;
    const {
        promo_items: promoItems,
        content_elements: contentElements,
        credits
    } = ansDoc;
    if (!resizerSecret || !resizerUrl || !presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );

    const resizer = createResizer(
        resizerSecret,
        resizerUrl,
        isInApertura,
        isAdmin
    );

    const { defaultResize } = getDefaultSize(subtype);

    return {
        ...ansDoc,
        ...(contentElements && {
            content_elements: contentElements.map(elem => {
                const { type } = elem;
                return (
                    (type === 'image' &&
                        resizeArcImage(
                            elem,
                            presetsContentElements || presetsDefault,
                            resizer,
                            zoomSizes,
                            true,
                            defaultResize
                        )) ||
                    (type === 'gallery' &&
                        resizeArcGallery(
                            elem,
                            presetsContentElements || presetsDefault,
                            resizer,
                            zoomSizes,
                            true
                        )) ||
                    elem
                );
            })
        }),
        ...(promoItems && {
            promo_items: resizePromoItems(
                promoItems,
                presetsPromoItems || presetsDefault,
                resizer,
                zoomSizes,
                subtype
            )
        }),
        ...(credits && {
            credits: resizeCredits(
                credits,
                presetsCredits || presetsDefault,
                resizer
            )
        })
    };
};
