import React from 'react';
import DivBannerSSR from '../DivBannerSSR';
import DynamicBanner from '../../../../features/ui/ln/dynamicBanner/default';
import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import get from '../../utils/get';
import { OPINION } from '../../utils/subtypes/subtypeHelper';

export const MAX_DYNAMIC_BANNERS = 5;
export const BANNER_INSERT_INTERVAL = 4;
export const SUPPORTED_DEVICES = ['desktop', 'mobile'];

export const DYNAMIC_BANNER_SETTINGS_BY_SUBTYPE = {
    [OPINION]: {
        BannerComponent: DynamicBanner,
        maxBanners: 4
    },
    default: {
        BannerComponent: DivBannerSSR,
        maxBanners: MAX_DYNAMIC_BANNERS
    }
};

export const getDynamicBannerSettingsBySubtype = subtype =>
    DYNAMIC_BANNER_SETTINGS_BY_SUBTYPE[subtype] ??
    DYNAMIC_BANNER_SETTINGS_BY_SUBTYPE.default;

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

export const shouldInsertBanner = (itemIndex, bannerIndex, subtype = '') => {
    const isInsertPosition =
        (itemIndex + 1) % BANNER_INSERT_INTERVAL === 0 && itemIndex >= 0;

    const { maxBanners } = getDynamicBannerSettingsBySubtype(subtype);
    const withinLimit = bannerIndex <= maxBanners;

    return isInsertPosition && withinLimit;
};

export const createDynamicBannerConfig = (
    globalContent,
    device,
    bannerIndex
) => {
    if (!globalContent || !device || !bannerIndex) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { maxBanners } = getDynamicBannerSettingsBySubtype(subtype);
    if (bannerIndex > maxBanners) return null;

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

export const mapBannerConfigToGoogleTagConfig = bannerConfiguration => {
    const {
        slotId,
        slotGroup,
        dfpId,
        slotName,
        targeting,
        dimensions,
        withoutHide,
        bidding,
        hideForSubscriptor
    } = bannerConfiguration;

    return {
        adUnitPath: `/${dfpId}/${slotName}`,
        size: dimensions,
        opt_div: slotId,
        sizemap: [],
        prebidEnabled: bidding?.prebid?.enabled || false,
        targeting,
        slotGroup,
        hideForSubscriptor,
        withoutHide,
        customTargeting: {}
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

    const subtype = get(globalContent, 'subtype', '');
    const { BannerComponent } = getDynamicBannerSettingsBySubtype(subtype);

    return (
        <BannerComponent key={key} bannerConfiguration={bannerConfiguration} />
    );
};

export const buildGoogleTagBannerConfig = (
    device,
    bannerIndex,
    globalContent
) => {
    const bannerConfiguration = createDynamicBannerConfig(
        globalContent,
        device,
        bannerIndex
    );

    if (!bannerConfiguration) return null;

    return mapBannerConfigToGoogleTagConfig(bannerConfiguration);
};

export const getDynamicBannersWithGPTConfigsForIndex = ({
    globalContent,
    currentDevice,
    bannerIndex,
    keyIndex
}) => {
    if (!globalContent || !bannerIndex) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { BannerComponent } = getDynamicBannerSettingsBySubtype(subtype);
    const resolvedKeyIndex = keyIndex ?? bannerIndex;
    const bannerDivs = [];
    let googleTagConfig = null;

    SUPPORTED_DEVICES.forEach(device => {
        const bannerKey = `dynamic-banner-${device}-${bannerIndex}-${resolvedKeyIndex}`;
        const bannerConfiguration = createDynamicBannerConfig(
            globalContent,
            device,
            bannerIndex
        );

        if (!bannerConfiguration) return;

        const bannerDiv = (
            <BannerComponent
                key={bannerKey}
                bannerConfiguration={bannerConfiguration}
            />
        );

        bannerDivs.push(bannerDiv);

        if (device === currentDevice) {
            googleTagConfig =
                mapBannerConfigToGoogleTagConfig(bannerConfiguration);
        }
    });

    if (bannerDivs.length === 0) return null;

    return {
        bannerDivs,
        googleTagConfig
    };
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
