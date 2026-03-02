import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../../private/common/utils/get';
import { getOpeningMediaItems, getNormalizedImageData } from './mediaHelpers';
import getOpeningResizedUrls from './getOpeningResizedUrls';

const resolveAltText = ({ mobile, desktop, headline }) =>
    mobile.caption ||
    desktop.caption ||
    mobile.altText ||
    desktop.altText ||
    headline ||
    '';

const resolveImgDefault = ({ resizedUrls, mobile, desktop }) => {
    const shortestImage = getShortestImage(resizedUrls);
    return shortestImage.resizedUrl || mobile.url || desktop.url || '';
};

const getOpeningMediaData = (promoItems = {}, headline = '') => {
    const { desktopImageItem, mobileImageItem } =
        getOpeningMediaItems(promoItems);

    const desktop = getNormalizedImageData(desktopImageItem);
    const mobile = getNormalizedImageData(mobileImageItem);

    const resizedUrls = getOpeningResizedUrls(promoItems);
    const pictureSources = getImagesToLoadWithPicture(false, resizedUrls);

    const imgDefaultUrl = resolveImgDefault({ resizedUrls, mobile, desktop });
    const altText = resolveAltText({ mobile, desktop, headline });
    const diagram = get(
        promoItems,
        'custom_storytelling_opening.embed.config.diagram',
        'image-100-title-below'
    );

    return { pictureSources, imgDefaultUrl, altText, diagram };
};

export default getOpeningMediaData;
