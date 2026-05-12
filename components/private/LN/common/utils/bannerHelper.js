/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
import { useContext } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../common/utils/get';
import { GlobalContext } from '../../../common/context/globalContext';
import bannersRules from '../../../common/banners/bannersRules';
import isWebview from '../../../common/utils/isWebview';
import getCustomTargeting from '../../../common/banners/helpers/getCustomTargeting';
import hideParentNode from '../../../../features/private-global/common/utils/hideParentNode';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../common/auth/helper/loginHelper';
import handleCookie from './handleCookie';

export const suffixDevice = {
    desktop: '_dsk',
    tablet: '_tab',
    mobile: '_mob'
};

export const COMMERCIAL_FREQUENCY_CAP_MINUTES = 30;
export const COMMERCIAL_FREQUENCY_CAP_COOKIE_PREFIX = 'ln_commercial_fc';

const COMMERCIAL_FREQUENCY_CAP_SLOT_GROUPS = ['home', 'nota', 'acumulado'];
const COMMERCIAL_SLOT_REGEX = /^comercial_(dsk|mob|tab)$/i;

const getValidCommercialFrequencyCapSlotGroup = slotGroup => {
    const normalizedSlotGroup = slotGroup?.toString().toLowerCase();

    return COMMERCIAL_FREQUENCY_CAP_SLOT_GROUPS.includes(normalizedSlotGroup)
        ? normalizedSlotGroup
        : null;
};

const shouldApplyCommercialFrequencyCap = subscription =>
    typeof subscription === 'boolean'
        ? subscription
        : isSubscribed(SUBSCRIBED_HELPER.LN);

export const getCommercialFrequencyCapSlotGroup = ({
    adUnitPath = '',
    opt_div: optDiv = '',
    slotGroup = ''
} = {}) => {
    const adUnitSegments = adUnitPath.toString().split('/').filter(Boolean);
    const adUnitSlot = adUnitSegments[adUnitSegments.length - 1] || '';
    const isCommercialSlot =
        COMMERCIAL_SLOT_REGEX.test(optDiv) ||
        COMMERCIAL_SLOT_REGEX.test(adUnitSlot);

    if (!isCommercialSlot) return null;

    const validSlotGroup = getValidCommercialFrequencyCapSlotGroup(slotGroup);
    if (validSlotGroup) return validSlotGroup;

    return (
        adUnitSegments
            .map(segment => getValidCommercialFrequencyCapSlotGroup(segment))
            .find(Boolean) || null
    );
};

export const getCommercialFrequencyCapCookieName = slotGroup => {
    const validSlotGroup = getValidCommercialFrequencyCapSlotGroup(slotGroup);

    return validSlotGroup
        ? `${COMMERCIAL_FREQUENCY_CAP_COOKIE_PREFIX}_${validSlotGroup}`
        : null;
};

export const hasCommercialFrequencyCapCookie = banner => {
    const slotGroup = getCommercialFrequencyCapSlotGroup(banner);
    const cookieName = getCommercialFrequencyCapCookieName(slotGroup);

    if (!cookieName) return false;

    const { getCookie } = handleCookie();
    return Boolean(getCookie(cookieName));
};

export const setCommercialFrequencyCapCookie = banner => {
    const slotGroup = getCommercialFrequencyCapSlotGroup(banner);
    const cookieName = getCommercialFrequencyCapCookieName(slotGroup);

    if (!cookieName) return false;

    const { setCookie } = handleCookie();
    return setCookie(cookieName, 'true', COMMERCIAL_FREQUENCY_CAP_MINUTES);
};

export const filterCommercialBannersByFrequencyCap = (
    bannersToLoad = [],
    subscription = undefined
) => {
    if (!shouldApplyCommercialFrequencyCap(subscription)) return bannersToLoad;

    return bannersToLoad.filter(
        banner => !hasCommercialFrequencyCapCookie(banner)
    );
};

