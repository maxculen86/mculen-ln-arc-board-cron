/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import { slotsConfig } from '../../LN/common/bannerRefactor/config';
import { getSlotForDevice } from '../../LN/common/bannerRefactor/utils';
import ConfigBuilder from '../../LN/common/bannerRefactor/builder';
import flatArray from '../utils/flatArray';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';

let googleCmdPushed = false;
let bannersWithoutHide = [];

function naveggSetTargeting() {
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
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const queueGoogletagCommand = bannersToLoad => {
    googletag.cmd.push(() => {
        const defineSlot = ({ adUnitPath, size, opt_div: optDiv }) =>
            googletag
                .defineSlot(adUnitPath, size, optDiv)
                .addService(googletag.pubads());

        bannersWithoutHide = bannersToLoad
            .filter(e => e.withoutHide)
            .map(e => e.opt_div);

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

        pbjs.rp.requestBids({
            callback: sendAdServerRequest,
            gptSlotObjects: headerBiddingSlots
        });

        // this timeout is a failsafe
        // the ad ops team can set lower thresholds that will be respected by Prebid
        // but the web-dev team can define the worst case here
        setTimeout(() => {
            sendAdServerRequest(headerBiddingSlots);
        }, 3500);

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

const LoadBanners = ({ blocksBanners }) => {
    const [bannersLoaded, setBannersLoaded] = useState(() => false);
    const { state } = useContext(GlobalContext);
    const {
        renderables = [],
        outputType,
        isAdmin,
        siteProperties
    } = useAppContext();
    const [suffix, setSuffix] = useState();
    const device = useViewportSize();
    const suffixDevice = {
        desktop: '_dsk',
        tablet: '_tab',
        mobile: '_mob'
    };
    const bannersConfigured = renderables.filter(e =>
        ['LN-common/bannerRefactor', 'LN-nota/cuerpo'].includes(e.type)
    );

    useEffect(() => {
        if (hasAdsTestParam() === 'true') {
            googletag.cmd.push(() => {
                googletag.pubads().setTargeting('adstest', ['true']);
            });
        }
    }, []);

    useEffect(() => {
        if (outputType && device)
            setSuffix(() =>
                outputType === 'amp' ? '_amp' : suffixDevice[device]
            );
    }, [device, outputType, suffixDevice]);

    useEffect(() => {
        try {
            if (suffix && device && blocksBanners.length === 0 && !isAdmin) {
                const bannersInBody = [];
                const {
                    bannersConfig: {
                        bannersToLoad = [],
                        shallBeExcluded = [],
                        bannersInGrillaNotas = []
                    }
                } = state || { bannersConfig: {} };
                let bannersWithSettings = bannersConfigured
                    .filter(e => {
                        const bannerInPB = get(e, 'props.customFields', {})[
                            device
                        ];
                        const slotGroup =
                            bannersToLoad &&
                            bannersToLoad[0] &&
                            bannersToLoad[0].slotGroup;

                        const thisIsExclude =
                            slotGroup === 'nota'
                                ? shallBeExcluded.includes(bannerInPB || '')
                                : false;

                        if (
                            e.type === 'LN-nota/cuerpo' &&
                            slotGroup === 'nota'
                        ) {
                            const bodyBanners = get(
                                e,
                                'props.customFields',
                                {}
                            );

                            Object.keys(bodyBanners)
                                .filter(value => value.search(device) === 0)
                                .forEach(value => {
                                    const bannerSetInBody =
                                        bodyBanners[value] || '';

                                    return (
                                        !bannersInBody.includes(
                                            bannerSetInBody
                                        ) &&
                                        bannerSetInBody.search(suffix) > -1 &&
                                        Object.keys(bannersToLoad).find(
                                            i =>
                                                bannersToLoad[i].opt_div ===
                                                bannerSetInBody
                                        ) &&
                                        bannersInBody.push(bannerSetInBody)
                                    );
                                });
                        }

                        return (
                            bannerInPB &&
                            bannerInPB.search(suffix) > -1 &&
                            !thisIsExclude
                        );
                    })
                    .map(el => get(el, 'props.customFields', {})[device]);

                bannersWithSettings = [
                    ...bannersWithSettings,
                    ...bannersInBody,
                    ...bannersInGrillaNotas
                ].filter(onlyUnique);

                /* console.log(
                    '::: PREVIA A LA CALL DE GOOGLETAG ',
                    bannersWithSettings,
                    bannersToLoad,
                    bannersToLoad.length === bannersWithSettings.length,
                    typeof window !== 'undefined',
                    !googleCmdPushed
                ); */

                if (
                    bannersToLoad.length === bannersWithSettings.length &&
                    typeof window !== 'undefined' &&
                    !googleCmdPushed &&
                    bannersToLoad.length !== 0
                ) {
                    googleCmdPushed = true;

                    console.log(
                        '🚀 ~ file: LoadBanners.jsx finalSlostsConfigured',
                        bannersWithSettings,
                        bannersToLoad
                    );

                    queueGoogletagCommand(
                        bannersToLoad.filter(e => !e.subscription)
                    );
                }
            }
        } catch (error) {
            console.error('🚀 ~ file: LoadBanners.jsx  ~ error', error);
        }
    }, [bannersConfigured, blocksBanners, device, isAdmin, state, suffix]);

    useEffect(() => {
        try {
            if (blocksBanners.length > 0 && suffix && device && !isAdmin) {
                const siteService = get(state, 'siteService', {});
                const dfpId = get(siteProperties, 'bannerConfig.dfp_id');
                const bannersSiteConfig = get(siteService, 'banners');

                const blocksConfig = blocksBanners
                    .map(el => {
                        const { slotGroup, desktop, tablet, mobile } = el;

                        const slotId = getSlotForDevice(device)([
                            {
                                name: 'desktop',
                                slot: desktop
                            },
                            { name: 'mobile', slot: mobile },
                            { name: 'tablet', slot: tablet }
                        ]);

                        if (!slotId) return {};

                        const config = slotsConfig.home[slotId];

                        if (!config) return {};

                        const configBuilder = new ConfigBuilder();
                        configBuilder.init({
                            ...config,
                            slotId,
                            dfpId,
                            slotGroup,
                            show: {
                                termicas: 'Si',
                                collection: true
                            }
                        });

                        if (bannersSiteConfig)
                            configBuilder.setDimensionsFromSiteService(
                                bannersSiteConfig,
                                slotGroup,
                                slotId
                            );

                        return configBuilder.get();
                    })
                    .map(
                        ({
                            slotName,
                            dimensions,
                            slotId,
                            bidding,
                            targeting,
                            slotGroup
                        }) => ({
                            adUnitPath: `/${dfpId}/${slotName}`,
                            size: flatArray(dimensions),
                            opt_div: slotId,
                            prebidEnabled: get(
                                bidding,
                                'prebid.enabled',
                                false
                            ),
                            targeting: {
                                ...targeting,
                                adstest: hasAdsTestParam()
                            },
                            slotGroup
                        })
                    )
                    .filter(el => Object.keys(el).length > 0 && el.opt_div);

                if (!bannersLoaded) {
                    setBannersLoaded(() => true);
                    queueGoogletagCommand(blocksConfig);

                    console.log(
                        '🚀 ~ file: blocksBanners && suffix && device',
                        blocksBanners,
                        blocksConfig,
                        suffix,
                        device
                    );
                }
            }
        } catch (error) {
            console.error('🚀 ~ file: LoadBanners.jsx  ~ error', error);
        }
    }, [
        bannersLoaded,
        blocksBanners,
        device,
        isAdmin,
        siteProperties,
        state,
        suffix
    ]);

    return <div className="hlp-none">Cargando banners ...</div>;
};

LoadBanners.propTypes = {
    blocksBanners: PropTypes.arrayOf(PropTypes.node)
};

LoadBanners.defaultProps = { blocksBanners: [] };

export default LoadBanners;
