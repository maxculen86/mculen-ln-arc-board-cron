export const createResizer = (resizerKey, resizerUrl) => {
    const Thumbor = require('thumbor');

    const resizeUrl = (originalUrl, resizeOptions) => {
        if (!resizeOptions.width || !resizeOptions.height)
            throw new Error(
                'Se requiere width o heigth para realizar el resize'
            );

        // Si me lo indican en las options, hago el resize aplicando ambos tamaños, si no, horizontal o vertial dependiendo imagen
        let finalWidth = resizeOptions.width;
        let finalHeight = resizeOptions.height;
        if (!resizeOptions.useFullSize) {
            if (resizeOptions.width >= resizeOptions.height) {
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

    return {
        resizeUrl
    };
};

export const resizeArcImage = (arcImage, resizeOptions, resizer) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error('Tipo de dato no valido');

    const resizedUrls = {};
    Object.keys(resizeOptions).forEach(opt => {
        resizedUrls[opt] = resizer.resizeUrl(arcImage.url, resizeOptions[opt]);
    });

    return {
        ...arcImage,
        resized_urls: resizedUrls
    };
};

const resizeAnsDocument = ansDoc => {};

export default resizeAnsDocument;