export const getCommercialFrequencyCapBannersBySlot = (
    bannersToLoad = [],
    subscription = undefined
) => {
    if (!shouldApplyCommercialFrequencyCap(subscription)) return {};

    return bannersToLoad.reduce((acc, banner) => {
        if (getCommercialFrequencyCapSlotGroup(banner)) {
            acc[banner.opt_div] = banner;
        }

        return acc;
    }, {});
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
    '1x1_signwall_dsk',
    'cajasuscriptores_dsk',
    'quesale_dsk'
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
    '1x1_signwall_mob',
    'cajasuscriptores_mob',
    'quesale_mob'
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
    '1x1_signwall_tab',
    'cajasuscriptores_tab',
    'quesale_tab'
];

export const shouldHideBannerForSubscriberOnlyContent = (
    soloNoSuscriptores,
    globalContent
) => soloNoSuscriptores && get(globalContent, 'subscription') === 'S';

export const getBannerSectionDimensions = (section, slotName) => {
    if (!section || !slotName) return null;

    const defaultSlotDimensions = {
        nota_caja1_dsk: '300x250,300x600,120x600,160x600,300x450',
        nota_caja4_dsk: '300x250,300x600,300x450',
        nota_caja5_dsk: '300x250,300x600,120x600,160x600,300x450',
        acumulado_caja1_dsk: '300x250,300x600'
    };

    const sectionSlotDimensions = {
        propiedades: defaultSlotDimensions,
        campo: defaultSlotDimensions,
        futuria: defaultSlotDimensions,
        bienestar: defaultSlotDimensions,
        movilidad: defaultSlotDimensions,
        'que-sale': defaultSlotDimensions,
        juegos: defaultSlotDimensions,
        horoscopo: defaultSlotDimensions
    };

    return sectionSlotDimensions[section]?.[slotName];
};

export const parseDimensionsBanners = dimensionsString => {
    if (!dimensionsString || typeof dimensionsString !== 'string') {
        return null;
    }

    const dimensions = dimensionsString.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10) || size)
    );
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

