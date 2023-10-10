import get from './get';

const checkAnyVideos = (globalContent = {}) => {
    const TYPE = 'video';
    const VIDEO_JW = 'video_jw';

    const promoItems = get(globalContent, 'promo_items', {});
    const contentElements = get(globalContent, 'content_elements', []);

    const basicType = get(promoItems, 'basic.type', '');
    const storytellingType = get(promoItems, 'storytelling.type', '');
    const videoJWSubtype = get(promoItems, 'video_jw.subtype', '');
    const aperturaMultimediaType = get(
        promoItems,
        'apertura_multimedia.type',
        ''
    );

    return (
        contentElements.some(
            contentElement =>
                contentElement.type === TYPE ||
                contentElement.subtype === VIDEO_JW
        ) ||
        [basicType, storytellingType, aperturaMultimediaType].includes(TYPE) ||
        videoJWSubtype === VIDEO_JW
    );
};

export default checkAnyVideos;
