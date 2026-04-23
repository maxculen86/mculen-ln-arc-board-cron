import get from '../../../../../components/private/common/utils/get';
import { extractGalleryEmbedData } from '../../../../../components/features/LN/common/galleryEmbed/helpers';

const buildGalleryEmbedData = async ({
    element,
    cachedCall,
    gallerySource,
    arcSite
}) => {
    if (get(element, 'subtype') !== 'gallery-embed') return null;

    const { galleryId, diagram, count, isFotoAl100, startPosition } =
        extractGalleryEmbedData(element);

    const resp = await cachedCall('gallerySource', gallerySource.fetch, {
        query: {
            id: galleryId,
            imageConfig: diagram,
            count,
            isFotoAl100,
            arcSite,
            resize: true,
            startPosition
        }
    });

    const images = get(resp, 'content_elements', []).map(img => ({
        url: get(img, 'url', ''),
        height: get(img, 'height', 0),
        width: get(img, 'width', 0),
        resized_urls: get(img, 'resized_urls', [])
    }));

    const video = get(element, 'embed.config.video', {});
    const videoPosition = Number(get(element, 'embed.config.videoPosition', 0));

    const hasVideo =
        Boolean(get(video, 'mp4', '')) &&
        videoPosition > 0 &&
        videoPosition <= images.length;

    if (hasVideo) {
        images[videoPosition - 1] = { ...video, type: 'video' };
    }

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

export default buildGalleryEmbedData;
