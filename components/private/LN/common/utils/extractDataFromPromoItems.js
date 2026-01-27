import { adjustImageDimensions } from './adjustImageDimensions';
import getBiggestImage from './getBiggestImage';
import { updateResizedUrl } from './updateResizedUrl';

export const urlSchema = 'https://schema.org';

export const extractDataFromPromoItems = (promoItems, PLACEHOLDER) => {
    const { basic } = promoItems || {};
    const { url, type, height, width } = basic || {};
    const isImage = basic && type === 'image';
    let thumbnailUrl = PLACEHOLDER;
    let image = {
        '@context': urlSchema,
        '@type': 'ImageObject',
        url: PLACEHOLDER,
        height: '800',
        width: '1200'
    };

    if (promoItems && isImage) {
        const { resizedUrl, bigWidth, bigHeight } = getBiggestImage(basic);
        const { newWidth, newHeight } = adjustImageDimensions(
            bigWidth,
            bigHeight
        );
        const newResizedUrl = updateResizedUrl(resizedUrl, newWidth, newHeight);
        const pathImagen = url;
        thumbnailUrl = `${pathImagen}`;
        image = {
            '@context': urlSchema,
            '@type': 'ImageObject',
            url: newResizedUrl ? `${newResizedUrl}` : `${pathImagen}`,
            height: newHeight || height,
            width: newWidth || width
        };
    }

    return {
        thumbnailUrl,
        image
    };
};
