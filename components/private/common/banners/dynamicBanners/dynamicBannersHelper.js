import React from 'react';
import DivBannerSSR from '../DivBannerSSR';
import Banner from '../../../../features/ui/ln/banner/default';
import { suffixDevice } from '../../../LN/common/utils/bannerHelper';
import get from '../../utils/get';
import { OPINION, STORYTELLING } from '../../utils/subtypes/subtypeHelper';
import { WrapperBody } from '../../../../features/LN/common/wrapperBody/default';
import isAllowedSection from '../../../LN/common/utils/isAllowedSection';
import siteProperties from '../../../../../properties/sites/la-nacion-ar';

const {
    layoutsName: { StoryTellingV2, NotaOpinion }
} = siteProperties || {};

export const MAX_DYNAMIC_BANNERS = 5;
export const BANNER_INSERT_INTERVAL = 4;
export const SUPPORTED_DEVICES = ['desktop', 'mobile'];

const BODY_DYNAMIC_BANNER_ID_PREFIX = 'body_';

const DYNAMIC_BANNER_CLASS_BY_DEVICE = {
    desktop: 'relative hidden md:flex',
    mobile: 'relative md:hidden'
};

const hasSlotStyles = slotId => /^(cinturon|caja)[1-4]_(dsk|mob)$/.test(slotId);

const getDynamicBannerClassName = bannerConfiguration =>
    hasSlotStyles(bannerConfiguration?.slotId)
        ? undefined
        : DYNAMIC_BANNER_CLASS_BY_DEVICE[bannerConfiguration?.device];

export function BannerWithWrapper({ bannerConfiguration }) {
    return (
        <WrapperBody variant="full-screen">
            <Banner
                bannerConfiguration={bannerConfiguration}
                className={getDynamicBannerClassName(bannerConfiguration)}
            />
        </WrapperBody>
    );
}

const DYNAMIC_BANNER_RULES = [
    {
        listOfAllowedSection: [{ subtype: OPINION, pageLayout: NotaOpinion }],
        settings: {
            BannerComponent: BannerWithWrapper
        }
    },
    {
        listOfAllowedSection: [
            { subtype: STORYTELLING, pageLayout: StoryTellingV2 }
        ],
        settings: {
            BannerComponent: BannerWithWrapper
        }
    }
];

const DEFAULT_BANNER_SETTINGS = {
    BannerComponent: DivBannerSSR,
    maxBanners: MAX_DYNAMIC_BANNERS
};

export const getDynamicBannerSettings = ({
    globalContent,
    layout,
    subtype
} = {}) => {
    const matched = DYNAMIC_BANNER_RULES.find(({ listOfAllowedSection }) =>
        isAllowedSection({
            globalContent,
            listOfAllowedSection,
            layout,
            subtype
        })
    );
    return matched?.settings ?? DEFAULT_BANNER_SETTINGS;
};

const BASE_CONFIG = {
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

const DYNAMIC_BANNER_CONFIG_BY_SUBTYPE = {
    [OPINION]: {
        ...BASE_CONFIG,
        mobile: {
            ...BASE_CONFIG.mobile,
            caja: {
                ...BASE_CONFIG.mobile.caja,
                dimensions: [
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 50],
                    [320, 180],
                    [360, 270],
                    [1, 1]
                ]
            }
        }
    },

    default: BASE_CONFIG
};

const getDynamicBannerConfigBySubtype = subtype =>
    DYNAMIC_BANNER_CONFIG_BY_SUBTYPE[subtype] ??
    DYNAMIC_BANNER_CONFIG_BY_SUBTYPE.default;

export const createDynamicBannerConfig = (
    globalContent,
    device,
    bannerIndex,
    layout
) => {
    if (!globalContent || !device || !bannerIndex) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { maxBanners } = getDynamicBannerSettings({
        globalContent,
        layout,
        subtype
    });
    if (maxBanners !== undefined && bannerIndex > maxBanners) return null;

    const deviceSuffix = suffixDevice[device];
    if (!deviceSuffix) return null;

    const isDesktop = device === 'desktop';
    const slotId = `${isDesktop ? 'cinturon' : 'caja'}${bannerIndex}${deviceSuffix}`;
    const bannerConfigBySubtype = getDynamicBannerConfigBySubtype(subtype);

    const referenceConfig = isDesktop
        ? bannerConfigBySubtype.desktop?.cinturon
        : bannerConfigBySubtype.mobile?.caja;

    if (!referenceConfig) return null;

    const { dfpId } = bannerConfigBySubtype;
    const { dimensions, bidding: referenceBidding } = referenceConfig;
    const bidding = referenceBidding || { prebid: { enabled: true } };

    const targeting = {
        sitio: 'lanacion',
        seccion: 'nota'
    };

    const slotName = `la_nacion_${device}/Nota/${slotId}`;
    const elementId =
        maxBanners === undefined
            ? `${BODY_DYNAMIC_BANNER_ID_PREFIX}${slotId}`
            : slotId;

    return {
        slotId,
        elementId,
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
        elementId,
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
        opt_div: elementId || slotId,
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
    key,
    layout
) => {
    const bannerConfiguration = createDynamicBannerConfig(
        globalContent,
        device,
        bannerIndex,
        layout
    );

    if (!bannerConfiguration) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { BannerComponent } = getDynamicBannerSettings({
        globalContent,
        layout,
        subtype
    });

    return (
        <BannerComponent key={key} bannerConfiguration={bannerConfiguration} />
    );
};

export const buildGoogleTagBannerConfig = (
    device,
    bannerIndex,
    globalContent,
    layout
) => {
    const bannerConfiguration = createDynamicBannerConfig(
        globalContent,
        device,
        bannerIndex,
        layout
    );

    if (!bannerConfiguration) return null;

    return mapBannerConfigToGoogleTagConfig(bannerConfiguration);
};

export const getDynamicBannersWithGPTConfigsForIndex = ({
    globalContent,
    currentDevice,
    bannerIndex,
    keyIndex,
    layout
}) => {
    if (!globalContent || !bannerIndex) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { BannerComponent } = getDynamicBannerSettings({
        globalContent,
        layout,
        subtype
    });
    const resolvedKeyIndex = keyIndex ?? bannerIndex;
    const bannerDivs = [];
    let googleTagConfig = null;

    SUPPORTED_DEVICES.forEach(device => {
        const bannerKey = `dynamic-banner-${device}-${bannerIndex}-${resolvedKeyIndex}`;
        const bannerConfiguration = createDynamicBannerConfig(
            globalContent,
            device,
            bannerIndex,
            layout
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
