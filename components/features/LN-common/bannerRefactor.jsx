/* eslint-disable react/require-default-props */

import React, { useRef, useContext } from 'react';
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
import { GlobalContext } from '../../private/common/context/globalContext';
import WithSkeletonBannerWithoutHide from '../../private/LN/common/bannerRefactor/withSkeletonBannerWithoutHide';

import {
    getSlotForDevice,
    isPrimarySectionInBannerSegments
} from '../../private/LN/common/bannerRefactor/utils';
import findTermica from '../../private/common/utils/findTermica';

const Banner = props => {
    const configBuilder = useRef();
    let slotId;
    let config = null;

    const {
        siteProperties,
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
        globalContent,
        globalContentConfig,
        outputType
    } = props;

    const device = useViewportSize();
    const { label } = globalContent || { label: { mostrar_banners: false } };
    const { mostrar_banners: mostrarBanners } = label || {};
    const { text: mostrarBannersValue } = mostrarBanners || '';

    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});

    const termicas = findTermica('banners');

    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    const bannersSiteConfig = get(siteService, 'banners');
    const adserver = get(siteService, 'adserver', []);
    const segments = adserver.map(segment => segment.value);

    if (!desktop && !mobile && !tablet) return null;

    const slots = [
        { name: 'tablet', slot: tablet },
        { name: 'desktop', slot: desktop },
        { name: 'mobile', slot: mobile }
    ];

    const type = get(globalContent, 'type');
    const sponsored = get(globalContent, 'owner.sponsored');
    const advertiser = get(globalContent, 'label.marca_anunciante.text');
    const primarySection =
        type && type === 'story'
            ? get(globalContent, 'taxonomy.primary_section._id')
            : get(globalContentConfig, 'query.id');

    const hideBanners = get(
        globalContent,
        'acumuladoGeneral.hide_banner',
        'false'
    );

    if (!configBuilder.current) {
        slotId = getSlotForDevice(device)(slots);
        if (typeof window === 'undefined' && outputType !== 'amp')
            return <WithSkeletonBannerWithoutHide slotId={slotId} />;

        // if (slotId === 'NINGUNO') return null;

        if (!slotGroup || !slotId) return null;

        config = slotsConfig[slotGroup][slotId];

        if (!config) return null;

        // TODO: Mover esta lógica a un utilitario ?)
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
                termicas,
                collection: !(hideBanners === 'true')
            }
        });

        // Site service banner segments check
        const [present, section] = isPrimarySectionInBannerSegments(
            primarySection
        )(segments);

        if (present) {
            configBuilder.current.segmentAdUnit(section, device);
        }

        // Contentlab check
        if (sponsored && advertiser)
            configBuilder.current.setCustomAdUnit('ContentLab');

        // Site service dimensions check
        if (bannersSiteConfig)
            configBuilder.current.setDimensionsFromSiteService(
                bannersSiteConfig,
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

    if (isAdmin && config) {
        return (
            <Placeholder
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
            />
        );
    }

    return mostrarBannersValue !== 'No' ? (
        <BannerComponent
            isAdmin={isAdmin}
            config={configBuilder.current.get()}
        />
    ) : (
        <></>
    );
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
    }).isRequired,
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

Banner.lazy = ['default', 'amp'];

export default Consumer(Banner);
