import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import useViewportSize from '../hooks/useViewportSize';
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';
import useAdsTestAndSuffix from '../hooks/useAdsTestAndSuffix';
import bannerConfigType from './helpers/loadBannersSSRHelper';
import getCustomTargeting from './helpers/getCustomTargeting';
import { isSubscribed, SUBSCRIBED_HELPER } from '../auth/helper/loginHelper';

let googleCmdPushed = false;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const getBannersInDOM = device => {
    const banners = document.querySelectorAll(`div[data-device="${device}"]`);
    const bannersToLoad = [];
    banners?.forEach(divBanner => {
        bannersToLoad.push({
            adUnitPath: divBanner.dataset.adUnitPath,
            size: JSON.parse(divBanner.dataset.size),
            opt_div: divBanner.id,
            sizemap: JSON.parse(divBanner.dataset.sizemap),
            prebidEnabled: divBanner.dataset.prebidEnabled === 'true',
            targeting: JSON.parse(divBanner.dataset.targeting),
            slotGroup: divBanner.dataset.slotGroup,
            hideForSubscriptor: divBanner.dataset.subscription === 'true',
            withoutHide: divBanner.dataset.withoutHide === 'true',
            customTargeting: getCustomTargeting({ bannerId: divBanner.id })
        });
    });
    return bannersToLoad;
};

function LoadBannersSSR({ blocksBanners = [] }) {
    const {
        renderables = [],
        outputType,
        isAdmin,
        globalContentConfig,
        globalContent = {}
    } = useAppContext();
    const device = useViewportSize();
    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const bannersConfigured = renderables.filter(e =>
        [
            'LN-common/banner',
            'LN-nota/cuerpo',
            'LN-nota/body',
            'LN/DS-Body',
            'LN-acumulado/grillaNotas',
            'LN-common/bannerRefactor'
        ].includes(e.type)
    );

    const bannersDisabled =
        get(globalContentConfig, 'query.banners_disabled', 'false') === 'true';

    const suffix = useAdsTestAndSuffix(device, outputType);
    const subtype = get(globalContent, 'subtype', '');

    useEffect(() => {
        try {
            if (
                suffix &&
                device &&
                blocksBanners.length === 0 &&
                !isAdmin &&
                !bannersDisabled
            ) {
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

                        bannerConfigType({
                            bannerConfig,
                            slotGroup,
                            bannerInPB,
                            device,
                            subtype,
                            bannersInBody,
                            suffix,
                            bannersToLoadFromDOM,
                            bannersInGrillaNotas
                        });

                        return (
                            bannerInPB &&
                            (bannerInPB.device === device ||
                                bannerInPB[device]) &&
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

                    console.info(
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
        subscription,
        bannersDisabled,
        subtype
    ]);

    return <div className="hlp-none hidden">Cargando banners ...</div>;
}

export default LoadBannersSSR;
