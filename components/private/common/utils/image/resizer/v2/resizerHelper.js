/* eslint-disable no-underscore-dangle */
import {
    RESIZER_URL_PUBLIC,
    SITE_LANACION,
    SITE_FOODIT
} from 'fusion:environment';
import slugify from 'slugify';
import {
    FOTOAL100,
    RECETA,
    STORYTELLING
} from '../../../subtypes/subtypeHelper';
import { getAspectRatio } from '../../../../../../../content/sources/utils/getRatio';
import get from '../../../get';
import {
    isValidNumber,
    isEmptyString,
    isValidString,
    isValidNonZeroNumber
} from '../../../dataValidation';

const MEDIAMINWIDTH = '(min-width: 768px)';

export const isResizerV1 = url =>
    isValidString(url)
        ? /\/resizer\/(.+)\/filters:format(.+)/.test(url)
        : false;

export const isResizerV2 = url =>
    isValidString(url) ? /\/resizer\/v2\//.test(url) : false;

export const getSlugForImage = imageData => {
    const textToBuildSlug =
        get(imageData, 'alt_text', '') ||
        get(imageData, 'caption', '') ||
        get(imageData, 'subtitle', '');

    if (!textToBuildSlug) return '';

    const slugifySeoFriendly = slugify(`${textToBuildSlug}`, {
        remove: /[<>_(){}[\]\\*+=~.,'`"¡!¿?|;:@$&%/#]/g,
        lower: true,
        strict: false
    });
    const shorterSlug = isValidString(slugifySeoFriendly)
        ? slugifySeoFriendly.slice(0, 50)
        : '';
    const shorterSlugWithDash = `${shorterSlug.slice(0, shorterSlug.lastIndexOf('-'))}-`;
    return shorterSlug.endsWith('-') ? shorterSlug : shorterSlugWithDash;
};

// TODO: Optener la config  por default
export const getDefaultSize = subtype => {
    const defaultResize =
        subtype === FOTOAL100 || subtype === STORYTELLING
            ? {
                  width: 1920,
                  height: 850,
                  media: '(min-width: 1280px)'
              }
            : { width: 768, height: 513, media: MEDIAMINWIDTH };

    const shouldExcludeCrop =
        subtype === FOTOAL100 || subtype === STORYTELLING || subtype === RECETA;

    return { defaultResize, shouldExcludeCrop };
};

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5},${y + 5}:${x + 5},${y - 5}`;

export const setCropMethod = ({
    originalWidth,
    originalHeight,
    focalPoint = [],
    defaultResizeWithSmart = {}
}) => {
    const { proportion, isNotSmart } = defaultResizeWithSmart;
    if (proportion) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const notEqualProportion = aspectRatio !== proportion;

        if (notEqualProportion) {
            const [focalX, focalY] = focalPoint;
            const hasFocalPoint = focalPoint.length === 2;
            const hasAnyDimensions = originalWidth || originalHeight;

            if (hasFocalPoint && hasAnyDimensions && isNotSmart) {
                return setStrFocal(focalX, focalY);
            }
        }
    }
    return null;
};

export const setHeight = (width, height, proportion) => {
    const [axisX, axisY] = proportion.split(':').map(Number);

    return axisX > axisY ? Math.round((width / axisX) * axisY) : Number(height);
};

export const autoHeight = (originalHeight, originalWidth, newWidth) => {
    if (
        isValidNumber(originalHeight) &&
        isValidNumber(originalWidth) &&
        isValidNumber(newWidth)
    ) {
        return Math.round((newWidth / originalWidth) * originalHeight) || 0;
    }
    return 0;
};

export const updateHeight = (originalHeight, originalWidth, opt = {}) => {
    const { proportion } = opt;
    if (!proportion && originalWidth < originalHeight) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const [axisXX, axisYY] = aspectRatio.split(':');

        return parseInt((opt.width / axisXX) * axisYY, 10);
    }
    return opt.height;
};

// URl Logic

export const baseUrl = ({
    isInApertura,
    isAdmin,
    arcSite = 'lanacionar',
    resizerUrl
}) => {
    if (isValidString(resizerUrl) && resizerUrl.length) return resizerUrl;

    const SITE_URL = {
        foodit: SITE_FOODIT,
        lanacionar: SITE_LANACION
    };

    return isInApertura && !isAdmin
        ? SITE_URL[arcSite] || SITE_LANACION
        : RESIZER_URL_PUBLIC;
};

export const buildQueryParams = ({
    newWidth,
    newHeight,
    filterQuality = 70,
    focalPoint = [],
    arcImage
}) => {
    const imgAuth = get(arcImage, 'auth.1', '');
    const imgId = get(arcImage, '_id', '');
    const ext = get(arcImage, 'additional_properties.originalUrl', '')
        .split('.')
        .pop();
    const parsedExtension = [
        'webp',
        'png',
        'jpg',
        'jpeg',
        'gif',
        'tiff',
        'tif',
        'bmp',
        'jfif'
    ].includes(ext.toLowerCase())
        ? `.${ext}`
        : '';

    const auth = () => (isEmptyString(imgAuth) ? '' : `auth=${imgAuth}`);

    const width = () =>
        isValidNonZeroNumber(newWidth) ? `&width=${newWidth}` : '';
    const height = () =>
        isValidNonZeroNumber(newHeight) ? `&height=${newHeight}` : '';

    const quality = () =>
        isValidNonZeroNumber(filterQuality) ? `&quality=${filterQuality}` : '';

    // TODO: Revisar crop (no deberia suceder junto con focalPoint ni junto con smart)
    // const setCrop = () => crop !== null ? `&crop=${crop}` : '';

    // Se valida height y width ya que debe tenerlos SIEMPRE para focalPoint.
    const setFocal = () =>
        focalPoint.length > 1 &&
        isValidNonZeroNumber(newHeight) &&
        isValidNonZeroNumber(newWidth)
            ? `&focal=${focalPoint.map(
                  focal => isValidNumber(focal) && Math.round(focal)
              )}`
            : '';

    // Regla: Si existe focalPoint, smart y crop deben ser siempre false.
    const smart = () =>
        imgId &&
        !get(focalPoint, 'length', 0) &&
        isValidNonZeroNumber(newHeight) &&
        isValidNonZeroNumber(newWidth)
            ? '&smart=true'
            : '&smart=false';

    const image = imgId
        ? `${getSlugForImage(arcImage)}${imgId}${parsedExtension}`
        : encodeURIComponent(get(arcImage, 'url', ''));

    return arcImage
        ? `${image}?${auth()}${width()}${height()}${quality()}${smart()}${setFocal()}`
        : '';
};

export const resizeImgUrl = ({
    originalUrl,
    originalWidth,
    originalHeight,
    defaultResizeWithSmart = {},
    focalPoint = [],
    smartCropExcluded,
    filterQuality = 70,
    isInApertura = false,
    isAdmin = false,
    arcImage,
    arcSite,
    resizerUrl
}) => {
    const {
        useFullSize,
        proportion,
        width: newWidth = 0
    } = defaultResizeWithSmart;
    let { height: newHeight = 0 } = defaultResizeWithSmart;

    newHeight = !useFullSize ? 0 : newHeight;

    if (!newHeight && !newWidth) throw new Error('Height and Width required');

    // TODO: Revisar el buen funcionamiento del Crop
    const crop = setCropMethod({
        defaultResizeWithSmart,
        originalWidth,
        originalHeight,
        focalPoint
    });

    if (proportion) {
        newHeight = setHeight(newWidth, newHeight, proportion);
    }

    if (newHeight === 0 && (focalPoint.length > 1 || smartCropExcluded)) {
        newHeight = autoHeight(originalHeight, originalWidth, newWidth);
    }

    const imageUrl = get(arcImage, 'url', '');
    if (
        !get(arcImage, '_id', '') &&
        (isResizerV1(imageUrl) || isResizerV2(imageUrl))
    ) {
        return imageUrl;
    }

    return `${baseUrl({
        isInApertura,
        isAdmin,
        arcSite,
        resizerUrl
    })}/resizer/v2/${buildQueryParams({
        originalUrl,
        newWidth,
        newHeight,
        filterQuality,
        smartCropExcluded,
        focalPoint,
        arcImage,
        crop
    })}`;
};

export const resizeUrlCollection = ({
    originalUrl,
    originalWidth,
    originalHeight,
    defaultResizeWithSmart,
    focalPoint = [],
    smartCropExcluded,
    arcImage,
    isInApertura,
    arcSite,
    resizerUrl
}) => {
    const resp = [];
    const finalPreset = defaultResizeWithSmart;
    finalPreset?.forEach(opt => {
        const filterQuality = opt.quality || 70;
        const resizedUrl = resizeImgUrl({
            originalUrl,
            originalWidth,
            originalHeight,
            defaultResizeWithSmart: opt,
            focalPoint,
            smartCropExcluded,
            filterQuality,
            arcImage,
            isInApertura,
            arcSite,
            resizerUrl
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

// TODO: Exceso de complejida ciclomatica
export const resizeArcImage = ({
    arcImage,
    resizeOptions,
    zoomSizes,
    smartCropExcluded = false,
    defaultResize = {
        width: 768,
        height: 513,
        media: MEDIAMINWIDTH
    },
    isInApertura = false,
    arcSite,
    resizerUrl
}) => {
    if (arcImage.type !== 'image' || !arcImage.url)
        throw new Error(
            'Tipo de dato no valido. Se necesita un tipo "image" y una url para realizar el resize'
        );

    // TODO: Cambiar nombre Punto Focal
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

    const filterQuality = defaultResize.quality || 70;

    return {
        ...arcImage,
        width: fp || !smartCropExcluded ? 768 : arcImage.width,
        height: fp || !smartCropExcluded ? 513 : arcImage.height,
        url: resizeImgUrl({
            originalUrl: arcImage.url,
            originalWidth: arcImage.width,
            originalHeight: arcImage.height,
            defaultResizeWithSmart,
            focalPoint: fp,
            filterQuality,
            smartCropExcluded,
            arcImage,
            isInApertura,
            arcSite,
            resizerUrl
        }),
        // TODO: Hacer logica del resizerUrls
        resized_urls: resizeUrlCollection({
            originalUrl: arcImage.url,
            originalWidth: arcImage.width,
            originalHeight: arcImage.height,
            defaultResizeWithSmart: _resizeOptions,
            focalPoint: fp,
            smartCropExcluded,
            arcImage,
            isInApertura,
            arcSite,
            resizerUrl
        }),
        resized_urls_zoom: resizeUrlCollection({
            originalUrl: arcImage.url,
            originalWidth: arcImage.width,
            originalHeight: arcImage.height,
            defaultResizeWithSmart: _zoomSizes,
            focalPoint: fp,
            smartCropExcluded,
            arcImage,
            arcSite,
            resizerUrl
        })
    };
};

export const resizeArcGallery = (
    arcgallery,
    resizeOptions,
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
                resizeArcImage({
                    arcImage: i,
                    resizeOptions,
                    zoomSizes,
                    smartCropExcluded
                })
            )
    };
};