export const getDimsFromSiteService = (config, slotName, section) => {
    const dynamicSlotDimensions = {
        la_nacion_usa: {
            nota_caja1_dsk: ['120x600', '160x600', '300x600'],
            acumulado_caja1_dsk: ['120x600', '160x600', '300x600']
        }
    };

    if (!config || !slotName) return null;

    const specificSectionDimensions = getBannerSectionDimensions(
        section,
        slotName
    );
    if (specificSectionDimensions) {
        return parseDimensionsBanners(specificSectionDimensions);
    }

    const position = config.find(item => item.adunit === slotName);

    if (!position || !position.dimensions || position.dimensions === '')
        return null;

    if (dynamicSlotDimensions[section]?.[slotName]) {
        position.dimensions =
            dynamicSlotDimensions[section][slotName].join(',');
    }

    return parseDimensionsBanners(position.dimensions);
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

export const getBannerConfigFromSiteService = ({
    bannersSiteConfig,
    bannerConfiguration,
    slotGroup,
    slotId,
    section
}) => {
    const slotName = `${slotGroup}_${slotId}`;

    const defaultDimensions = getBannerSectionDimensions(section, slotName)
        ? parseDimensionsBanners(getBannerSectionDimensions(section, slotName))
        : bannerConfiguration.dimensions;

    if (bannersSiteConfig) {
        return {
            ...bannerConfiguration,
            bidding: setPrebidBanners(bannerConfiguration, section),
            dimensions:
                getDimsFromSiteService(bannersSiteConfig, slotName, section) ||
                defaultDimensions
        };
    }

    return { ...bannerConfiguration, dimensions: defaultDimensions };
};

export const handleCanchallenaException = (subSections = []) => {
    const CANCHALLENA = 'Canchallena';
    const isCanchallena = subSections.some(
        (section = {}) => section.name === CANCHALLENA
    );

    return isCanchallena ? [true, CANCHALLENA.toLowerCase()] : false;
};

export const handleUnitedStatesLabelException = () => {
    const { globalContent } = useAppContext();
    const UNITEDSTATES = 'la_nacion_usa';
    const isUnitedStates =
        get(globalContent, 'label.eje_subeje.text', '') === 'Estados-Unidos';

    return isUnitedStates ? [true, UNITEDSTATES] : false;
};

export const isPrimarySectionInBannerSegments =
    tags =>
    primarySection =>
    (segments, subSections = []) => {
        if (!segments || !primarySection) return [false, null];

        const tagsExceptions = ['que-sale', 'futuria'];
        const replaceTagAdserver = tags.find(tag =>
            tagsExceptions.includes(tag.slug)
        );

        let adjustedPrimarySection = primarySection;

        if (replaceTagAdserver) {
            adjustedPrimarySection = replaceTagAdserver.slug;
        }

        const canchallenaException = handleCanchallenaException(subSections);

        if (canchallenaException) {
            return canchallenaException;
        }

        const unitedStatesFromLabel = handleUnitedStatesLabelException();

        if (unitedStatesFromLabel) {
            return unitedStatesFromLabel;
        }

        const EXCEPTIONS = {
            'estados-unidos': 'la_nacion_usa',
            salud: 'bienestar',
            autos: 'movilidad',
            'que-sale': 'que-sale',
            IA: 'futuria',
            juegos: 'juegos',
            horoscopo: 'bienestar'
        };

        const subSectionExceptions = {
            futuria: true
        };

        const base = adjustedPrimarySection.split('/').filter(Boolean);
        const section = base.find(x => segments.includes(x)) || base.shift();
        const hardSection = EXCEPTIONS[section] || section;
        const included =
            subSectionExceptions[hardSection] || segments.includes(hardSection);

        return [included, hardSection];
    };

export const changeSegmentAdUnit = (section, device, slotName = '') => {
    const stringToReplace = slotName
        ? slotName.split('/').filter(Boolean).shift()
        : '';

    return slotName.replace(stringToReplace, `${section}_${device}`);
};

export const setCustomAdUnit = (slotName, unit) => {
    const slotNameSections = slotName && slotName.split('/').filter(Boolean);

    const stringToReplace =
        (slotNameSections &&
            slotNameSections.length > 2 &&
            slotNameSections.slice(1, slotNameSections.length - 1).join('/')) ||
        '';

    return slotName?.replace(stringToReplace, unit);
};

export const getBannerConfiguration = (
    globalContent = {},
    customFields = {},
    globalContentConfig = {},
    bannerConfig = {}
) => {
    const { group: slotGroup, theme = 'light' } = customFields;
    const { device, slotId } = bannerConfig;
    const { siteProperties } = useAppContext();

    if (!slotId || !slotGroup) return null;

    const { label, type } = globalContent;

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
    const tags = get(globalContent, 'taxonomy.tags', []);

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
        targeting: config.targeting,
        theme
    };

    // Si en adServer hay una seccion (ej: campo) para segmentar banner, se cambia el slotName
    const [present, section] = isPrimarySectionInBannerSegments(tags)(
        primarySection
    )(segments, subSections);

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

export const getSlotForDevice = device => slots =>
    slots.find(slot => slot.name === device)
        ? slots.find(slot => slot.name === device).slot || null
        : null;

export const hideBanner = (
    containerBannersToHide = [],
    bannerRef = {},
    isNodeHtml = false
) => {
    googletag
        .pubads()
        .addEventListener('slotRenderEnded', ({ slot, isEmpty }) => {
            const slotBannerId = slot.getSlotElementId();
            const banner = document.getElementById(slotBannerId);
            if (
                containerBannersToHide.includes(slotBannerId) &&
                isEmpty &&
                banner
            ) {
                hideParentNode(bannerRef, 'LI', isNodeHtml);
            }
        });
};

export const defineSlot = ({
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

export const displayUnicBanner = ({
    slotId,
    adUnitPath,
    size,
    customTargeting
} = {}) => {
    googletag.cmd.push(() => {
        const bannerExists = googletag
            .pubads()
            .getSlots()
            .find(slot => slot.getSlotElementId() === slotId);

        if (bannerExists) {
            googletag.pubads().refresh([bannerExists]);
        } else {
            const slotElement = defineSlot({
                adUnitPath,
                size,
                opt_div: slotId,
                customTargeting
            });

            googletag.display(slotId);
            googletag.pubads().refresh([slotElement]);
        }
        // TODO: Unificar la funcion de ocultar o mostrar banner para reutilizar en el resto de banners
        googletag
            .pubads()
            .addEventListener('slotRenderEnded', ({ slot, isEmpty }) => {
                const banner = document.getElementById(slot.getSlotElementId());

                const isBannerVisible =
                    !isEmpty && banner && banner.getAttribute('id') === slotId;

                if (isBannerVisible) {
                    banner.parentNode.classList.remove('none');
                }
            });
    });
};

export const queueGoogletagCommand = (
    bannersToLoad = [],
    { subscription } = {}
) => {
    const bannersToRequest = filterCommercialBannersByFrequencyCap(
        bannersToLoad,
        subscription
    );

    if (bannersToRequest.length === 0) return;

    const commercialFrequencyCapBanners =
        getCommercialFrequencyCapBannersBySlot(bannersToRequest, subscription);

    function callAdserver(_headerBiddingSlots, fallback = false) {
        if (pbjs.adserverCalled) return;
        /* eslint-disable no-console */
        if (fallback) {
            console.log('🚀 ~ callAdserver ~ fallback:', fallback);
        }
        /* eslint-enable no-console */
        pbjs.adserverCalled = true;
        googletag.pubads().refresh(_headerBiddingSlots);
    }

    googletag.cmd.push(() => {
        const headerBiddingSlots = bannersToRequest
            .filter(e => e.prebidEnabled)
            .map(defineSlot);
        const nonHeaderBiddingSlots = bannersToRequest
            .filter(e => !e.prebidEnabled)
            .map(defineSlot);
        const hastSlotswithBids = headerBiddingSlots.length !== 0;

        const slotAPS = {
            slots: bannersToRequest.map(slot => {
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
                () => {
                    // set apstag targeting on googletag, then trigger the first GAM request in googletag's disableInitialLoad integration
                    if (pbjs.adserverRequestSent) return;
                    apstag.setDisplayBids();
                }
            );

            // function that calls the ad-server

            if (!isWebview(navigator.userAgent) && hastSlotswithBids) {
                pbjs.que.push(() => {
                    pbjs.rp.requestBids({
                        callback: callAdserver,
                        gptSlotObjects: headerBiddingSlots
                    });
                });
            }

            // this timeout is a failsafe
            // the ad ops team can set lower thresholds that will be respected by Prebid
            // but the web-dev team can define the worst case here
            setTimeout(() => {
                callAdserver(headerBiddingSlots, true);
            }, 3500);
        }

        googletag.pubads().refresh(nonHeaderBiddingSlots);

        const bannersWithoutHide = bannersToRequest
            .filter(e => e.withoutHide)
            .map(e => e.opt_div);

        googletag
            .pubads()
            .addEventListener('slotRenderEnded', ({ slot, isEmpty }) => {
                const slotId = slot.getSlotElementId();
                const banner = document.getElementById(slotId);

                const isBannerVisible =
                    !isEmpty && !bannersWithoutHide.includes(slotId);

                if (isBannerVisible) {
                    setCommercialFrequencyCapCookie(
                        commercialFrequencyCapBanners[slotId]
                    );
                    banner.parentNode.classList.remove('none');
                }
            });
    });
};

export const getUnicBannerInDom = (bannerId, device) => {
    const banner = document.querySelector(
        `div[data-device="${device}"][id="${bannerId}"]`
    );

    if (banner) {
        return {
            adUnitPath: banner.dataset.adUnitPath,
            size: JSON.parse(banner.dataset.size),
            opt_div: banner.id,
            sizemap: JSON.parse(banner.dataset.sizemap),
            prebidEnabled: banner.dataset.prebidEnabled === 'true',
            targeting: JSON.parse(banner.dataset.targeting),
            slotGroup: banner.dataset.slotGroup,
            hideForSubscriptor: banner.dataset.subscription === 'true',
            withoutHide: banner.dataset.withoutHide === 'true',
            customTargeting: getCustomTargeting({ bannerId })
        };
    }

    return null;
};
