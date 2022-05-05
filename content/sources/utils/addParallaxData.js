import { CONTENT_BASE } from 'fusion:environment';
import getRequest from './getRequest';
import getImageResized from '../../../components/private/common/utils/getImageResized';

const addParallaxData = async (
    contentElements,
    cachedCall,
    presetsPromoItemsFotoAl100
) => {
    const parallaxs = contentElements.filter(
        x => x.type === 'custom_embed' && x.subtype === 'custom-parallax'
    );

    if (parallaxs.length) {
        let parallaxsImagesData = await Promise.all(
            parallaxs.map(parallax => {
                return cachedCall('imageSource', getRequest, {
                    query: `${CONTENT_BASE}/photo/api/v2/photos/${parallax.embed.config.imageId.trim()}`
                });
            })
        );

        parallaxsImagesData = parallaxsImagesData.map(image => {
            return resizeImageParallax(image, presetsPromoItemsFotoAl100);
        });

        return contentElements.map(element => {
            if (element.subtype === 'custom-parallax') {
                const index = parallaxsImagesData.findIndex(
                    x => x.id === element.embed.config.imageId
                );
                const newElement = element;
                newElement.embed.config.imageId = parallaxsImagesData[index];
                return newElement;
            }
            return element;
        });
    }
    return contentElements;
};

const resizeImageParallax = (image, presets) => {
    const {
        _id: id,
        url,
        width,
        height,
        focal_point: focalPointObject,
        caption = ''
    } = image;

    const focalPoint = focalPointObject ? Object.values(focalPointObject) : [];

    const { sizes } = presets;
    const sizesNew = sizes.map(size => ({
        ...size,
        isNotSmart: true
    }));

    const imageResized = getImageResized(
        url,
        width,
        height,
        sizesNew,
        focalPoint
    );

    return {
        id,
        url,
        width,
        height,
        caption,
        resized_urls: imageResized
    };
};

export default addParallaxData;
