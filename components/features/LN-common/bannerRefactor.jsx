/* eslint-disable react/require-default-props */

import React, { useRef } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';
import BannerComponent from '../../private/LN/common/bannerRefactor';
import Placeholder from '../../private/LN/common/bannerRefactor/placeholder';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import {
    slotsConfig,
    getSlotsOptions
} from '../../private/LN/common/bannerRefactor/config';
import ConfigBuilder from '../../private/LN/common/bannerRefactor/builder';

import { getSlotForDevice } from '../../private/LN/common/bannerRefactor/utils';

const Banner = props => {
    const configBuilder = useRef();
    let slotId;
    let config = null;

    const {
        siteProperties: {
            bannerConfig: { dfp_id: dfpId }
        },
        isAdmin,
        customFields: {
            group: slotGroup,
            desktop,
            mobile,
            tablet,
            sticky,
            background,
            fixed
        },
        globalContent
    } = props;

    const device = useViewportSize();
    const { label } = globalContent || { label: { mostrar_banners: false } };
    const { mostrar_banners: mostrarBanners } = label || {};
    const { text: mostrarBannersValue } = mostrarBanners || '';

    const banner = get(globalContent, 'banner');
    const termicas = get(globalContent, 'termicas.banners');

    if (!desktop && !mobile && !tablet) return null;

    const slots = [
        { name: 'tablet', slot: tablet },
        { name: 'desktop', slot: desktop },
        { name: 'mobile', slot: mobile }
    ];

    const sponsored = get(globalContent, 'owner.sponsored');
    const advertiser = get(globalContent, 'label.marca_anunciante.text');

    const hideBanners = get(
        globalContent,
        'acumuladoGeneral.hide_banner',
        'false'
    );

    if (!configBuilder.current) {
        slotId = getSlotForDevice(device)(slots);

        // if (slotId === 'NINGUNO') return null;

        if (!slotGroup || !slotId) return null;

        config = slotsConfig[slotGroup][slotId];

        if (!config) return null;

        configBuilder.current = new ConfigBuilder();
        configBuilder.current.init({
            ...config,
            device,
            slotId,
            slotGroup,
            dfpId,
            sticky,
            background,
            fixed,
            show: {
                termicas: termicas === 'true',
                collection: !(hideBanners === 'true')
            }
        });

        // Contentlab check
        if (sponsored && advertiser)
            configBuilder.current.setCustomAdUnit('ContentLab');

        // Site service dimensions check
        if (banner)
            configBuilder.current.setDimensionsFromSiteService(
                banner,
                slotGroup,
                slotId
            );
    }

    if (!dfpId) {
        if (!isAdmin) {
            return null;
        }

        return <Placeholder missDfpId />;
    }

    if (isAdmin) {
        return (
            <Placeholder
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
            />
        );
    }

    if (mostrarBannersValue !== 'No')
        return (
            <BannerComponent
                isAdmin={isAdmin}
                banner={configBuilder.current.get()}
            />
        );
    return <></>;
};

Banner.label = 'LN-Common-BannerRefactor';

Banner.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(getSlotsOptions('dsk')),
        mobile: PropTypes.oneOf(getSlotsOptions('mob')),
        tablet: PropTypes.oneOf(getSlotsOptions('tab')),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            mostrar_banners: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        termicas: PropTypes.shape({
            banners: PropTypes.string
        })
    })
};

export default Consumer(Banner);
