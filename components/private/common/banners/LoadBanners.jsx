import React, { useContext, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';

const LoadBanners = props => {
    const { state } = useContext(GlobalContext);
    const { renderables = [] } = useAppContext();
    const bannersConfigured = renderables.filter(
        e =>
            e.type === 'LN-common/bannerRefactor' &&
            !(
                get(e, 'props.customFields.desktop', '') === 'megatop_dsk' ||
                get(e, 'props.customFields.tablet', '') === 'megatop_tab' ||
                get(e, 'props.customFields.mobile', '') === 'megatop_mob'
            )
    );

    useEffect(() => {
        const { bannersToLoad } = state || [];
        if (
            bannersToLoad.length === bannersConfigured.length &&
            typeof window !== 'undefined'
        ) {
            window.googletag = window.googletag || {
                cmd: []
            };
            const pbjs = pbjs || {};
            pbjs.que = pbjs.que || [];

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

            googletag.cmd.push(() => {
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
            });

            // the callback function
            // will be called twice:
            //	once by Prebid when the auction's done
            //	once by the failsafe timeout
            // so a boolean is used to make sure ads are refreshed only once
            pbjs.adserverRequestSent = false;
            const sendAdServerRequest = _headerBiddingSlots => {
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
        }
    }, [state, bannersConfigured.length]);

    return <div className="hlp-none">Cargando banners ...</div>;
};

export default LoadBanners;
