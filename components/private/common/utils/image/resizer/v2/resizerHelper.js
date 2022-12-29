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
                const focalFilter = setStrFocal(focalX, focalY);
                return focalFilter;
            }
        }
    }
    return null;
};

// TODO: Hacer version sin thumbor

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5},${y + 5}:${x + 5},${y - 5}`;

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
    filterQuality = 80,
    focalPoint = [],
    smartCropExcluded = false,
    crop = null,
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

    // TODO: Revisar crop
    const setCrop = () => {
        return crop !== null ? `&crop=${crop}` : '';
    };

    const smart = () => {
        return focalPoint && focalPoint.length > 0
            ? `&smart=${false}`
            : `&smart=${smartCropExcluded}`;
    };

    return arcImage
        ? `${imgId}.${ext}?${auth()}${width()}${height()}${quality()}${smart()}`
        : '';
};

export default getDefaultSize;
