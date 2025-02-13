import get from './get';

export const findTemplate = identifier => {
    if (['story', 'results'].includes(identifier)) return 'nota';
    if (identifier === '/deportes') return 'home_deportes';
    return 'home';
};

export const getInterval = (type, resolution, config, category) => {
    const template = findTemplate(type);
    const device = resolution === 'tablet' ? 'mobile' : resolution;
    const key =
        category === 'Estados Unidos'
            ? 'nota_estados_unidos'
            : `${template}_${device}`;
    const seconds = config ? config[key] : 0;

    return parseInt(seconds, 10) * 1000;
};

export const shouldBeExcluded = ({ globalContent }) => {
    const labelMetarefresh = get(globalContent, 'label.metarefresh.text', null);
    const contentElements = get(globalContent, 'content_elements', null);
    const promoItemExists = !!get(globalContent, 'promo_items.video_jw', null);

    return (
        (contentElements &&
            contentElements.some(
                contentElement =>
                    contentElement.type === 'raw_html' ||
                    contentElement.type === 'oembed_response' ||
                    contentElement.type === 'video_jw'
            )) ||
        promoItemExists ||
        labelMetarefresh === 'No'
    );
};
