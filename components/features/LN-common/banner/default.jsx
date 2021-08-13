/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';

import { slotsConfig } from '../../../private/LN/common/bannerRefactor/config';
import {
    getBannerConfiguration,
    getScriptForCabezalSticky
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';

const BannerSSR = props => {
    // const configBuilder = useRef();
    // let slotId;
    // let config = null;

    const {
        id: idFeature,
        isAdmin,
        customFields,
        globalContent,
        globalContentConfig
    } = props;

    const { amp, slot, device, group, sticky } = customFields;

    if (amp) return <></>;

    /*
        {
            group: slotGroup,
            device,
            slotId,
            // desktop,
            // mobile,
            // tablet,
            sticky,
            background,
            fixed
        }
    */
    const bannerConfiguration = getBannerConfiguration(
        globalContent,
        customFields,
        globalContentConfig
    );

    if (!bannerConfiguration)
        return (
            <Placeholder
                error="sin configuracion"
                slotName={`${group} => ${device} => ${slot}`}
            />
        );

    // const device = useViewportSize();
    // const { label } = globalContent || { label: { mostrar_banners: false } };

    // const { mostrar_banners: mostrarBanners } = label || {};
    // const { text: mostrarBannersValue } = mostrarBanners || '';

    // const gc = useContext(GlobalContext);
    // const siteService = get(gc, 'state.siteService', {});

    // const termicas = findTermica('banners');

    // const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    // const bannersSiteConfig = get(siteService, 'banners');
    // const adserver = get(siteService, 'adserver', []);
    // const segments = adserver.map(segment => segment.value);

    // // if (!desktop && !mobile && !tablet) return null;

    // // const slots = [
    // //     { name: 'tablet', slot: tablet },
    // //     { name: 'desktop', slot: desktop },
    // //     { name: 'mobile', slot: mobile }
    // // ];

    // const type = get(globalContent, 'type');
    // const sponsored = get(globalContent, 'owner.sponsored');
    // const advertiser = get(globalContent, 'label.marca_anunciante.text');
    // const primarySection =
    //     type && type === 'story'
    //         ? get(globalContent, 'taxonomy.primary_section._id')
    //         : get(globalContentConfig, 'query.id');

    // const hideBanners = get(
    //     globalContent,
    //     'acumuladoGeneral.hide_banner',
    //     'false'
    // );

    // // if (!configBuilder.current) {
    // // slotId = getSlotForDevice(device)(slots);
    // // if (typeof window === 'undefined' && outputType !== 'amp')
    // //     return <WithSkeletonBannerWithoutHide slotId={slotId} />;

    // // if (slotId === 'NINGUNO') return null;

    // // if (!slotGroup || !slotId) return null;

    // // slotName => la_nacion_desktop/Nota/adhesion_dsk

    // const config = slotsConfig[slotGroup][slotId];
    // /* config es esto de abajo para el slotId
    // adhesion_dsk: {
    //         slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
    //         dimensions: [
    //             [728, 90],
    //             [920, 100]
    //         ],
    //         targeting: {
    //             sitio: 'lanacion',
    //             seccion: 'nota'
    //         }
    //     },
    // */

    // if (!config) return null;

    // let bannerConfiguracion = {
    //     ...config,
    //     device,
    //     slotId,
    //     slotGroup,
    //     dfpId,
    //     sticky,
    //     background,
    //     fixed,
    //     show: {
    //         termicas,
    //         collection: !(hideBanners === 'true')
    //     }
    // };
    // // configBuilder.current = new ConfigBuilder();
    // // configBuilder.current.init({
    // //     ...config,
    // //     device,
    // //     slotId,
    // //     slotGroup,
    // //     dfpId,
    // //     sticky,
    // //     background,
    // //     fixed,
    // //     show: {
    // //         termicas,
    // //         collection: !(hideBanners === 'true')
    // //     }
    // // });

    // // Site service banner segments check
    // const [present, section] = isPrimarySectionInBannerSegments(primarySection)(
    //     segments
    // );

    // if (present) {
    //     bannerConfiguracion = {
    //         ...bannerConfiguracion,
    //         slotName: changeSegmentAdUnit(
    //             bannerConfiguracion.slotName,
    //             section,
    //             suffixDevice[device]
    //         )
    //     };
    // }

    // // Contentlab check
    // if (sponsored && advertiser) {
    //     bannerConfiguracion = {
    //         ...bannerConfiguracion,
    //         slotName: setCustomAdUnit(
    //             bannerConfiguracion.slotName,
    //             'ContentLab'
    //         )
    //     };
    // }

    // // Site service dimensions check
    // if (bannersSiteConfig) {
    //     bannerConfiguracion = {
    //         ...bannerConfiguracion,
    //         dimensions:
    //             getDimsFromSiteService(bannersSiteConfig)(slotGroup)(slotId) ||
    //             bannerConfiguracion.dimensions
    //     };
    // }

    // if (!dfpId) {
    //     if (!isAdmin) {
    //         return null;
    //     }

    //     return <Placeholder missDfpId />;
    // }

    if (isAdmin && bannerConfiguration) {
        return (
            <Placeholder
                slotName={bannerConfiguration.slotName}
                dimensions={bannerConfiguration.dimensions}
                targeting={bannerConfiguration.targeting}
            />
        );
    }

    // if (mostrarBannersValue === 'No') return <></>;

    if (
        Object.values(bannerConfiguration.show).some(
            element => element === false
        )
    )
        return <></>;

    // if (
    //     bannerConfiguration.validateInclusion &&
    //     !bannerConfiguration.validateInclusion(globalContent)
    // )
    //     return <></>;

    /*
            adUnitPath: `/${dfpId}/${slotName}`,
            size: flatArray(dimensions),
            opt_div: id,
            sizemap,
            prebidEnabled,
            targeting,
            slotGroup,
            subscription,
            withoutHide
        */
    // const { top } = point2.getBoundingClientRect();
    // // heigt del header
    // const { height } = point1.getBoundingClientRect();

    // return top - component.clientHeight - gap - height <= 0;

    // const { top, height: componentHeight } = element.getBoundingClientRect();
    // const { height: point1Height } = point1.getBoundingClientRect();

    // element.style.top = `${Math.abs(
    //     top - componentHeight + point1Height + gap
    // )}px`;
    // element.style.position = 'relative';
    // element.style.zIndex = 101;
    return (
        <Static id={idFeature}>
            <DivBannerSSR bannerConfiguration={bannerConfiguration} />
            {sticky &&
                slot.includes('cabezal') &&
                getScriptForCabezalSticky(
                    'header',
                    'lay-sidebar',
                    bannerConfiguration.slotId
                )}
        </Static>
    );
};

/*
// <BannerComponent
        //     isAdmin={isAdmin}
        //     // config={configBuilder.current.get()}
        //     bannerConfiguracion={bannerConfiguracion}
        //     outputType={outputType}
        // />

*/

BannerSSR.label = 'LN-Common-Banner';

BannerSSR.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
        slot: PropTypes.oneOf([
            'comercial',
            'adhesion',
            'megatop',
            '1x1',
            'cabezal',
            'caja1',
            'caja2',
            'caja3',
            'caja4',
            'caja5',
            'inread',
            'middle_1',
            'middle_2',
            'middle_3',
            'middle_teads',
            'sticky1',
            'sticky2'
        ]),
        // desktop: PropTypes.oneOf(getSlotsOptions('dsk')),
        // mobile: PropTypes.oneOf(getSlotsOptions('mob')),
        // tablet: PropTypes.oneOf(getSlotsOptions('tab')),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        amp: PropTypes.bool
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool,
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            mostrar_banners: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        termicas: PropTypes.shape({
            banners: PropTypes.string
        })
    }),
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

export default Consumer(BannerSSR);
