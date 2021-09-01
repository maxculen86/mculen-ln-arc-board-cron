/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import DivBanner from './DivBanner';
import { getViewport } from '../../LN/common/utils/homeHelper';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';
import {
    queueGoogletagCommand,
    suffixDevice
} from '../../LN/common/utils/bannerHelper';

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

    return (
        <Static id="id-banner-logo">
            <DivBanner id="logo_header_dsk" classes="--logo" shouldRender />
            <DivBanner id="logo_header_mob" classes="--logo" shouldRender />
            <DivBanner id="logo_header_tab" classes="--logo" shouldRender />
            {/* <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    const nodes = document.querySelectorAll('[id^="logo_header"]');
                    Array.from(nodes).map(x => x.classList.add('hlp-none'));
                });
                `
                }}
            /> */}
        </Static>
    );
};

BannerLogoHeader.propTypes = {
    section: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default BannerLogoHeader;
