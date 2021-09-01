/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import { getViewport } from '../../LN/common/utils/homeHelper';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';
import {
    queueGoogletagCommand,
    suffixDevice
} from '../../LN/common/utils/bannerHelper';
import DivBannerSSR from './DivBannerSSR';

const BannerLogoHeader = ({ section, isAdmin }) => {
    const { siteProperties } = useAppContext();
    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    const config = get(siteProperties, 'bannerConfig.common', {});

    const { device } = getViewport();
    const slotId = device && `logo_header${suffixDevice[device]}`;

    useEffect(() => {
        const loadBanner = (optDiv, slotGroup, dev) => {
            const { slotName, dimensions } = config[dev][optDiv];
            const bannerToLoad = [
                {
                    adUnitPath: `/${dfpId}/${slotName}`,
                    opt_div: optDiv,
                    prebidEnabled: false,
                    size: dimensions,
                    slotGroup,
                    targeting: {
                        sitio: 'lanacion',
                        adstest: hasAdsTestParam()
                    }
                }
            ];
            queueGoogletagCommand(bannerToLoad);
        };

        !isAdmin && slotId && loadBanner(slotId, section, device);
    }, [isAdmin, config, device, dfpId, section, slotId]);

    const bannerConfiguration = {
        slotGroup: section,
        classes: '--logo hlp-none'
    };

    return (
        <Static id="id-banner-logo">
            <DivBannerSSR
                bannerConfiguration={{
                    ...bannerConfiguration,
                    slotId: 'logo_header_dsk'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    ...bannerConfiguration,
                    slotId: 'logo_header_mob'
                }}
            />
            <DivBannerSSR
                bannerConfiguration={{
                    ...bannerConfiguration,
                    slotId: 'logo_header_tab'
                }}
            />
        </Static>
    );
};

BannerLogoHeader.propTypes = {
    section: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default BannerLogoHeader;
