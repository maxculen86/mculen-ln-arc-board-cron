import { adjustImageDimensions } from './adjustImageDimensions';
import getBiggestImage from './getBiggestImage';
import { updateResizedUrl } from './updateResizedUrl';

export const urlShema = 'https://schema.org';

export const extractDataFromPromoItems = (promoItems, PLACEHOLDER) => {
    const { basic } = promoItems || {};
    const { url, type, height, width } = basic || {};
    const isImage = basic && type === 'image';
    let thumbnailUrl = PLACEHOLDER;
    let image = {
        '@context': urlShema,
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
            '@context': urlShema,
            '@type': 'ImageObject',
            url: newResizedUrl ? `${newResizedUrl}` : `${pathImagen}`,
            height: newHeight ? newHeight : height,
            width: newWidth ? newWidth : width
        };
    }

    return {
        thumbnailUrl,
        image
    };
};
