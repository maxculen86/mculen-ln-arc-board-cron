/* eslint-disable no-underscore-dangle */
import { RESIZER_URL_PUBLIC, SITE_LANACION, API_ENV } from 'fusion:environment';
import {
    FOTOAL100,
    RECETA,
    STORYTELLING
} from '../../../subtypes/subtypeHelper';
import { getAspectRatio } from '../../../../../../../content/sources/utils/getRatio';
import get from '../../../get';

const MEDIAMINWIDTH = '(min-width: 768px)';

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

// TODO: Hacer version sin thumbor
export const setCropMethod = ({
    thumbor,
    originalWidth,
    originalHeight,
    focalPoint,
    smartCropExcluded,
    defaultResizeWithSmart = {}
}) => {
    const { proportion, isNotSmart } = defaultResizeWithSmart;
    console.log('🚀 ~ file: resizerHelper.js:39 ~ isNotSmart', isNotSmart);
    console.log('🚀 ~ file: resizerHelper.js:39 ~ proportion', proportion);
    if (proportion) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const notEqualProportion = aspectRatio !== proportion;

        if (notEqualProportion) {
            const [focalX, focalY] = focalPoint;
            const hasFocalPoint = focalPoint.length === 2;
            console.log(
                '🚀 ~ file: resizerHelper.js:48 ~ hasFocalPoint',
                hasFocalPoint
            );
            const hasAnyDimensions = originalWidth || originalHeight;
            console.log(
                '🚀 ~ file: resizerHelper.js:50 ~ hasAnyDimensions',
                hasAnyDimensions
            );
            console.log(
                '🚀 ~ file: resizerHelper.js:53 ~ isNotSmart',
                isNotSmart
            );

            if (hasFocalPoint && hasAnyDimensions && isNotSmart) {
                const focalFilter = setStrFocal(focalX, focalY);
                console.log(
                    '🚀 ~ file: resizerHelper.js:52 ~ focalFilter',
                    focalFilter
                );
                // setFilter(thumbor, ['focal', focalFilter]);
                return focalFilter;
            }
            if (!smartCropExcluded) {
                console.log(
                    '🚀 ~ file: resizerHelper.js:56 ~ smartCropExcluded',
                    !smartCropExcluded
                );

                thumbor.smartCrop(true);
            }
        }
    }
    return null;
};

// TODO: Hacer version sin thumbor

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5}x${y + 5}:${x + 5}x${y - 5}`;

const setFilter = (thumbor, [type, value]) =>
    thumbor.filter(`${type}(${value})`);

export const setHeight = (width, height, proportion) => {
    const [axisX, axisY] = proportion.split(':');

    return axisX > axisY ? parseInt((width / axisX) * axisY, 10) : height;
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

export const isEmptyString = string => {
    if (typeof string === 'string') {
        return !string.trim();
    }
    return true;
};

export const buildQueryParams = ({
    newWidth,
    newHeight,
    filterQuality,
    focalPoint,
    smartCropExcluded = false,
    arcImage
}) => {
    // Get the _id of the Image
    const imgAuth = get(arcImage, 'auth.1', '');
    const imgId = get(arcImage, '_id', '');
    const ext = get(arcImage, 'additional_properties.originalName', '')
        .split('.')
        .pop();

    const auth = () => {
        return isEmptyString(imgAuth) ? '' : `auth=${imgAuth}`;
    };

    const width = () => {
        return typeof newWidth === 'number' ? `&width=${newWidth}` : '';
    };

    const height = () => {
        return typeof newHeight === 'number' ? `&height=${newHeight}` : '';
    };

    const quality = () => {
        return typeof filterQuality === 'number'
            ? `&quality=${filterQuality}`
            : '';
    };

    const smart = () => {
        return focalPoint && focalPoint.length > 0
            ? `&smart=${false}`
            : `&smart=${smartCropExcluded}`;
    };

    return `${imgId}.${ext}?${auth()}${width()}${height()}${quality()}${smart()}`;
};

// / CREATE RESIZER
// export const createResizer = (isInApertura = false, isAdmin = false) => {
//     const aperturaUrl =
//         API_ENV === 'prod' ? SITE_LANACION : `https://www.lanacion.com.ar`;

//     const Thumbor =
//         // eslint-disable-next-line no-eval
//         typeof window === 'undefined' ? eval('require("thumbor")') : () => {};

//     return {
//         resizeUrl,
//         resizeUrls
//     };
// };

export default getDefaultSize;
