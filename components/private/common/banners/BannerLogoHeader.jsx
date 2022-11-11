/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import { getViewport } from '../../LN/common/utils/homeHelper';
import getQueryParamValue from '../utils/getQueryParamValue';
import {
    queueGoogletagCommand,
    suffixDevice
} from '../../LN/common/utils/bannerHelper';
import DivBannerSSR from './DivBannerSSR';
import checkHydrateOnly from '../../LN/common/utils/checkHydrateOnly';
import StaticContent from '../staticContent';

const BannerLogoHeader = ({ section, isAdmin }) => {
    const { siteProperties, globalContent, layout } = useAppContext();

    const nodeType = get(globalContent, 'node_type', '');
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
                        adstest: getQueryParamValue('adstest', window.location)
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

    const Component = (
        <>
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
        </>
    );
    return checkHydrateOnly({ nodeType, layout }) ? (
        <StaticContent>{Component}</StaticContent>
    ) : (
        <Static id="id-banner-logo">{Component}</Static>
    );
};

BannerLogoHeader.propTypes = {
    section: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default BannerLogoHeader;
