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
        let finalWidth = resizeOptions.width;
        let finalHeight = resizeOptions.height;
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
        presets.forEach(opt => {
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

export const resizeArcImage = (arcImage, resizeOptions, resizer) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );

    return {
        ...arcImage,
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
    Object.keys(credits).forEach(key => {
        const credit = credits[key];
        resp[key] = credit.map(c => {
            if (!!c.image && !!c.image.url) {
                const resizes = resizer.resizeUrls(
                    c.image.url,
                    c.image.width,
                    c.image.height,
                    resizeOptions
                );
                return {
                    ...c,
                    image: {
                        ...c.image,
                        resized_urls: resizes
                    }
                };
            } else {
                return c;
            }
        });
    });
    return resp;
};

const resizePromoItems = (promoItems, resizeOptions, resizer) => {
    const resp = {};
    Object.keys(promoItems).forEach(key => {
        const pi = promoItems[key];
        if (pi.type === 'image') {
            resp[key] = resizeArcImage(pi, resizeOptions, resizer);
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

    const respDoc = {
        ...ansDoc,
        content_elements:
            ansDoc.content_elements &&
            ansDoc.content_elements.map(elem => {
                if (elem.type === 'image') {
                    return resizeArcImage(elem, option.presets, resizer);
                }
                return elem;
            })
    };

    if (!!ansDoc.promo_items) {
        respDoc.promo_items = resizePromoItems(
            ansDoc.promo_items,
            option.presets,
            resizer
        );
    }

    if (!!ansDoc.credits) {
        respDoc.credits = resizeCredits(
            ansDoc.credits,
            option.presets,
            resizer
        );
    }
    return respDoc;
};
