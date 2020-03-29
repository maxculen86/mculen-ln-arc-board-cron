// TODO: asegurar que utilice una configuracion por defecto cuando no tiene una especifica. Por ej. si no hay config para credits, o para ese subtype, o para ese tamaño de nota

import get from 'lodash.get';
// import getProperties from 'fusion:properties';
// import { useAppContext } from 'fusion:context';

export const createResizer = (resizerKey, resizerUrl) => {
    const Thumbor = require('thumbor');

    const resizeUrl = (
        originalUrl,
        originalWidth,
        originalHeight,
        resizeOptions
    ) => {
        if (!resizeOptions.width && !resizeOptions.height)
            throw new Error(
                'Se requiere width o heigth para realizar el resize'
            );

        // Si me lo indican en las options, hago el resize aplicando ambos tamaños, si no, horizontal o vertial dependiendo imagen
        let finalWidth = resizeOptions.width || 0;
        let finalHeight = resizeOptions.height || 0;
        if (!resizeOptions.useFullSize) {
            if (originalWidth >= originalHeight) {
                if (finalWidth) finalHeight = 0;
            } else if (finalHeight) finalWidth = 0;
        }

        const thumbor = new Thumbor(resizerKey, resizerUrl);
        // Porque hace esto?
        const cleanedUrl = originalUrl.replace(/(^\w+:|^)\/\//, '');
        const newUrl = thumbor
            .setImagePath(cleanedUrl)
            .resize(finalWidth, finalHeight)
            .buildUrl();
        return newUrl;
    };

    const resizeUrls = (
        originalUrl,
        originalWidth,
        originalHeight,
        presets
    ) => {
        const resp = [];
        const finalPreset = presets;

        finalPreset.forEach(opt => {
            resp.push({
                resizedUrl: resizeUrl(
                    originalUrl,
                    originalWidth,
                    originalHeight,
                    opt
                ),
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

export const resizeArcImage = (arcImage, resizeOptions, resizer) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );
    const test = getCanonincalURL(
        resizer.resizeUrl(arcImage.url, arcImage.width, arcImage.height, {
            width: 768,
            height: 513,
            media: '(min-width: 768px)'
        })
    );
    // console.log('++++++++++++++++++++++ urlOrigin', test);
    return {
        ...arcImage,
        url: test,
        resized_urls: resizer.resizeUrls(
            arcImage.url,
            arcImage.width,
            arcImage.height,
            resizeOptions
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
