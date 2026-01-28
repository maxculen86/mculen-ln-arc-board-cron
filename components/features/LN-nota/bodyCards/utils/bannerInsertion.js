import React from 'react';
import {
    buildGoogleTagBannerConfig,
    renderDynamicBanner,
    SUPPORTED_DEVICES,
    shouldInsertBanner
} from '../../../../private/common/banners/dynamicBanners/dynamicBannersHelper';

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
        className="p-24 w-fit border-box js-center bg-cards-nota rounded-4 border border-all border-1 border-neutral-light-100 p-64_m"
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
    createCardElement
};
