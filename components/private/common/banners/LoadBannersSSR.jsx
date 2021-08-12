/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';
import { suffixDevice } from '../../LN/common/utils/bannerHelper';

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
    console.log(
        '🚀 ~ file: LoadBannersSSR.jsx ~ line 43 ~ bannersToLoad',
        bannersToLoad
    );
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

        bannersWithoutHide = bannersToLoad
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

const getBannersInDOM = device => {
    const banners = document.querySelectorAll(`div[data-device="${device}"]`);
    const bannersToLoad = [];
    banners.forEach(divBanner => {
        bannersToLoad.push({
            adUnitPath: divBanner.dataset.adUnitPath,
            size: JSON.parse(divBanner.dataset.size),
            opt_div: divBanner.id,
            sizemap: JSON.parse(divBanner.dataset.sizemap),
            prebidEnabled: divBanner.dataset.prebidEnabled === 'true',
            targeting: JSON.parse(divBanner.dataset.targeting),
            slotGroup: divBanner.dataset.slotGroup,
            subscription: divBanner.dataset.subscription === 'true',
            withoutHide: divBanner.dataset.withoutHide === 'true'
        });
    });
    return bannersToLoad;
};

const LoadBannersSSR = ({ blocksBanners }) => {
    const { state } = useContext(GlobalContext);
    const { renderables = [], outputType, isAdmin } = useAppContext();
    const [suffix, setSuffix] = useState();
    const device = useViewportSize();
    const bannersConfigured = renderables.filter(e =>
        [
            'LN-common/banner',
            'LN-nota/cuerpo',
            'LN-common/bannerRefactor'
        ].includes(e.type)
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
    }, [device, outputType]);

    useEffect(() => {
        try {
            if (suffix && device && blocksBanners.length === 0 && !isAdmin) {
                const bannersToLoadFromDOM = getBannersInDOM(device);

                const bannersInBody = [];
                const {
                    bannersConfig: {
                        bannersToLoad = [],
                        shallBeExcluded = [],
                        bannersInGrillaNotas = []
                    }
                } = state || { bannersConfig: {} };
                let bannersWithSettings = bannersConfigured.filter(e => {
                    // const bannerInPB = get(e, 'props.customFields', {})[
                    //     device
                    // ];
                    const bannerInPB = get(e, 'props.customFields', {});
                    // console.log("🚀 ~ file: LoadBannersSSR.jsx ~ line 171 ~ useEffect ~ bannerInPB", bannerInPB)
                    const slotGroup =
                        bannersToLoadFromDOM &&
                        bannersToLoadFromDOM[0] &&
                        bannersToLoadFromDOM[0].slotGroup;

                    const thisIsExclude =
                        slotGroup === 'nota'
                            ? shallBeExcluded.includes(bannerInPB || '')
                            : false;

                    const checkAmp =
                        outputType === 'amp' ? bannerInPB.amp : !bannerInPB.amp;

                    if (e.type === 'LN-nota/cuerpo' && slotGroup === 'nota') {
                        const bodyBanners = get(e, 'props.customFields', {});

                        Object.keys(bodyBanners)
                            .filter(value => value.includes(device))
                            .forEach(value => {
                                const bannerSetInBody =
                                    bodyBanners[value] || '';

                                return (
                                    !bannersInBody.includes(bannerSetInBody) &&
                                    bannerSetInBody.search(suffix) > -1 &&
                                    Object.keys(bannersToLoadFromDOM).find(
                                        i =>
                                            bannersToLoadFromDOM[i].opt_div ===
                                            bannerSetInBody
                                    ) &&
                                    bannersInBody.push(bannerSetInBody)
                                );
                            });
                    }

                    return (
                        bannerInPB &&
                        (bannerInPB.device === device || bannerInPB[device]) &&
                        !thisIsExclude &&
                        checkAmp
                    );
                });

                bannersWithSettings = [
                    ...bannersWithSettings,
                    ...bannersInBody,
                    ...bannersInGrillaNotas
                ].filter(onlyUnique);

                const finalBannersToLoad = [
                    ...bannersToLoad,
                    ...bannersToLoadFromDOM
                ];

                /* console.log(
                    '::: PREVIA A LA CALL DE GOOGLETAG ',
                    bannersWithSettings,
                    bannersToLoad,
                    bannersToLoad.length === bannersWithSettings.length,
                    typeof window !== 'undefined',
                    !googleCmdPushed
                ); */

                if (
                    finalBannersToLoad.length === bannersWithSettings.length &&
                    typeof window !== 'undefined' &&
                    !googleCmdPushed &&
                    finalBannersToLoad.length !== 0
                ) {
                    googleCmdPushed = true;

                    console.log(
                        '🚀 ~ file: LoadBannersSSR.jsx finalSlostsConfigured',
                        bannersWithSettings,
                        finalBannersToLoad
                    );

                    queueGoogletagCommand(
                        finalBannersToLoad.filter(e => !e.subscription)
                    );
                }
            }
        } catch (error) {
            console.error('🚀 ~ file: LoadBannersSSR.jsx  ~ error', error);
        }
    }, [
        bannersConfigured,
        blocksBanners,
        device,
        isAdmin,
        state,
        suffix,
        outputType
    ]);

    return <div className="hlp-none">Cargando banners ...</div>;
};

LoadBannersSSR.propTypes = {
    blocksBanners: PropTypes.arrayOf(
        PropTypes.shape({
            slotGroup: PropTypes.string
        })
    )
};

LoadBannersSSR.defaultProps = { blocksBanners: [] };

export default LoadBannersSSR;
