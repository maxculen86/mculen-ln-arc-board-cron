import get from 'lodash.get';

const videoThumbnail = thumbnail => {
    if (!thumbnail) return null;

    const src = get(thumbnail, 'basic.url');

    if (!src) return null;

    return {
        _t: 'mmi',
        orden: 0,
        src
    };
};

export default videoThumbnail;
