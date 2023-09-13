import get from '../../../../../common/utils/get';

export const videoJWThumbnail = src => {
    if (!src) return null;

    return {
        _t: 'mmi',
        order: 0,
        src
    };
};

export const videoJWThumbnailGlobal = src => {
    if (!src) return null;

    return {
        _t: 'mmi',
        orden: 0,
        src
    };
};

export default videoJWThumbnail;
