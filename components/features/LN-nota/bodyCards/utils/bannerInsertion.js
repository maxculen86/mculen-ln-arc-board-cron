import React from 'react';
import {
    renderDynamicBanner,
    shouldInsertBanner,
    createDynamicBannerConfig
} from '../../../../layouts/LN-Nota-Cards/utils/dynamicBannerHelper';

const SUPPORTED_DEVICES = ['desktop', 'mobile'];

export const buildGoogleTagBannerConfig = (
    device,
    bannerIndex,
    globalContent
) => {
    const bannerConfiguration = createDynamicBannerConfig(
        globalContent,
        device,
        bannerIndex
    );

    if (!bannerConfiguration) return null;

    const {
        slotId,
        slotGroup,
        dfpId,
        slotName,
        targeting,
        dimensions,
        withoutHide,
        bidding,
        hideForSubscriptor
    } = bannerConfiguration;

    return {
        adUnitPath: `/${dfpId}/${slotName}`,
        size: dimensions,
        opt_div: slotId,
        sizemap: [],
        prebidEnabled: bidding?.prebid?.enabled || false,
        targeting,
        slotGroup,
        hideForSubscriptor,
        withoutHide,
        customTargeting: {}
    };
};

export const createBannerElement = (
    globalContent,
    device,
    bannerIndex,
    cardIndex
) => {
    const bannerKey = `dynamic-banner-${device}-${bannerIndex}-${cardIndex}`;
    const banner = renderDynamicBanner(
        globalContent,
        device,
        bannerIndex,
        bannerKey
    );

    if (!banner) return null;

    const googleTagConfig = buildGoogleTagBannerConfig(
        device,
        bannerIndex,
        globalContent
    );
    if (!googleTagConfig) return null;

    const bannerElement = (
        <React.Fragment key={bannerKey}>{banner}</React.Fragment>
    );

    return {
        bannerElement,
        bannerConfig: googleTagConfig
    };
};

export const createCardElement = (
    cardGroup,
    index,
    renderExpandedCard,
    outputType,
    globalContent
) => (
    <div
        className="grid-col-1 grid-col-3-11_m grid-col-4-10_md grid-col-5-13_lg"
        key={cardGroup.id}
    >
        {renderExpandedCard(
            cardGroup,
            index,
            outputType,
            globalContent,
            'expanded'
        )}
    </div>
);

export const insertBannersIntoCards = (
    cardGroups,
    globalContent,
    renderConfig,
    currentDevice
) => {
    const { renderExpandedCard, outputType } = renderConfig;
    const result = [];
    const googleTagConfigsArray = [];
    let bannerIndex = 1;

    cardGroups.forEach((cardGroup, index) => {
        result.push(
            createCardElement(
                cardGroup,
                index,
                renderExpandedCard,
                outputType,
                globalContent
            )
        );

        if (shouldInsertBanner(index, bannerIndex)) {
            SUPPORTED_DEVICES.forEach(device => {
                const bannerResult = createBannerElement(
                    globalContent,
                    device,
                    bannerIndex,
                    index
                );

                if (bannerResult) {
                    result.push(bannerResult.bannerElement);
                }

                if (bannerResult && device === currentDevice) {
                    googleTagConfigsArray.push(bannerResult.bannerConfig);
                }
            });

            bannerIndex += 1;
        }
    });

    return {
        elements: result,
        googleTagConfigs: googleTagConfigsArray
    };
};

export const createRenderConfig = (renderExpandedCard, outputType) => ({
    renderExpandedCard,
    outputType
});

export default {
    insertBannersIntoCards,
    createRenderConfig,
    shouldInsertBanner,
    createBannerElement,
    createCardElement,
    buildGoogleTagBannerConfig
};
