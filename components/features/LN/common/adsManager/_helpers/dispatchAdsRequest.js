/* global googletag, pbjs, apstag */

import {
    defineSlot,
    filterCommercialBannersByFrequencyCap,
    getCommercialFrequencyCapBannersBySlot,
    setCommercialFrequencyCapCookie
} from '../../../../../private/LN/common/utils/bannerHelper';
import isWebview from '../../../../../private/common/utils/isWebview';

const dispatchAdsRequest = (bannersToLoad = [], { subscription } = {}) => {
    // 1. Definimos estados para coordinar ambas subastas
    let tamDone = false;
    let prebidDone = false;
    let batchCalled = false;

    const bannersToRequest = filterCommercialBannersByFrequencyCap(
        bannersToLoad,
        subscription
    );

    if (bannersToRequest.length === 0) return;

    const commercialFrequencyCapBanners =
        getCommercialFrequencyCapBannersBySlot(bannersToRequest, subscription);

    // Función coordinadora: solo refresca cuando AMBOS terminan o el failsafe actúa
    function sendToGAM(_headerBiddingSlots, fallback = false) {
        if (batchCalled) return;

        // Si no es el failsafe, verificamos que ambos hayan terminado
        if (!fallback && (!tamDone || !prebidDone)) return;

        batchCalled = true;
        // eslint-disable-next-line no-console
        if (fallback) console.log('🚀 ~ Failsafe activado');

        googletag.cmd.push(() => {
            googletag.pubads().refresh(_headerBiddingSlots);
        });
    }

    googletag.cmd.push(() => {
        googletag.pubads().disableInitialLoad();
        const headerBiddingSlots = bannersToRequest
            .filter(e => e.prebidEnabled)
            .map(defineSlot);

        if (headerBiddingSlots.length > 0) {
            const slotAPS = {
                slots: bannersToRequest.map(slot => ({
                    slotID: slot.opt_div,
                    slotName: slot.adUnitPath,
                    sizes: slot.size
                })),
                timeout: 2000
            };

            // 2. Disparamos Amazon APS en paralelo
            apstag.fetchBids(slotAPS, () => {
                apstag.setDisplayBids(); // Setea targeting de Amazon [4, 5]
                tamDone = true;
                sendToGAM(headerBiddingSlots);
            });

            // 3. Disparamos Demand Manager en paralelo (no dentro del callback de Amazon)
            if (!isWebview(navigator.userAgent)) {
                pbjs.que.push(() => {
                    pbjs.rp.requestBids({
                        gptSlotObjects: headerBiddingSlots,
                        callback: () => {
                            prebidDone = true;
                            sendToGAM(headerBiddingSlots);
                        }
                    });
                });
            }

            setTimeout(() => {
                sendToGAM(headerBiddingSlots, true);
            }, 3500); // Failsafe recomendado para reducir el peor caso [6, 7]
        }

        // Manejo de slots sin Prebid (estos se refrescan de inmediato)
        const nonHeaderBiddingSlots = bannersToRequest
            .filter(e => !e.prebidEnabled)
            .map(defineSlot);

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
