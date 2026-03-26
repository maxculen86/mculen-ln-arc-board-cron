import getBiggestImage from './getBiggestImage';
import buildImageVariants from './buildImageVariants';

export const urlSchema = 'https://schema.org';

export const extractDataFromPromoItems = (promoItems, PLACEHOLDER) => {
    const { basic } = promoItems || {};
    const { url, type } = basic || {};
    const isImage = basic && type === 'image';
    let thumbnailUrl = PLACEHOLDER;
    let image = buildImageVariants(PLACEHOLDER);

    if (promoItems && isImage) {
        const { resizedUrl } = getBiggestImage(basic);
        const pathImagen = url;
        thumbnailUrl = `${pathImagen}`;
        image = buildImageVariants(resizedUrl || pathImagen);
    }

    return {
        thumbnailUrl,
        image
    };
};
