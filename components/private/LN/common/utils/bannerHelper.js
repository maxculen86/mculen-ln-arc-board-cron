/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../common/utils/get';
import { GlobalContext } from '../../../common/context/globalContext';
import bannersRules from '../../../common/banners/bannersRules';
import isWebview from '../../../common/utils/isWebview';

export const suffixDevice = {
    desktop: '_dsk',
    tablet: '_tab',
    mobile: '_mob'
};

export const BANNERS_DESKTOP = [
    'logo_header_dsk',
    'logo_header_dsk_sticky',
    'megatop_dsk',
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
    '1x1_signwall_dsk'
];

export const BANNERS_MOBILE = [
    'logo_header_mob',
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
    'caja6_mob',
    'caja7_mob',
    'caja8_mob',
    'caja9_mob',
    'caja10_mob',
    'inread_mob',
    '1x1_signwall_mob'
];

export const BANNERS_TABLET = [
    'logo_header_tab',
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
    '1x1_signwall_tab'
];

export const shouldShowBanner = (soloNoSuscriptores, globalContent) =>
    soloNoSuscriptores && get(globalContent, 'subscription') === 'S';

export const getBannerConfigFromSiteService = ({
    bannersSiteConfig,
    bannerConfiguration,
    slotGroup,
    slotId,
    section
}) => {
    if (bannersSiteConfig) {
        return {
            ...bannerConfiguration,
            bidding: setPrebidBanners(bannerConfiguration, section),
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

export const getBannerConfiguration = (
    globalContent = {},
    customFields = {},
    globalContentConfig = {},
    bannerConfig = {}
) => {
    const { group: slotGroup } = customFields;
    const { device, slotId } = bannerConfig;
    const { siteProperties } = useAppContext();

    if (!slotId || !slotGroup) return null;

    const { label, taxonomy, type } = globalContent;
    const { sections = [], tags = [] } = taxonomy || { sections: [], tags: [] };

    const getSiteService = () => {
        const gc = useContext(GlobalContext);
        return get(gc, 'state.siteService', {});
    };

    const siteService = getSiteService();

    const {
        banners: bannersSiteConfig,
        termicas = [],
        adserver = []
    } = siteService;

    const segments = adserver.map(segment => segment.value);
    const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
    const sponsored = get(globalContent, 'owner.sponsored');
    const advertiser = get(globalContent, 'label.marca_anunciante.text');
    const subSections = get(globalContent, 'taxonomy.sections', []);
    const primarySection =
        type && type === 'story'
            ? get(globalContent, 'taxonomy.primary_section._id', '')
            : get(globalContentConfig, 'query.id');

    const hideBanners = get(
        globalContent,
        'acumuladoGeneral.hide_banner',
        'false'
    );

    const config = get(
        siteProperties,
        `bannerConfig[${slotGroup}][${device}][${slotId}]`
    );

    // Se valida que se cumpla las reglas del banner
    const noValidate =
        get(
            bannersRules,
            `[${slotGroup}][${device}][${slotId}].validateInclusion`
        ) &&
        !bannersRules[slotGroup][device][slotId].validateInclusion(
            globalContent
        );

    if (
        !config ||
        !dfpId ||
        noValidate ||
        !shouldShow(hideBanners, label, termicas)
    )
        return null;

    let bannerConfiguration = {
        ...config,
        device,
        slotId,
        slotGroup,
        dfpId,
        classes: buildBannerClasses(config, customFields),
        targeting: config.targeting
    };

    // Si en adServer hay una seccion (ej: campo) para segmentar banner, se cambia el slotName
    const [present, section] = isPrimarySectionInBannerSegments(primarySection)(
        segments,
        subSections
    );

    if (present) {
        bannerConfiguration = {
            ...bannerConfiguration,
            slotName: changeSegmentAdUnit(
                section,
                device,
                bannerConfiguration.slotName
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

    // Las dimensiones del banner se traen de Site service por Section -> por Sitio -> Site properties

    return getBannerConfigFromSiteService({
        bannersSiteConfig,
        bannerConfiguration,
        slotGroup,
        slotId,
        section
    });
};

export const shouldShow = (hideBanners, label, termicas = []) => {
    // Si la termica banner esta en false o si en la seccion esta tildado hideBanner o en composer tiene no mostrar, no se muestra
    const element = termicas.find(ter => ter.key === 'banners') || {
        value: 'true'
    };
    const { mostrar_banners: mostrarBanners } = label || {};
    const { text: mostrarBannersValue } = mostrarBanners || {};

    return (
        element &&
        element.value &&
        element.value.toString() === 'true' &&
        hideBanners !== 'true' &&
        mostrarBannersValue !== 'No'
    );
};

export const buildBannerClasses = (config, customFields) => {
    const { slotName = '', withoutHide, closeButton } = config || {};
    const { background, sticky, fixed } = customFields || {};
    let classes = '';
    if (background) classes += '--bg-banner ';
    if (sticky) classes += '--sticky ';
    if (fixed) classes += '--fixed ';
    if (closeButton) classes += '--close ';
    if (!withoutHide) classes += 'none ';
    if (slotName.includes('comercial')) classes += '--comercial ';

    return classes;
};

export const getDimsFromSiteService = (config, slotName, section) => {
    if (!config || !slotName) return null;

    const position = config.find(item => item.adunit === slotName);

    if (!position || !position.dimensions || position.dimensions === '')
        return null;

    // TODO: hacerlo dinamico
    if (
        ['propiedades', 'campo', 'salud', 'autos', 'la_nacion_usa'].includes(
            section
        ) &&
        (slotName === 'nota_caja1_dsk' || slotName === 'acumulado_caja1_dsk')
    )
        position.dimensions = '120x600,160x600,300x600';

    const dimensions = position.dimensions.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10) || size)
    );
};

export const handleCanchallenaException = (subSections = []) => {
    const CANCHALLENA = 'Canchallena';
    const isCanchallena = subSections.some(
        (section = {}) => section.name === CANCHALLENA
    );

    return isCanchallena ? [true, CANCHALLENA.toLowerCase()] : false;
};

export const isPrimarySectionInBannerSegments = primarySection => (
    segments,
    subSections = []
) => {
    if (!segments || !primarySection) return [false, null];
    const canchallenaException = handleCanchallenaException(subSections);

    if (canchallenaException) {
        return canchallenaException;
    }

    const EXCEPTIONS = {
        'estados-unidos': 'la_nacion_usa',
        salud: 'bienestar',
        autos: 'movilidad'
    };

    const base = primarySection.split('/').filter(Boolean);
    const section = base.find(x => segments.includes(x)) || base.shift();
    const hardSection = EXCEPTIONS[section] || section;
    const included = segments.includes(hardSection);

    return [included, hardSection];
};

export const getSlotForDevice = device => slots =>
    slots.find(slot => slot.name === device)
        ? slots.find(slot => slot.name === device).slot || null
        : null;

export const setCustomAdUnit = (slotName, unit) => {
    const slotNameSections = slotName && slotName.split('/').filter(Boolean);

    const stringToReplace =
        (slotNameSections &&
            slotNameSections.length > 2 &&
            slotNameSections.slice(1, slotNameSections.length - 1).join('/')) ||
        '';

    return slotName.replace(stringToReplace, unit);
};

export const changeSegmentAdUnit = (section, device, slotName = '') => {
    const stringToReplace = slotName
        ? slotName
              .split('/')
              .filter(Boolean)
              .shift()
        : '';

    return slotName.replace(stringToReplace, `${section}_${device}`);
};

export const queueGoogletagCommand = bannersToLoad => {
    googletag.cmd.push(() => {
        const defineSlot = ({
            adUnitPath,
            size,
            opt_div: optDiv,
            customTargeting
        }) => {
            const slot = googletag
                .defineSlot(adUnitPath, size, optDiv)
                .addService(googletag.pubads());

            if (customTargeting && Object.keys(customTargeting).length > 0) {
                Object.keys(customTargeting).forEach(key => {
                    slot.setTargeting(key, customTargeting[key]);
                });
            }

            return slot;
        };

        const headerBiddingSlots = bannersToLoad
            .filter(e => e.prebidEnabled)
            .map(defineSlot);
        const nonHeaderBiddingSlots = bannersToLoad
            .filter(e => !e.prebidEnabled)
            .map(defineSlot);
        const hastSlotswithBids = headerBiddingSlots.length !== 0;

        const slotAPS = {
            slots: bannersToLoad.map(slot => {
                const { adUnitPath, size, opt_div: optDiv } = slot;
                return {
                    slotID: optDiv, // example: 'caja1_dsk'
                    slotName: adUnitPath, // example: '/133919216/la_nacion_desktop/nota/caja1_dsk'
                    sizes: size // [[300, 250], [300, 600]]
                };
            }),
            timeout: 2e3
        };

        if (headerBiddingSlots.length > 0) {
            apstag.fetchBids(
                {
                    ...slotAPS
                },
                function(bids) {
                    // set apstag targeting on googletag, then trigger the first GAM request in googletag's disableInitialLoad integration
                    if (pbjs.adserverRequestSent) return;
                    apstag.setDisplayBids();
                }
            );

            // function that calls the ad-server
            function callAdserver(_headerBiddingSlots, fallback = false) {
                if (pbjs.adserverCalled) return;
                fallback &&
                    console.log('🚀 ~ callAdserver ~ fallback:', fallback);
                pbjs.adserverCalled = true;
                googletag.pubads().refresh(_headerBiddingSlots);
            }

            !isWebview(navigator.userAgent) &&
                hastSlotswithBids &&
                pbjs.que.push(function() {
                    pbjs.rp.requestBids({
                        callback: callAdserver,
                        gptSlotObjects: headerBiddingSlots
                    });
                });

            // this timeout is a failsafe
            // the ad ops team can set lower thresholds that will be respected by Prebid
            // but the web-dev team can define the worst case here
            setTimeout(() => {
                callAdserver(headerBiddingSlots, true);
            }, 3500);
        }

        googletag.pubads().refresh(nonHeaderBiddingSlots);

        const bannersWithoutHide = bannersToLoad
            .filter(e => e.withoutHide)
            .map(e => e.opt_div);

        googletag
            .pubads()
            .addEventListener('slotRenderEnded', ({ slot, isEmpty }) => {
                const banner = document.getElementById(slot.getSlotElementId());
                const hiddenBanners = {
                    parallax_dsk: 'parallax_dsk',
                    parallax_mob: 'parallax_mob'
                };
                if (
                    !isEmpty &&
                    bannersWithoutHide.indexOf(slot.getSlotElementId()) === -1
                )
                    banner.parentNode.classList.remove('none');
                if (isEmpty && hiddenBanners[slot.getSlotElementId()]) {
                    banner.parentNode.classList.add('none');
                }
            });
    });
};

export const setPrebidBanners = (_bannerConfig, section) => {
    const bannerConfig = { ..._bannerConfig };
    if (['propiedades', 'campo', 'bienestar', 'movilidad'].includes(section)) {
        bannerConfig.bidding = { prebid: { enabled: true } };
    }
    return (
        bannerConfig.bidding || {
            prebid: {
                enabled: false
            }
        }
    );
};
