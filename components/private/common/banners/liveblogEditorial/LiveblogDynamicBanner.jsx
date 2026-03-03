import React from 'react';
import { getBannerConfiguration } from '../../../LN/common/utils/bannerHelper';
import DivBannerSSR from '../DivBannerSSR';
import { isSubscribed, SUBSCRIBED_HELPER } from '../../auth/helper/loginHelper';

function LiveblogDynamicBanner({
    device,
    slotId,
    showForSubscriber = true,
    globalContent = {},
    globalContentConfig = {}
}) {
    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    if (subscription && !showForSubscriber) return null;

    const bannerConfiguration = getBannerConfiguration(
        globalContent,
        { group: 'nota' },
        globalContentConfig,
        { device, slotId }
    );

    if (!bannerConfiguration) return null;

    return (
        <DivBannerSSR
            bannerConfiguration={{
                ...bannerConfiguration,
                hideForSubscriptor: !showForSubscriber
            }}
        />
    );
}

export default LiveblogDynamicBanner;
