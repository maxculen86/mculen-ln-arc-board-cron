import React, { useContext, useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';

let googleCmdPushed = false;

const LoadBanners = props => {
    const { state } = useContext(GlobalContext);
    const { renderables = [], outputType } = useAppContext();
    const [suffix, setSuffix] = useState();
    const device = useViewportSize();
    const suffixDevice = {
        desktop: '_dsk',
        tablet: '_tab',
        mobile: '_mob'
    };
    const bannersConfigured = renderables.filter(
        e =>
            ['LN-common/bannerRefactor', 'LN-nota/cuerpo'].includes(e.type) &&
            !(
                get(e, 'props.customFields.desktop', '') === 'megatop_dsk' ||
                get(e, 'props.customFields.tablet', '') === 'megatop_tab' ||
                get(e, 'props.customFields.mobile', '') === 'megatop_mob'
            )
    );

    useEffect(() => {
        if (outputType && device)
            setSuffix(() =>
                outputType === 'amp' ? '_amp' : suffixDevice[device]
            );
    }, [device, outputType, suffixDevice]);

    useEffect(() => {
        if (suffix && device) {
            const bannersInBody = [];
            const { bannersToLoad } = state || [];
            const bannersWithSettings = bannersConfigured
                .filter(e => {
                    if (e.type === 'LN-nota/cuerpo') {
                        const bodyBanners = get(e, 'props.customFields', {});

                        Object.keys(bodyBanners)
                            .filter(value => value.search(device) === 0)
                            .forEach(
                                value =>
                                    !bannersInBody.includes(
                                        bodyBanners[value]
                                    ) &&
                                    bodyBanners[value].search(suffix) > -1 &&
                                    bannersInBody.push(bodyBanners[value])
                            );
                    }

                    return (
                        get(e, 'props.customFields', {})[device] &&
                        get(e, 'props.customFields', {})[device].search(
                            suffix
                        ) > -1
                    );
                })
                .map(el => get(el, 'props.customFields', {})[device]);

            console.log(
                '🚀 ~ file: LoadBanners.jsx finalSlostsConfigured',
                [...bannersWithSettings, ...bannersInBody],
                bannersToLoad
            );

            if (
                bannersToLoad.length ===
                    [...bannersWithSettings, ...bannersInBody].length &&
                typeof window !== 'undefined' &&
                !googleCmdPushed
            ) {
                googleCmdPushed = true;
                window.googletag = window.googletag || {
                    cmd: []
                };
                const pbjs = pbjs || {};
                pbjs.que = pbjs.que || [];

                googletag.cmd.push(() => {
                    const defineSlot = ({
                        adUnitPath,
                        size,
                        opt_div: optDiv
                    }) =>
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

                    pbjs.que.push(() => {
                        pbjs.rp.requestBids({
                            callback: sendAdServerRequest,
                            gptSlotObjects: headerBiddingSlots
                        });
                    });

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
                            if (pbjs.adserverRequestSent) {
                                return;
                            }
                            pbjs.adserverRequestSent = true;
                            googletag.pubads().refresh(_headerBiddingSlots);
                        });
                    };

                    // this timeout is a failsafe
                    // the ad ops team can set lower thresholds that will be respected by Prebid
                    // but the web-dev team can define the worst case here
                    setTimeout(() => {
                        sendAdServerRequest(headerBiddingSlots);
                    }, 3500);
                });
            }
        }
    }, [bannersConfigured, device, state, suffix]);

    return <div className="hlp-none">Cargando banners ...</div>;
};

export default LoadBanners;
