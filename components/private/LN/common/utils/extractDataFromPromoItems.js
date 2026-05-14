import getBiggestImage from './getBiggestImage';
import buildImageVariants from './buildImageVariants';

export const urlSchema = 'https://schema.org';

const PLACEHOLDER_1200X800 = 'placeholderLN-1200x800.jpg';

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

    const isPlaceholder1200x800 = thumbnailUrl === PLACEHOLDER && PLACEHOLDER?.includes(PLACEHOLDER_1200X800);

    if (isPlaceholder1200x800 && image.length > 0) {
        image[0] = { ...image[0], width: 1200, height: 800 };
    }

    return {
        thumbnailUrl,
        image
    };
};
