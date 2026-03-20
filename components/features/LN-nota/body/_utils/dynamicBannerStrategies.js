import { BANNER_INSERT_INTERVAL } from '../../../../private/common/banners/dynamicBanners/dynamicBannersHelper';
import { OPINION } from '../../../../private/common/utils/subtypes/subtypeHelper';

const defaultBannerStrategy = {
    shouldInsert: ({ itemIndex, bannerIndex, maxBanners }) => {
        const isInsertPosition =
            (itemIndex + 1) % BANNER_INSERT_INTERVAL === 0 && itemIndex >= 0;
        const withinLimit = bannerIndex <= maxBanners;

        return isInsertPosition && withinLimit;
    },
    getBannerIndex: ({ elementPosition }) =>
        elementPosition / BANNER_INSERT_INTERVAL
};

const opinionBannerStrategy = {
    shouldInsert: ({ itemIndex, bannerCounter, bannerIndex, maxBanners }) => {
        const withinLimit = bannerIndex <= maxBanners;

        if (!withinLimit) return false;

        if (bannerCounter.current === 0) {
            return itemIndex === 1;
        }

        const shiftedIndex = itemIndex - 2;

        const isInsertPosition =
            shiftedIndex >= 0 &&
            (shiftedIndex + 1) % BANNER_INSERT_INTERVAL === 0;

        return isInsertPosition;
    },
    getBannerIndex: ({ bannerCounter }) => bannerCounter.current + 1
};

const BANNER_STRATEGIES = {
    [OPINION]: opinionBannerStrategy,
    default: defaultBannerStrategy
};

export const getBannerStrategy = subtype =>
    BANNER_STRATEGIES[subtype] ?? BANNER_STRATEGIES.default;
