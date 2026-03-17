import { getOpeningMediaItems, getNormalizedImageData } from './mediaHelpers';

const getResizedUrlsByProportion = (imageData, proportion) => {
    const { resizedUrls } = getNormalizedImageData(imageData || {});
    const filtered = proportion
        ? resizedUrls.filter(item => item?.option?.proportion === proportion)
        : resizedUrls;

    return filtered.length ? filtered : resizedUrls;
};

const getOpeningResizedUrls = (promoItems = {}) => {
    const { desktopImageItem, mobileImageItem } =
        getOpeningMediaItems(promoItems);

    return [
        ...getResizedUrlsByProportion(desktopImageItem, '3:2'),
        ...getResizedUrlsByProportion(mobileImageItem, '2:3')
    ];
};

export default getOpeningResizedUrls;
