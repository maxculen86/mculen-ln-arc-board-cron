/* eslint-disable no-underscore-dangle */
import { RESIZER_URL_PUBLIC, SITE_LANACION, API_ENV } from 'fusion:environment';
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
    isValidString
} from '../../../dataValidation';
import { resizeArcImage } from './buildResizerUrls';

const MEDIAMINWIDTH = '(min-width: 768px)';

export const isResizerV2 = url =>
    isValidString(url) ? new RegExp(/\/resizer\/v2\//).test(url) : false;

export const isResizerV1 = url =>
    isValidString(url)
        ? new RegExp(/\/resizer\/(.+)\/filters:format(.+)/).test(url)
        : false;

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

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5},${y + 5}:${x + 5},${y - 5}`;

export const setHeight = (width, height, proportion) => {
    const [axisX, axisY] = proportion.split(':');

    return axisX > axisY ? parseInt((width / axisX) * axisY, 10) : height;
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

export const baseUrl = ({ isInApertura, isAdmin }) => {
    if (API_ENV === 'prod') {
        return isInApertura && !isAdmin ? SITE_LANACION : RESIZER_URL_PUBLIC;
    }
    return SITE_LANACION;
};

export const buildQueryParams = ({
    newWidth,
    newHeight,
    filterQuality = 70,
    focalPoint = [],
    smartCropExcluded,
    crop = null,
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
        isValidNumber(newWidth) && newWidth !== 0 ? `&width=${newWidth}` : '';

    const height = () =>
        isValidNumber(newHeight) && newHeight !== 0
            ? `&height=${newHeight}`
            : '';

    const quality = () =>
        isValidNumber(filterQuality) ? `&quality=${filterQuality}` : '';

    // TODO: Revisar crop (no deberia suceder junto con focalPoint ni junto con smart)
    // const setCrop = () => crop !== null ? `&crop=${crop}` : '';

    // Se valida height y width ya que debe tenerlos SIEMPRE para focalPoint.
    const setFocal = () =>
        focalPoint.length > 1 &&
        isValidNumber(newHeight) &&
        isValidNumber(newWidth)
            ? `&focal=${focalPoint.map(
                  focal => isValidNumber(focal) && Math.round(focal)
              )}`
            : '';

    // Regla: Si existe focalPoint, smart y crop deben ser siempre false.
    const smart = () =>
        !imgId || (focalPoint && focalPoint.length > 1)
            ? '&smart=false'
            : '&smart=true';

    const image = imgId
        ? `${getSlugForImage(arcImage)}${imgId}${parsedExtension}`
        : encodeURIComponent(get(arcImage, 'url', ''));

    return arcImage
        ? `${image}?${auth()}${width()}${height()}${quality()}${smart()}${setFocal()}`
        : '';
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

    return shorterSlug.charAt(shorterSlug.length - 1) === '-'
        ? shorterSlug
        : `${shorterSlug.slice(0, shorterSlug.lastIndexOf('-')) + '-'}`;
};
