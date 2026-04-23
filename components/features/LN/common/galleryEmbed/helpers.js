import { cx } from '@ln/ds-cva';
import get from '../../../../private/common/utils/get';

export const extractGalleryEmbedData = (element = {}) => {
    if (!element || typeof element !== 'object') return {};

    const config = get(element, 'embed.config', {});
    const galleryId = get(config, 'galleryId', '');
    const caption = get(config, 'caption', '');
    const diagram = get(config, 'diagram', '');
    const isFotoAl100 = get(config, 'isFotoAl100', false);
    const galleryImages = get(config, 'galleryImages', []);
    const count = get(config, 'count', 0);
    const startPosition = get(config, 'startPosition', 1);

    return {
        galleryId,
        caption,
        diagram,
        isFotoAl100,
        galleryImages,
        count,
        startPosition
    };
};

export const getAspectRatioClass = diagram => {
    const isVertical = [
        'vertical-two',
        'vertical-three',
        'vertical-single-centered'
    ].includes(diagram);

    return cx({
        'aspect-[2/3]': isVertical,
        'aspect-[3/2]': !isVertical
    });
};
