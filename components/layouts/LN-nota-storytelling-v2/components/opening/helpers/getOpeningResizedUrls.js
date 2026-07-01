import { getOpeningMediaItems, getNormalizedImageData } from './mediaHelpers';

const isMobileDimension = image => Boolean(image?.option?.isMobileDimension);

const getDimensionKey = image => {
    const { width, height } = image?.option || {};
    return width && height ? `${width}x${height}` : '';
};

const getDimensionKeySet = resizedUrls =>
    new Set(resizedUrls.map(getDimensionKey).filter(Boolean));

export const getMobileResizedUrls = imageData => {
    const { resizedUrls } = getNormalizedImageData(imageData || {});
    const mobileUrls = resizedUrls.filter(isMobileDimension);
    const legacyMobileUrls = resizedUrls.filter(
        image => image?.option?.proportion === '2:3'
    );

    if (mobileUrls.length) return mobileUrls;
    if (legacyMobileUrls.length) return legacyMobileUrls;

    return resizedUrls;
};

export const getDesktopResizedUrls = (imageData, mobileImageData) => {
    const { resizedUrls } = getNormalizedImageData(imageData || {});
    const desktopUrls = resizedUrls.filter(image => !isMobileDimension(image));

    if (desktopUrls.length !== resizedUrls.length) {
        return desktopUrls;
    }

    const mobileDimensionKeys = getDimensionKeySet(
        getMobileResizedUrls(mobileImageData)
    );
    const desktopUrlsWithoutMobile = resizedUrls.filter(
        image => !mobileDimensionKeys.has(getDimensionKey(image))
    );

    return desktopUrlsWithoutMobile.length
        ? desktopUrlsWithoutMobile
        : resizedUrls;
};

const getOpeningResizedUrls = (promoItems = {}) => {
    const { desktopImageItem, mobileImageItem } =
        getOpeningMediaItems(promoItems);
    const hasMobileImage = Boolean(promoItems.storytelling_mobile);

    if (!hasMobileImage) {
        return getNormalizedImageData(desktopImageItem || {}).resizedUrls;
    }

    return [
        ...getDesktopResizedUrls(desktopImageItem, mobileImageItem),
        ...getMobileResizedUrls(mobileImageItem)
    ];
};

export default getOpeningResizedUrls;
