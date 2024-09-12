import {
    RESIZER_URL_PUBLIC,
    SITE_LANACION,
    RESIZER_KEY,
    RESIZER_URL,
    API_ENV
} from 'fusion:environment';

// TODO: Esta funcion solo se usa en content/sources/imageResizeSource.js y aparentemente está en desuso.
//       El equipo de backend se ocuparía de analizar y eliminarlo.
export const createResizer = (isInApertura = false, isAdmin = false) => {
    const aperturaUrl =
        API_ENV === 'prod' ? SITE_LANACION : `https://www.lanacion.com.ar`;
    const Thumbor =
        // eslint-disable-next-line no-eval
        typeof window === 'undefined'
            ? eval('require("thumbor")')
            : () => {
                  // NOSONAR - This is intentional
              };

    const resizeUrl = ({
        originalUrl,
        originalWidth,
        originalHeight,
        resizeOptions = {},
        focalPoint = [],
        smartCropExcluded,
        filterQuality = 70
    }) => {
        const { useFullSize, proportion, width: newWidth = 0 } = resizeOptions;
        let { height: newHeight = 0 } = resizeOptions;

        newHeight = !useFullSize ? 0 : newHeight;

        if (!newHeight && !newWidth)
            throw new Error('Height and Width required');

        const thumbor = new Thumbor(RESIZER_KEY, RESIZER_URL);
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

        if (proportion) {
            newHeight = setHeight(newWidth, newHeight, proportion);
        }

        const url = thumbor
            .setImagePath(cleanedUrl)
            .resize(newWidth, newHeight)
            .buildUrl();

        return isInApertura && !isAdmin
            ? url.replace(/^.*\/\/[^\/]+/, aperturaUrl)
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
                const resizedUrl = resizeUrl({
                    originalUrl,
                    originalWidth,
                    originalHeight,
                    resizeOptions: opt,
                    focalPoint,
                    smartCropExcluded
                });
                resp.push({
                    resizedUrl,
                    option: {
                        ...opt,
                        height: updateHeight(originalHeight, originalWidth, opt)
                    }
                });
            });

        return resp;
    };
    return {
        resizeUrl,
        resizeUrls
    };
};
