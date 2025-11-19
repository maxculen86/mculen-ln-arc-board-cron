import get from '../../../../../private/common/utils/get';

export const filterGalleryEmbeds = (contentElements = []) =>
    contentElements.filter(
        el => el?.subtype === 'gallery-embed' && el?.type === 'custom_embed'
    );

export const extractGalleryEmbedData = (elements = []) => {
    if (!Array.isArray(elements) || !elements.length) return [];

    return elements.map(element => {
        const config = get(element, 'embed.config', {});
        const galleryId = get(config, 'galleryId', '');
        const caption = get(config, 'caption', '');
        const diagram = get(config, 'diagram', '');
        const galleryImages = get(config, 'galleryImages', []);

        return {
            galleryId,
            caption,
            diagram,
            galleryImages
        };
    });
};
