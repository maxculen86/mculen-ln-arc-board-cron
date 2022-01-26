/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import flatArray from '../utils/flatArray';
import getQueryParamValue from '../utils/getQueryParamValue';
import { isSubscribed } from '../../LN/common/utils/contextHelper';
import {
    getBannerConfiguration,
    getSlotForDevice,
    queueGoogletagCommand,
    suffixDevice
} from '../../LN/common/utils/bannerHelper';

const LoadBanners = ({ blocksBanners }) => {
    const [bannersLoaded, setBannersLoaded] = useState(() => false);
    const { outputType, isAdmin } = useAppContext();
    const [suffix, setSuffix] = useState();
    const device = useViewportSize();

    const subscription = isSubscribed();

    const bannersConfiguration = blocksBanners.map(el => {
        const { desktop, tablet, mobile } = el;

        return [
            { device: 'desktop', slotId: desktop },
            { device: 'mobile', slotId: mobile },
            { device: 'tablet', slotId: tablet }
        ]
            .map(bannerConfig => {
                return bannerConfig.slotId
                    ? getBannerConfiguration(
                          {},
                          { group: 'home' },
                          {},
                          bannerConfig
                      )
                    : null;
            })
            .filter(item => item !== null);
    });
    useEffect(() => {
        if (getQueryParamValue('adstest', window.location) === 'true') {
            googletag.cmd.push(() => {
                googletag.pubads().setTargeting('adstest', ['true']);
            });
        }
    }, []);

    useEffect(() => {
        if (outputType && device)
            setSuffix(() =>
                outputType === 'amp' ? '_amp' : suffixDevice[device]
            );
    }, [device, outputType]);

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

                        if (!slotId) return {};

                        if (validateSubscription && subscription) return {};

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
                    queueGoogletagCommand(blocksConfig);

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

    return <div className="hlp-none">Cargando banners ...</div>;
};

LoadBanners.propTypes = {
    blocksBanners: PropTypes.arrayOf(
        PropTypes.shape({
            slotGroup: PropTypes.string
        })
    )
};

LoadBanners.defaultProps = { blocksBanners: [] };

export default LoadBanners;
