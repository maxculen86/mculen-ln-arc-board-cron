import get from './get';

// TODO: agregar tests a la brevedad

const checkAnyVideos = (globalContent = {}) => {
    const TYPE = 'video';
    const promoItems = get(globalContent, 'promo_items', {});
    const contentElements = get(globalContent, 'content_elements', []);

    const basicType = get(promoItems, 'basic.type', '');
    const storytellingType = get(promoItems, 'storytelling.type', '');
    const aperturaMultimediaType = get(
        promoItems,
        'apertura_multimedia.type',
        ''
    );

    return (
        contentElements.some(contentElement => contentElement.type === TYPE) ||
        [basicType, storytellingType, aperturaMultimediaType].includes(TYPE)
    );
};

export default checkAnyVideos;
