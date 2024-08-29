import { CONTENT_BASE } from 'fusion:environment';
import getRequest from './getRequest';
import { resizeUrlCollection } from '../../../components/private/common/utils/image/resizer/v2/resizerHelper';

const addParallaxData = async (
    contentElements,
    cachedCall,
    presetsPromoItemsFotoAl100,
    arcSite
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
            return resizeImageParallax(
                image,
                presetsPromoItemsFotoAl100,
                arcSite
            );
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

const resizeImageParallax = (image, presets, arcSite) => {
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

    const imageResized = resizeUrlCollection({
        originalUrl: url,
        originalWidth: width,
        originalHeight: height,
        defaultResizeWithSmart: sizesNew,
        focalPoint,
        arcImage: image,
        arcSite
    });

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
