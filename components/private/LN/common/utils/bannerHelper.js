/* eslint-disable no-undef */
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

export const BANNERS_DESKTOP = [
    'comercial_dsk',
    'adhesion_dsk',
    '1x1_dsk',
    'cabezal_dsk',
    'caja1_dsk',
    'caja2_dsk',
    'caja3_dsk',
    'caja4_dsk',
    'caja5_dsk',
    'inread_dsk',
    'middle_1_dsk',
    'middle_2_dsk',
    'middle_3_dsk',
    'middle_teads_dsk',
    'caja1_amp',
    'caja2_amp',
    'caja3_amp'
];

export const BANNERS_MOBILE = [
    'comercial_mob',
    'adhesion_mob',
    '1x1_mob',
    'sticky1_mob',
    'sticky2_mob',
    'caja1_mob',
    'caja2_mob',
    'caja3_mob',
    'caja4_mob',
    'caja5_mob',
    'inread_mob',
    'caja1_amp',
    'caja2_amp',
    'caja3_amp'
];

export const BANNERS_TABLET = [
    'cabezal_tab',
    '1x1_tab',
    'adhesion_tab',
    'caja1_tab',
    'caja2_tab',
    'caja3_tab',
    'inread_tab',
    'middle_1_tab',
    'middle_2_tab',
    'middle_teads_tab',
    'caja1_amp',
    'caja2_amp',
    'caja3_amp'
];

export const isForAmp = (desktop = '', mobile = '', tablet = '') => {
    return desktop
        .concat(mobile)
        .concat(tablet)
        .includes('_amp');
};

export const getBannerConfiguration = (
    globalContent,
    customFields,
    globalContentConfig,
    bannerConfig = {}
) => {
    const { label, taxonomy, type } = globalContent || {
        label: { mostrar_banners: false },
        taxonomy: {
            sections: [],
            tags: []
        }
    };

    const { sections, tags } = taxonomy || {
        sections: [],
        tags: []
    };
    const { mostrar_banners: mostrarBanners } = label || {};
    const { text: mostrarBannersValue } = mostrarBanners || '';

    if (mostrarBannersValue === 'No') return null;

    const { fixed, sticky, background, group: slotGroup } = customFields || {};
    const { device, slotId } = bannerConfig;

    if (!slotId || !slotGroup) return null;

    // const slotId = `${slot}${amp ? '_amp' : suffixDevice[device]}`;
    const { siteProperties } = useAppContext();
    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});

    const termicas = findTermica('banners');

    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    const bannersSiteConfig = get(siteService, 'banners');
    const adserver = get(siteService, 'adserver', []);
    const segments = adserver.map(segment => segment.value);
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
        `bannerConfig[${slotGroup}][${
            slotId.includes('_amp') ? 'amp' : device
        }][${slotId}]`
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

    if (!config || !dfpId || subscription) return null;

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
        targeting: slotId.includes('_amp')
            ? getTargetingFormat(sections)(tags)
            : config.targeting
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
                getDimsFromSiteService(
                    bannersSiteConfig,
                    `${slotGroup}_${slotId}`,
                    section
                ) || bannerConfiguration.dimensions
        };
    }
    return bannerConfiguration;
};

export const getDimsFromSiteService = (config, slotName, section) => {
    if (!config || !slotName) return null;

    const position = config.find(item => item.adunit === slotName);

    // TODO: hacerlo dinamico
    if (
        ['propiedades', 'campo'].includes(section) &&
        (slotName === 'nota_caja1_dsk' || slotName === 'acumulado_caja1_dsk')
    )
        position.dimensions = '120x600,160x600,300x600';

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

export const changeSegmentAdUnit = (slotName = '', section, deviceSuffix) => {
    const stringToReplace = slotName
        ? slotName
              .split('/')
              .filter(Boolean)
              .shift()
        : '';

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

export const naveggSetTargeting = () => {
    (function setTarge(w) {
        try {
            let name;
            const persona = JSON.parse(
                window.localStorage.getItem('nvgpersona18894')
            );
            for (const col in persona) {
                if ({}.hasOwnProperty.call(persona, col)) {
                    name = `nvg_${col}`;
                    name = name.substring(0, 10);
                    if (typeof googletag == 'object')
                        googletag.pubads().setTargeting(name, persona[col]);
                    // if (typeof GA_googleAddAttr == "function")
                    //   GA_googleAddAttr(name, persona[col]);
                }
            }
        } catch (e) {
            console.error(e);
        }
    })(window);
};

export const queueGoogletagCommand = bannersToLoad => {
    googletag.cmd.push(() => {
        const defineSlot = ({ adUnitPath, size, opt_div: optDiv }) =>
            googletag
                .defineSlot(adUnitPath, size, optDiv)
                .addService(googletag.pubads());

        const headerBiddingSlots = bannersToLoad
            .filter(e => e.prebidEnabled)
            .map(defineSlot);
        const nonHeaderBiddingSlots = bannersToLoad
            .filter(e => !e.prebidEnabled)
            .map(defineSlot);

        // initialize
        googletag.pubads().enableSingleRequest();
        googletag.pubads().enableAsyncRendering();
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();

        googletag.pubads().refresh(nonHeaderBiddingSlots);

        naveggSetTargeting();

        // the callback function
        // will be called twice:
        //	once by Prebid when the auction's done
        //	once by the failsafe timeout
        // so a boolean is used to make sure ads are refreshed only once
        pbjs.adserverRequestSent = false;
        const sendAdServerRequest = _headerBiddingSlots => {
            if (_headerBiddingSlots.length === 0) return;
            googletag.cmd.push(() => {
                // don't run again if already ran
                if (pbjs.adserverRequestSent) return;
                pbjs.adserverRequestSent = true;
                googletag.pubads().refresh(_headerBiddingSlots);
            });
        };

        pbjs.que.push(function() {
            pbjs.rp.requestBids({
                callback: sendAdServerRequest,
                gptSlotObjects: headerBiddingSlots
            });
        });

        // this timeout is a failsafe
        // the ad ops team can set lower thresholds that will be respected by Prebid
        // but the web-dev team can define the worst case here
        setTimeout(() => {
            sendAdServerRequest(headerBiddingSlots);
        }, 3500);

        const bannersWithoutHide = bannersToLoad
            .filter(e => e.withoutHide)
            .map(e => e.opt_div);

        googletag
            .pubads()
            .addEventListener('slotRenderEnded', ({ slot, isEmpty }) => {
                if (
                    !isEmpty &&
                    bannersWithoutHide.indexOf(slot.getSlotElementId()) === -1
                )
                    document
                        .getElementById(slot.getSlotElementId())
                        .parentNode.classList.remove('hlp-none');
            });
    });
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
