/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import { useAppContext } from 'fusion:context';
import findTermica from '../../../common/utils/findTermica';
import get from '../../../common/utils/get';
// import { slotsConfig } from '../bannerRefactor/config';
import { GlobalContext } from '../../../common/context/globalContext';
import bannersRules from '../../../common/banners/bannersRules';

export const suffixDevice = {
    desktop: '_dsk',
    tablet: '_tab',
    mobile: '_mob'
};

export const getBannerConfiguration = (
    globalContent,
    customFields,
    globalContentConfig
) => {
    const { label, taxonomy } = globalContent || {
        label: { mostrar_banners: false },
        taxonomy: {
            sections: [],
            tags: []
        }
    };

    const { sections, tags } = taxonomy;
    const { mostrar_banners: mostrarBanners } = label || {};
    const { text: mostrarBannersValue } = mostrarBanners || '';

    if (mostrarBannersValue === 'No') return null;

    const { slot, device, fixed, sticky, background, group: slotGroup, amp } =
        customFields || {};

    if (!slot || !slotGroup) return null;

    const slotId = `${slot}${amp ? '_amp' : suffixDevice[device]}`;
    const { siteProperties } = useAppContext();
    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});

    const termicas = findTermica('banners');

    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    const bannersSiteConfig = get(siteService, 'banners');
    const adserver = get(siteService, 'adserver', []);
    const segments = adserver.map(segment => segment.value);
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
    const config = get(
        siteProperties,
        `bannerConfig[${slotGroup}][${amp ? 'amp' : device}][${slotId}]`
    );

    const subscription =
        get(
            bannersRules,
            `[${slotGroup}][${device}][${slotId}].validateInclusion`
        ) &&
        !bannersRules[slotGroup][device][slotId].validateInclusion(
            globalContent
        );

    // const config = slotsConfig[slotGroup][slotId];
    /* config es esto de abajo para el slotId
    adhesion_dsk: {
            slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
            dimensions: [
                [728, 90],
                [920, 100]
            ],
            targeting: {
                sitio: 'lanacion',
                seccion: 'nota'
            }
        },
    */

    if (!config || !dfpId) return null;

    let bannerConfiguration = {
        ...config,
        subscription,
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
        },
        targeting: amp ? getTargetingFormat(sections)(tags) : config.targeting
    };

    // Site service banner segments check
    const [present, section] = isPrimarySectionInBannerSegments(primarySection)(
        segments
    );

    if (present) {
        bannerConfiguration = {
            ...bannerConfiguration,
            slotName: changeSegmentAdUnit(
                bannerConfiguration.slotName,
                section,
                suffixDevice[device]
            )
        };
    }

    // Contentlab check
    if (sponsored && advertiser) {
        bannerConfiguration = {
            ...bannerConfiguration,
            slotName: setCustomAdUnit(
                bannerConfiguration.slotName,
                'ContentLab'
            )
        };
    }

    // Site service dimensions check
    if (bannersSiteConfig) {
        bannerConfiguration = {
            ...bannerConfiguration,
            dimensions:
                getDimsFromSiteService(bannersSiteConfig)(slotGroup)(slotId) ||
                bannerConfiguration.dimensions
        };
    }

    return bannerConfiguration;
};

export const getDimsFromSiteService = config => slotGroup => finalSlot => {
    if (!config || !slotGroup) return null;

    const position = config.find(
        item => item.adunit === `${slotGroup}_${finalSlot}`
    );
    if (!position || !position.dimensions || position.dimensions === '')
        return null;
    const dimensions = position.dimensions.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10))
    );
};

export const isPrimarySectionInBannerSegments = primarySection => segments => {
    if (!segments || !primarySection) return [false, null];

    const base = primarySection.split('/').filter(Boolean);
    const section = base.find(x => segments.includes(x)) || base.shift();
    const included = segments.includes(section);

    return [included, section];
};

/*
export const changeSlotName = name => {
    const { slotName } = this._config;
    this._config = {
        ...this._config,
        slotName: slotName.replace(/[^/]+$/g, name)
    };
};
*/
export const setCustomAdUnit = (slotName, unit) => {
    const slotNameSections = slotName && slotName.split('/').filter(Boolean);

    const stringToReplace =
        (slotNameSections &&
            slotNameSections.length > 2 &&
            slotNameSections.slice(1, slotNameSections.length - 1).join('/')) ||
        '';

    return slotName.replace(stringToReplace, unit);
};

export const changeSegmentAdUnit = (slotName, section, deviceSuffix) => {
    const stringToReplace =
        (slotName &&
            slotName
                .split('/')
                .filter(Boolean)
                .shift()) ||
        '';

    return slotName.replace(stringToReplace, `${section}${deviceSuffix}`);
};

export const getTargetingFormat = sections => {
    return tags => {
        const targeting = {
            tags: [
                sections
                    .map(section => 'ca_'.concat(section.name).toLowerCase())
                    .concat(
                        tags.map(tag => 'te_'.concat(tag.text).toLowerCase())
                    )
                    .join('|')
            ],
            tags_nuevos: sections
                .map(section => 'ca_'.concat(section.name).toLowerCase())
                .concat(tags.map(tag => 'te_'.concat(tag.text).toLowerCase()))
        };

        return `${JSON.stringify(targeting)}`;
    };
};

export const getScriptForCabezalSticky = (header, sidebar, classCabezal) => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    const sidebar = document.querySelector(".${sidebar}");
                    const header = document.querySelector("#${header}");                    
                    const cabezal = document.querySelector('.--${classCabezal}');
                    window.addEventListener('scroll', () => {
                        const { top: topSidebar } = sidebar.getBoundingClientRect();
                        const viewPoint = topSidebar - cabezal.clientHeight - header.clientHeight;
                        if (viewPoint <= 0 && cabezal.classList.contains('--sticky')) {
                            const { top: topCabezal } = cabezal.getBoundingClientRect();
                            cabezal.classList.remove('--sticky');
                            cabezal.style.top = Math.abs(sidebar.offsetTop - cabezal.clientHeight) + 'px';
                            cabezal.style.position = 'relative';
                            cabezal.style.zIndex = '101';
                        } else if (viewPoint > 0 && !cabezal.classList.contains('--sticky')) {
                            cabezal.classList.add('--sticky');
                            cabezal.style.cssText = '';
                        }
                    });
                })
            `
            }}
        />
    );
};
