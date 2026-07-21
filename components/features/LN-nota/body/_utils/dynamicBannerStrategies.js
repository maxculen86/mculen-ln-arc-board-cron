import { BANNER_INSERT_INTERVAL } from '../../../../private/common/banners/dynamicBanners/dynamicBannersHelper';
import {
    OPINION,
    STORYTELLING
} from '../../../../private/common/utils/subtypes/subtypeHelper';

export const NON_SUBSCRIBER_BANNER_INSERT_INTERVAL = 5;
export const SUBSCRIBER_BANNER_INSERT_INTERVAL = 8;

export const getUserBannerInsertInterval = isSubscribed =>
    isSubscribed
        ? SUBSCRIBER_BANNER_INSERT_INTERVAL
        : NON_SUBSCRIBER_BANNER_INSERT_INTERVAL;

const defaultBannerStrategy = {
    shouldInsert: ({ itemIndex, bannerIndex, maxBanners }) => {
        const isInsertPosition =
            (itemIndex + 1) % BANNER_INSERT_INTERVAL === 0 && itemIndex >= 0;
        const withinLimit =
            maxBanners === undefined || bannerIndex <= maxBanners;

        return isInsertPosition && withinLimit;
    },
    getBannerIndex: ({ elementPosition }) =>
        elementPosition / BANNER_INSERT_INTERVAL
};

const userTypeBannerStrategy = {
    shouldInsert: ({ itemIndex, bannerIndex, maxBanners, isSubscribed }) => {
        const insertInterval = getUserBannerInsertInterval(isSubscribed);
        const isInsertPosition =
            (itemIndex + 1) % insertInterval === 0 && itemIndex >= 0;
        const withinLimit =
            maxBanners === undefined || bannerIndex <= maxBanners;

        return isInsertPosition && withinLimit;
    },
    getBannerIndex: ({ bannerCounter }) => bannerCounter.current + 1
};

const BANNER_STRATEGIES = {
    [OPINION]: userTypeBannerStrategy,
    [STORYTELLING]: userTypeBannerStrategy,
    default: defaultBannerStrategy
};

export const getBannerStrategy = subtype =>
    BANNER_STRATEGIES[subtype] ?? BANNER_STRATEGIES.default;
