// TODO: asegurar que utilice una configuracion por defecto cuando no tiene una especifica. Por ej. si no hay config para credits, o para ese subtype, o para ese tamaño de nota

import get from 'lodash.get';
// import getProperties from 'fusion:properties';
// import { useAppContext } from 'fusion:context';

const focusImage = (width, height, focalPoint, thumborInstance) => {
    const [x, y] = focalPoint;
    // left, top, right, bottom: https://thumbor.readthedocs.io/en/latest/focal.html
    const rect = [x - 5, y + 5, x + 5, y - 5];
    const focalFilter = `focal(${rect[0]}x${rect[1]}:${rect[2]}x${rect[3]})`;
    return thumborInstance.filter(focalFilter);
};

export const createResizer = (resizerKey, resizerUrl) => {
    const Thumbor = require('thumbor');

    const resizeUrl = (
        originalUrl,
        originalWidth,
        originalHeight,
        resizeOptions,
        focalPoint
    ) => {
        console.log('arcImage ************ ', originalUrl);
        if (!resizeOptions.width && !resizeOptions.height)
            throw new Error(
                'Se requiere width o heigth para realizar el resize'
            );
        // Si me lo indican en las options, hago el resize aplicando ambos tamaños, si no, horizontal o vertial dependiendo imagen
        const cleanedUrl = originalUrl.replace(/(^\w+:|^)\/\//, '');

        const thumbor = new Thumbor(resizerKey, resizerUrl);

        if (
            (!focalPoint || !originalWidth || !originalHeight) &&
            !resizeOptions.isNotSmart
        ) {
            thumbor.smartCrop(true);
        } else {
            focusImage(originalWidth, originalHeight, focalPoint, thumbor);
        }

        thumbor.setImagePath(cleanedUrl);

        const { height: newHeight = 0, width: newWidth = 0 } = resizeOptions;

        // return thumbor.resize(newWidth, newHeight).buildUrl();
        return getCanonincalURL(thumbor.resize(newWidth, newHeight).buildUrl());
    };

    const resizeUrls = (
        originalUrl,
        originalWidth,
        originalHeight,
        presets,
        focalPoint
    ) => {
        const resp = [];
        const finalPreset = presets;
        finalPreset.forEach(opt => {
            const resizedUrl = resizeUrl(
                originalUrl,
                originalWidth,
                originalHeight,
                opt,
                focalPoint
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

export const resizeArcGallery = (arcgallery, resizeOptions, resizer) => {
    if (arcgallery.type !== 'gallery') {
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "gallery"'
        );
    }

    return {
        ...arcgallery,
        content_elements: arcgallery.content_elements.map(i =>
            resizeArcImage(i, resizeOptions, resizer)
        )
    };
};

const getCanonincalURL = urlOrigin => {
    return urlOrigin.replace(/^.*\/\/[^\/]+/, '');
};

const getFocalPoint = function getFocalPoint(element) {
    const additionalProperties = element.additional_properties || {};
    const focalPoint = additionalProperties.focal_point || {};
    return focalPoint.min;
};

export const resizeArcImage = (arcImage, resizeOptions, resizer) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );

    return {
        ...arcImage,
        url: getCanonincalURL(
            resizer.resizeUrl(arcImage.url, arcImage.width, arcImage.height, {
                width: 768,
                height: 513,
                media: '(min-width: 768px)'
            })
        ),
        resized_urls: resizer.resizeUrls(
            arcImage.url,
            arcImage.width,
            arcImage.height,
            resizeOptions,
            getFocalPoint(arcImage) || undefined
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

const resizePromoItems = (promoItems, resizeOptions, resizer) => {
    const resp = {};

    // TODO: Pasar valor por defecto como constante

    const optionsFinal = get(resizeOptions, 'sizes', [
        {
            width: 768,
            height: 513,
            media: '(min-width: 768px)'
        }
    ]);

    Object.keys(promoItems).forEach(key => {
        const pi = promoItems[key];
        if (pi.type === 'image') {
            resp[key] = resizeArcImage(pi, optionsFinal, resizer);
        } else {
            resp[key] = pi;
        }
    });
    return resp;
};

export const addResizedUrls = (ansDoc, option) => {
    if (!option.resizerSecret || !option.resizerUrl || !option.presets)
        throw new Error(
            'Debe proporcionar el resizerSecret, resizerUrl y presets'
        );
    const resizer = createResizer(option.resizerSecret, option.resizerUrl);

    const optionsContentElements = option.presets.contentElements.sizes;

    const respDoc = {
        ...ansDoc,
        content_elements:
            ansDoc.content_elements &&
            ansDoc.content_elements.map(elem => {
                if (elem.type === 'image') {
                    return resizeArcImage(
                        elem,
                        optionsContentElements,
                        resizer
                    );
                }
                if (elem.type === 'gallery') {
                    return resizeArcGallery(
                        elem,
                        optionsContentElements,
                        resizer
                    );
                }
                return elem;
            })
    };
    if (ansDoc.promo_items) {
        respDoc.promo_items = resizePromoItems(
            ansDoc.promo_items,
            option.presets.promoItems,
            resizer
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
