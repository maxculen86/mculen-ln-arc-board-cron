/* global googletag, pbjs, apstag */

import {
    defineSlot,
    filterCommercialBannersByFrequencyCap,
    getCommercialFrequencyCapBannersBySlot,
    setCommercialFrequencyCapCookie
} from '../../../../../private/LN/common/utils/bannerHelper';
import isWebview from '../../../../../private/common/utils/isWebview';

const dispatchAdsRequest = (bannersToLoad = [], { subscription } = {}) => {
    const bannersToRequest = filterCommercialBannersByFrequencyCap(
        bannersToLoad,
        subscription
    );

    if (bannersToRequest.length === 0) return;

    const commercialFrequencyCapBanners =
        getCommercialFrequencyCapBannersBySlot(bannersToRequest, subscription);

    let batchCalled = false;
    function callAdserver(_headerBiddingSlots, fallback = false) {
        if (batchCalled) return;
        if (fallback) {
            // eslint-disable-next-line no-console
            console.log('🚀 ~ callAdserver ~ fallback:', fallback);
        }
        batchCalled = true;

        googletag.pubads().refresh(_headerBiddingSlots);
    }

    googletag.cmd.push(() => {
        googletag.pubads().disableInitialLoad();
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

        if (nonHeaderBiddingSlots.length) {
            googletag.pubads().refresh(nonHeaderBiddingSlots);
        }

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

export default dispatchAdsRequest;
