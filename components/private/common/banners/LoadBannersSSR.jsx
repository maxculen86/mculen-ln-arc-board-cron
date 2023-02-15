/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';
import { isSubscribed } from '../../LN/common/utils/contextHelper';
import useAdsTestAndSuffix from '../hooks/useAdsTestAndSuffix';
import bannerConfigType from './helpers/loadBannersSSRHelper';

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
                hideForSubscriptor: divBanner.dataset.subscription === 'true',
                withoutHide: divBanner.dataset.withoutHide === 'true'
            });
        });
    return bannersToLoad;
};

const LoadBannersSSR = ({ blocksBanners }) => {
    const { renderables = [], outputType, isAdmin } = useAppContext();
    const device = useViewportSize();
    const subscription = isSubscribed();
    const bannersConfigured = renderables.filter(e =>
        [
            'LN-common/banner',
            'LN-nota/cuerpo',
            'LN-nota/body',
            'LN-acumulado/grillaNotas',
            'LN-common/bannerRefactor'
        ].includes(e.type)
    );

    const suffix = useAdsTestAndSuffix(device, outputType);

    useEffect(() => {
        try {
            if (suffix && device && blocksBanners.length === 0 && !isAdmin) {
                const bannersToLoadFromDOM = getBannersInDOM(device);

                const bannersInBody = [];
                const bannersInGrillaNotas = [];

                const finalBannersToLoad = [...bannersToLoadFromDOM];

                let bannersWithSettings = bannersConfigured.filter(
                    bannerConfig => {
                        const bannerInPB = get(
                            bannerConfig,
                            'props.customFields',
                            {}
                        );

                        const slotGroup = get(
                            bannersToLoadFromDOM,
                            '[0].slotGroup',
                            ''
                        );

                        const checkAmp =
                            outputType === 'amp'
                                ? bannerInPB.amp
                                : !bannerInPB.amp;

                        bannerConfigType({
                            bannerConfig,
                            slotGroup,
                            bannerInPB,
                            device,
                            bannersInBody,
                            suffix,
                            bannersToLoadFromDOM,
                            bannersInGrillaNotas
                        });

                        return (
                            bannerInPB &&
                            (bannerInPB.device === device ||
                                bannerInPB[device]) &&
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
                        finalBannersToLoad.filter(
                            ban => !(ban.hideForSubscriptor && subscription)
                        )
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
        suffix,
        outputType,
        subscription
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
