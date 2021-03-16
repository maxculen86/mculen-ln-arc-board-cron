/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';

let googleCmdPushed = false;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const queueGoogletagCommand = bannersToLoad => {
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
                if (!isEmpty)
                    document
                        .getElementById(slot.getSlotElementId())
                        .parentNode.classList.remove('hlp-none');
            });
    });
};

const LoadBanners = () => {
    const { state } = useContext(GlobalContext);
    const { renderables = [], outputType } = useAppContext();
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
        if (outputType && device)
            setSuffix(() =>
                outputType === 'amp' ? '_amp' : suffixDevice[device]
            );
    }, [device, outputType, suffixDevice]);

    useEffect(() => {
        try {
            if (suffix && device) {
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
                    !googleCmdPushed
                ) {
                    googleCmdPushed = true;

                    console.log(
                        '🚀 ~ file: LoadBanners.jsx finalSlostsConfigured',
                        bannersWithSettings,
                        bannersToLoad
                    );

                    queueGoogletagCommand(bannersToLoad);
                }
            }
        } catch (error) {
            console.error('🚀 ~ file: LoadBanners.jsx  ~ error', error);
        }
    }, [bannersConfigured, device, state, suffix]);

    return <div className="hlp-none">Cargando banners ...</div>;
};

export default LoadBanners;
