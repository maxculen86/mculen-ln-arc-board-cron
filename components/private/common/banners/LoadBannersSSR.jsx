/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import hasAdsTestParam from '../../LN/common/utils/hasAdsTesParam';
import {
    suffixDevice,
    queueGoogletagCommand
} from '../../LN/common/utils/bannerHelper';

let googleCmdPushed = false;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const getBannersInDOM = device => {
    const banners = document.querySelectorAll(`div[data-device="${device}"]`);
    const bannersToLoad = [];
    banners &&
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

                const finalBannersToLoad = [
                    ...bannersToLoad,
                    ...bannersToLoadFromDOM
                ];

                let bannersWithSettings = bannersConfigured.filter(
                    bannerConfig => {
                        // const bannerInPB = get(e, 'props.customFields', {})[
                        //     device
                        // ];
                        const bannerInPB = get(
                            bannerConfig,
                            'props.customFields',
                            {}
                        );
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
                            outputType === 'amp'
                                ? bannerInPB.amp
                                : !bannerInPB.amp;

                        if (
                            bannerConfig.type === 'LN-nota/cuerpo' &&
                            slotGroup === 'nota'
                        ) {
                            Object.keys(bannerInPB)
                                .filter(value => value.includes(device))
                                .forEach(value => {
                                    const bannerSetInBody =
                                        bannerInPB[value] || '';

                                    return (
                                        !bannersInBody.includes(
                                            bannerSetInBody
                                        ) &&
                                        bannerSetInBody.search(suffix) > -1 &&
                                        Object.keys(bannersToLoadFromDOM).find(
                                            i =>
                                                bannersToLoadFromDOM[i]
                                                    .opt_div === bannerSetInBody
                                        ) &&
                                        bannersInBody.push(bannerSetInBody)
                                    );
                                });
                        }

                        return (
                            bannerInPB &&
                            (bannerInPB.device === device ||
                                bannerInPB[device]) &&
                            !thisIsExclude &&
                            checkAmp &&
                            Object.keys(finalBannersToLoad).find(
                                i =>
                                    finalBannersToLoad[i].opt_div ===
                                    (bannerInPB[device] ||
                                        `${bannerInPB.slot}${suffix}`)
                            )
                        );
                    }
                );

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
