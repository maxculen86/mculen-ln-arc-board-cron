import getProperties from 'fusion:properties';
import get from '../utils/get';
import flatArray from '../utils/flatArray';
import getQueryParamValue from '../utils/getQueryParamValue';
import {
    buildBannerClasses,
    getSlotForDevice,
    shouldShow
} from '../../LN/common/utils/bannerHelper';
import bannersRules from './bannersRules';
import getViewport from '../../LN/common/utils/screenHelper';

export const filterBanners = blocksBanners => {
    const { device } = getViewport();

    const bannersConfiguration = blocksBanners.map(el => {
        const { desktop, tablet, mobile } = el;

        return [
            { device: 'desktop', slotId: desktop },
            { device: 'mobile', slotId: mobile },
            { device: 'tablet', slotId: tablet }
        ]
            .map(bannerConfig => {
                return bannerConfig.slotId
                    ? getBannerConfiguration({ group: 'home' }, bannerConfig)
                    : null;
            })
            .filter(item => item !== null);
    });
    return blocksBanners
        .map(el => {
            const { desktop, tablet, mobile } = el;

            const slotId = getSlotForDevice(device)([
                {
                    name: 'desktop',
                    slot: desktop
                },
                { name: 'mobile', slot: mobile },
                { name: 'tablet', slot: tablet }
            ]);

            if (!slotId) return {};

            const config = []
                .concat(...bannersConfiguration)
                .find(ban => ban.slotId === slotId);

            if (!config) return {};

            return config;
        })
        .map(
            ({
                dfpId,
                slotName,
                dimensions,
                slotId,
                bidding,
                targeting,
                slotGroup
            }) => ({
                adUnitPath: `/${dfpId}/${slotName}`,
                size: flatArray(dimensions),
                opt_div: slotId,
                prebidEnabled: get(bidding, 'prebid.enabled', false),
                targeting: {
                    ...targeting,
                    adstest: getQueryParamValue('adstest', window.location)
                },
                slotGroup
            })
        )
        .filter(el => Object.keys(el).length > 0 && el.opt_div);
};

export const getBannerConfiguration = (customFields, bannerConfig = {}) => {
    const { group: slotGroup } = customFields || {};
    const { device, slotId } = bannerConfig;
    const siteProperties = getProperties('la-nacion-ar');

    if (!slotId || !slotGroup) return null;

    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');

    const config = get(
        siteProperties,
        `bannerConfig[${slotGroup}][${
            slotId.includes('_amp') ? 'amp' : device
        }][${slotId}]`
    );

    // Se valida que se cumpla las reglas del banner
    const noValidate =
        get(
            bannersRules,
            `[${slotGroup}][${device}][${slotId}].validateInclusion`
        ) && !bannersRules[slotGroup][device][slotId].validateInclusion({});

    if (!config || !dfpId || noValidate || !shouldShow(false, {}, []))
        return null;

    return {
        ...config,
        device,
        slotId,
        slotGroup,
        dfpId,
        classes: buildBannerClasses(config, customFields),
        targeting: config.targeting
    };
};
