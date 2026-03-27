import BANNER_CONFIG from './config';

export const getBannerClasses = slotId => {
    const config = BANNER_CONFIG[slotId];

    if (!config) return '';

    return config;
};

export const isBannerBreakout = slotId =>
    BANNER_CONFIG[slotId]?.breakout || false;

export const getBreakoutWrapperClasses = slotId => {
    const isBreakout = isBannerBreakout(slotId);

    if (isBreakout) {
        return 'fixed w-screen left-0 top-0 z-[1600]';
    }

    return '';
};
