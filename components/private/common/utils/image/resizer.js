/* eslint-disable no-underscore-dangle */
// TODO: asegurar que utilice una configuracion por defecto cuando no tiene una especifica. Por ej. si no hay config para credits, o para ese subtype, o para ese tamaño de nota

import { IS_DEV, IS_SANDBOX } from 'fusion:environment';
import { FOTOAL100, RECETA, STORYTELLING } from '../subtypes/subtypeHelper';
import get from '../get';
import { getAspectRatio } from '../../../../../content/sources/utils/getRatio';

// import getProperties from 'fusion:properties';
// import { useAppContext } from 'fusion:context';

export const createResizer = (resizerKey, resizerUrl) => {
    const Thumbor = require('thumbor');

    const resizeUrl = (
        originalUrl,
        originalWidth,
        originalHeight,
        resizeOptions,
        focalPoint,
        smartCropExcluded,
        filterQuality = 70
    ) => {
        const { isNotSmart, useFullSize } = resizeOptions;
        let { height: newHeight = 0, width: newWidth = 0 } = resizeOptions;

        if (!newHeight && !newWidth)
            throw new Error('Height and Width required');

        const regex =
            IS_DEV === 'true' || IS_SANDBOX === 'true'
                ? /(^\w+:|^)\/\//
                : /^.*\/\/[^\/]+/;

        const thumbor = new Thumbor(resizerKey, resizerUrl);
        thumbor
            .setImagePath(originalUrl.replace(regex, ''))
            .filter(`quality(${filterQuality})`);

        if (
            focalPoint &&
            focalPoint[0] &&
            focalPoint[1] &&
            (originalWidth || originalHeight) &&
            isNotSmart
        ) {
            return thumbor
                .filter(
                    `focal(${focalPoint[0] - 5}x${focalPoint[1] +
                        5}:${focalPoint[0] + 5}x${focalPoint[1] - 5})`
                )
                .resize(newWidth, newHeight)
                .buildUrl();
        }
        if (!smartCropExcluded)
            return thumbor
                .smartCrop(true)
                .resize(newWidth, newHeight)
                .buildUrl();

        if (!useFullSize) {
            newHeight =
                originalWidth >= originalHeight && newWidth ? 0 : newWidth;
            newWidth =
                originalWidth < originalHeight && newHeight ? 0 : newWidth;
        }

        // return thumbor
        //     .setImagePath(originalUrl.replace(regex, ''))
        //     .filter(`quality(${filterQuality})`)
        //     .resize(newWidth, newHeight)
        //     .buildUrl();
        return thumbor.resize(newWidth, newHeight).buildUrl();
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
        content_elements: arcgallery.content_elements.map(i =>
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

export const resizeArcImage = (
    arcImage,
    resizeOptions,
    resizer,
    zoomSizes,
    smartCropExcluded = false,
    defaultResize = {
        width: 768,
        height: 513,
        media: '(min-width: 768px)'
    }
) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );

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
            ? resizeOptions.map(e => ({ ...e, isNotSmart: true }))
            : resizeOptions;

    const _zoomSizes =
        typeof fp !== 'undefined'
            ? zoomSizes.map(e => ({ ...e, isNotSmart: true }))
            : zoomSizes;

    let urlResize = resizer.resizeUrl(
        arcImage.url,
        arcImage.width,
        arcImage.height,
        defaultResizeWithSmart,
        fp,
        smartCropExcluded
    );

    if (IS_DEV !== 'true' && IS_SANDBOX !== 'true') {
        urlResize = urlResize && urlResize.replace(/^.*\/\/[^\/]+/, '');
    }

    return {
        ...arcImage,
        width: fp || !smartCropExcluded ? 768 : arcImage.width,
        height: fp || !smartCropExcluded ? 513 : arcImage.height,
        url: urlResize,
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
            media: '(min-width: 768px)'
        }
    ]);

    Object.keys(credits).forEach(key => {
        const credit = credits[key];
        resp[key] = credit.map(c => {
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
    const isFotoAl100orStorytelling =
        subtype === FOTOAL100 || subtype === STORYTELLING;

    const defaultSize = {
        width: 768,
        height: 513,
        media: '(min-width: 768px)'
    };

    const defaultResize = isFotoAl100orStorytelling
        ? {
              width: 1920,
              height: 850,
              media: '(min-width: 1280px)'
          }
        : defaultSize;

    const shouldExcludeCrop =
        subtype === FOTOAL100 || subtype === STORYTELLING || subtype === RECETA;

    return { defaultResize, shouldExcludeCrop };
};

export const addResizedUrls = (ansDoc, option) => {
    if (!option.resizerSecret || !option.resizerUrl || !option.presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );
    const { zoomSizes = [] } = option.presets;

    const resizer = createResizer(option.resizerSecret, option.resizerUrl);

    const optionsContentElements = option.presets.contentElements.sizes;

    const { defaultResize } = getDefaultSize(ansDoc.subtype);

    const respDoc = {
        ...ansDoc,
        content_elements:
            ansDoc.content_elements &&
            ansDoc.content_elements.map(elem => {
                if (elem.type === 'image') {
                    return resizeArcImage(
                        elem,
                        optionsContentElements,
                        resizer,
                        zoomSizes,
                        true,
                        defaultResize
                    );
                }
                if (elem.type === 'gallery') {
                    return resizeArcGallery(
                        elem,
                        optionsContentElements,
                        resizer,
                        zoomSizes,
                        true
                    );
                }
                return elem;
            })
    };

    if (ansDoc.promo_items) {
        respDoc.promo_items = resizePromoItems(
            ansDoc.promo_items,
            option.presets.promoItems,
            resizer,
            zoomSizes,
            ansDoc.subtype
        );
    }

    // TODO: Buscar caso de uso de credits y validar
    if (ansDoc.credits) {
        respDoc.credits = resizeCredits(
            ansDoc.credits,
            option.presetsDefault,
            resizer
        );
    }
    return respDoc;
};
