/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import flatArray from '../utils/flatArray';
import getQueryParamValue from '../utils/getQueryParamValue';
import {
    getBannerConfiguration,
    getSlotForDevice,
    queueGoogletagCommand
} from '../../LN/common/utils/bannerHelper';
import useAdsTestAndSuffix from '../hooks/useAdsTestAndSuffix';
import { isSubscribed, SUBSCRIBED_HELPER } from '../auth/helper/loginHelper';

function LoadBanners({ blocksBanners = [] }) {
    const [bannersLoaded, setBannersLoaded] = useState(() => false);
    const { outputType, isAdmin } = useAppContext();
    const device = useViewportSize();

    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const bannersConfiguration = blocksBanners.map(el => {
        const { desktop, tablet, mobile } = el;

        return [
            { device: 'desktop', slotId: desktop },
            { device: 'mobile', slotId: mobile },
            { device: 'tablet', slotId: tablet }
        ]
            .map(bannerConfig =>
                bannerConfig.slotId
                    ? getBannerConfiguration(
                          {},
                          { group: 'home' },
                          {},
                          bannerConfig
                      )
                    : null
            )
            .filter(item => item !== null);
    });

    const suffix = useAdsTestAndSuffix(device, outputType);

    useEffect(() => {
        try {
            if (blocksBanners.length > 0 && suffix && device && !isAdmin) {
                const blocksConfig = blocksBanners
                    .map(el => {
                        const {
                            desktop,
                            tablet,
                            mobile,
                            validateSubscription
                        } = el;

                        const slotId = getSlotForDevice(device)([
                            {
                                name: 'desktop',
                                slot: desktop
                            },
                            { name: 'mobile', slot: mobile },
                            { name: 'tablet', slot: tablet }
                        ]);

                        if (!slotId || (validateSubscription && subscription))
                            return {};

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
                            prebidEnabled: get(
                                bidding,
                                'prebid.enabled',
                                false
                            ),
                            targeting: {
                                ...targeting,
                                adstest: getQueryParamValue(
                                    'adstest',
                                    window.location
                                )
                            },
                            slotGroup
                        })
                    )
                    .filter(el => Object.keys(el).length > 0 && el.opt_div);

                if (!bannersLoaded) {
                    setBannersLoaded(() => true);
                    queueGoogletagCommand(blocksConfig, { subscription });

                    console.log(
                        '🚀 ~ file: blocksBanners && suffix && device',
                        blocksBanners,
                        blocksConfig,
                        suffix,
                        device
                    );
                }
            }
        } catch (error) {
            console.error('🚀 ~ file: LoadBanners.jsx  ~ error', error);
        }
    }, [
        bannersLoaded,
        blocksBanners,
        device,
        isAdmin,
        suffix,
        subscription,
        bannersConfiguration
    ]);

    return <div className="none">Cargando banners ...</div>;
}

export default LoadBanners;
