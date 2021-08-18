/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import { queueGoogletagCommand } from './LoadBanners';
import DivBanner from './DivBanner';
import getBannerConfig from './bannersCommon';
import { getViewport } from '../../LN/common/utils/homeHelper';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';
import { getSlotForDevice } from '../../LN/common/bannerRefactor/utils';

const BannerLogoHeader = ({ section }) => {
    const { siteProperties } = useAppContext();
    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');

    const { isMobile, isTablet, isDesktop, device } = getViewport();

    const slotId = getSlotForDevice(device)([
        { name: 'desktop', slot: 'logo_header_dsk' },
        { name: 'mobile', slot: 'logo_header_mob' },
        { name: 'tablet', slot: 'logo_header_tab' }
    ]);

    const loadBanner = (optDiv, slotGroup) => {
        const { adUnitPath, size } = getBannerConfig({
            optDiv,
            device,
            dfpId
        });

        const bannerToLoad = [
            {
                adUnitPath,
                opt_div: optDiv,
                prebidEnabled: false,
                size,
                slotGroup,
                targeting: {
                    sitio: 'lanacion',
                    adstest: hasAdsTestParam()
                }
            }
        ];

        queueGoogletagCommand(bannerToLoad);
    };

    const HideBannersByDefault = () => {
        const script = `
            window.addEventListener('DOMContentLoaded', () => {
                const nodes = document.querySelectorAll('[id^="logo_header"]');
                Array.from(nodes).map(x => x.classList.add('hlp-none')));
            });
        `;

        return (
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: script }}
            />
        );
    };

    useEffect(() => {
        slotId && loadBanner(slotId, section);
    }, [slotId]);

    return (
        <>
            <DivBanner
                id="logo_header_dsk"
                classes="--logo"
                shouldRender={isDesktop}
                isStatic
            />
            <DivBanner
                id="logo_header_mob"
                classes="--logo"
                shouldRender={isMobile}
                isStatic
            />
            <DivBanner
                id="logo_header_tab"
                classes="--logo"
                shouldRender={isTablet}
                isStatic
            />
            <HideBannersByDefault />
        </>
    );
};

BannerLogoHeader.propTypes = {
    section: PropTypes.string.isRequired
};

export default BannerLogoHeader;
