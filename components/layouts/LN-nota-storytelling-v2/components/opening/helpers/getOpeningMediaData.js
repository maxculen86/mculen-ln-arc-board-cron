import get from '../../../../../private/common/utils/get';
import { buildOpeningImage } from '../../../../../private/LN/common/utils/openingImageHelper';
import { getOpeningMediaItems, getNormalizedImageData } from './mediaHelpers';
import getOpeningResizedUrls from './getOpeningResizedUrls';

const resolveAltText = ({ mobile, desktop, headline }) =>
    mobile.caption ||
    desktop.caption ||
    mobile.altText ||
    desktop.altText ||
    headline ||
    '';

const buildOpeningImageData = (promoItems = {}, headline = '') => {
    const { desktopImageItem, mobileImageItem } =
        getOpeningMediaItems(promoItems);

    const desktop = getNormalizedImageData(desktopImageItem);
    const mobile = getNormalizedImageData(mobileImageItem);
    const resizedUrls = getOpeningResizedUrls(promoItems);
    const altText = resolveAltText({ mobile, desktop, headline });

    return {
        url: desktop.url || mobile.url || '',
        resized_urls: resizedUrls,
        alt_text: altText,
        caption: mobile.caption || desktop.caption || '',
        titleText: headline
    };
};

export const buildStorytellingOpeningImage = (
    promoItems = {},
    headline = ''
) => {
    const openingImageData = buildOpeningImageData(promoItems, headline);
    return buildOpeningImage(openingImageData);
};

const getOpeningMediaData = (promoItems = {}, headline = '') => {
    const openingImage =
        buildStorytellingOpeningImage(promoItems, headline) || {};
    const diagram = get(
        promoItems,
        'custom_storytelling_opening.embed.config.diagram',
        'image-100-title-below'
    );

    return {
        src: openingImage.src,
        srcset: openingImage.srcset,
        sizes: openingImage.sizes,
        width: openingImage.width,
        height: openingImage.height,
        altText: openingImage.alt || '',
        diagram
    };
};

export default getOpeningMediaData;
