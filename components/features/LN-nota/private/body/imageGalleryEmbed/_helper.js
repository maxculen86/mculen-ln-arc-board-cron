import { cx } from '@ln/ds-cva';
import get from '../../../../../private/common/utils/get';

export const extractGalleryEmbedData = (element = {}) => {
    if (!element || typeof element !== 'object') return {};

    const config = get(element, 'embed.config', {});
    const galleryId = get(config, 'galleryId', '');
    const caption = get(config, 'caption', '');
    const diagram = get(config, 'diagram', '');
    const isFotoAl100 = get(config, 'isFotoAl100', false);
    const galleryImages = get(config, 'galleryImages', []);
    const count = get(config, 'count', 0);

    return {
        galleryId,
        caption,
        diagram,
        isFotoAl100,
        galleryImages,
        count
    };
};

export const getAspectRatioClass = diagram =>
    cx({
        'aspect-[2/3]':
            diagram === 'vertical-two' || diagram === 'vertical-three',
        'aspect-[3/2]':
            diagram !== 'vertical-two' && diagram !== 'vertical-three'
    });

export const buildGalleryEmbedData = async ({
    element,
    cachedCall,
    gallerySource,
    arcSite
}) => {
    if (get(element, 'subtype') !== 'gallery-embed') return null;

    const { galleryId, diagram, count, isFotoAl100 } =
        extractGalleryEmbedData(element);

    const resp = await cachedCall('gallerySource', gallerySource.fetch, {
        query: {
            id: galleryId,
            imageConfig: diagram,
            count,
            isFotoAl100,
            arcSite,
            resize: true
        }
    });

    const images = get(resp, 'content_elements', []).map(img => ({
        url: get(img, 'url', ''),
        height: get(img, 'height', 0),
        width: get(img, 'width', 0),
        resized_urls: get(img, 'resized_urls', [])
    }));

    return {
        ...element,
        embed: {
            config: {
                ...element.embed.config,
                galleryImages: images
            }
        }
    };
};
