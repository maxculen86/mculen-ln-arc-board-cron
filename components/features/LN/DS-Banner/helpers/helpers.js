import bannersRules from '../../../../private/common/banners/bannersRules';
import get from '../../../../private/common/utils/get';
import { getBannerConfiguration } from '../../../../private/LN/common/utils/bannerHelper';

export const buildBannersConfiguration = ({
    desktop,
    mobile,
    tablet,
    globalContent,
    customFields,
    globalContentConfig
}) =>
    [
        { device: 'desktop', slotId: desktop },
        { device: 'mobile', slotId: mobile },
        { device: 'tablet', slotId: tablet }
    ]
        .map(bannerConfig =>
            bannerConfig.slotId
                ? getBannerConfiguration(
                      globalContent,
                      customFields,
                      globalContentConfig,
                      bannerConfig
                  )
                : null
        )
        .filter(Boolean);

export const getBannerCustomScript = ({ bannerConfiguration, sticky }) => {
    const customScript = get(
        bannersRules,
        `[${bannerConfiguration.slotGroup}][${bannerConfiguration.device}][${bannerConfiguration.slotId}].customScript`
    );

    return customScript ? customScript({ sticky }) : null;
};
