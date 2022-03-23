import getBiggestImage from './getBiggestImage';

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
        const pathImagen = url;
        thumbnailUrl = `${pathImagen}`;
        image = {
            '@context': urlShema,
            '@type': 'ImageObject',
            url: resizedUrl ? `${resizedUrl}` : `${pathImagen}`,
            height: bigHeight ? `${bigHeight}` : `${height}`,
            width: bigWidth ? `${bigWidth}` : `${width}`
        };
    }

    return {
        thumbnailUrl,
        image
    };
};
