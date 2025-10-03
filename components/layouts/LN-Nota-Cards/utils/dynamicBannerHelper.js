import React from 'react';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';
import { suffixDevice } from '../../../private/LN/common/utils/bannerHelper';

export const MAX_DYNAMIC_BANNERS = 5;
export const BANNER_INSERT_INTERVAL = 4;

const DYNAMIC_BANNER_CONFIG = {
    dfpId: 133919216,
    desktop: {
        cinturon: {
            dimensions: [
                [1, 1],
                [728, 90],
                [920, 100],
                [920, 120],
                [920, 170],
                [920, 250],
                [920, 300],
                [1260, 300],
                [970, 250]
            ],
            bidding: { prebid: { enabled: true } }
        }
    },
    mobile: {
        caja: {
            dimensions: [
                [300, 450],
                [320, 450],
                [280, 450],
                [250, 450],
                [300, 250],
                [320, 100],
                [300, 600],
                [336, 450],
                [1, 1]
            ],
            bidding: { prebid: { enabled: true } }
        }
    }
};

export const shouldInsertBanner = (itemIndex, bannerIndex) => {
    const isInsertPosition =
        (itemIndex + 1) % BANNER_INSERT_INTERVAL === 0 && itemIndex >= 0;
    const withinLimit = bannerIndex <= MAX_DYNAMIC_BANNERS;
    return isInsertPosition && withinLimit;
};

export const createDynamicBannerConfig = (
    globalContent,
    device,
    bannerIndex
) => {
    if (!globalContent || !device || !bannerIndex) return null;

    if (bannerIndex > MAX_DYNAMIC_BANNERS) return null;

    const deviceSuffix = suffixDevice[device];
    if (!deviceSuffix) return null;

    const isDesktop = device === 'desktop';
    const slotId = `${isDesktop ? 'cinturon' : 'caja'}${bannerIndex}${deviceSuffix}`;

    const referenceConfig = isDesktop
        ? DYNAMIC_BANNER_CONFIG.desktop.cinturon
        : DYNAMIC_BANNER_CONFIG.mobile.caja;

    if (!referenceConfig) return null;

    const { dfpId } = DYNAMIC_BANNER_CONFIG;
    const { dimensions, bidding: referenceBidding } = referenceConfig;
    const bidding = referenceBidding || { prebid: { enabled: true } };

    const targeting = {
        sitio: 'lanacion',
        seccion: 'nota'
    };

    const slotName = `la_nacion_${device}/Nota/${slotId}`;

    return {
        slotId,
        slotGroup: 'nota',
        device,
        dfpId,
        slotName,
        targeting,
        dimensions,
        withoutHide: true,
        bidding,
        hideForSubscriptor: false
    };
};

export const renderDynamicBanner = (
    globalContent,
    device,
    bannerIndex,
    key
) => {
    const bannerConfiguration = createDynamicBannerConfig(
        globalContent,
        device,
        bannerIndex
    );

    if (!bannerConfiguration) return null;

    return <DivBannerSSR key={key} bannerConfiguration={bannerConfiguration} />;
};

export const validateBannerConfig = config => {
    const requiredFields = [
        'slotId',
        'slotGroup',
        'device',
        'dfpId',
        'slotName',
        'targeting',
        'dimensions'
    ];

    if (!config) return false;

    return requiredFields.every(
        field => config[field] !== undefined && config[field] !== null
    );
};

export default {
    createDynamicBannerConfig,
    renderDynamicBanner,
    validateBannerConfig,
    shouldInsertBanner
};
