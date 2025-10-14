import React from 'react';
import DivBannerSSR from '../DivBannerSSR';

export const renderSingleBanner = config => {
    const { slotId, key, ...restConfig } = config;

    if (!slotId) {
        console.error('Banner configuration missing required slotId:', config);
        return null;
    }

    return (
        <DivBannerSSR
            key={slotId}
            bannerConfiguration={{ slotId, ...restConfig }}
        />
    );
};

export const renderBanner = bannerConfig => {
    const { isGroup, customWrapper, banners, key } = bannerConfig;

    if (!key) {
        console.error(
            'Banner configuration missing required key:',
            bannerConfig
        );
        return null;
    }

    if (isGroup && customWrapper) {
        if (!banners || !Array.isArray(banners)) {
            console.error(
                `Banner group "${key}" has customWrapper but invalid banners array:`,
                bannerConfig
            );
            return null;
        }

        return (
            <div className={customWrapper} key={key}>
                {banners.map(renderSingleBanner)}
            </div>
        );
    }

    if (isGroup) {
        if (!banners || !Array.isArray(banners)) {
            console.error(
                `Banner group "${key}" has invalid banners array:`,
                bannerConfig
            );
            return null;
        }

        return (
            <React.Fragment key={key}>
                {banners.map(renderSingleBanner)}
            </React.Fragment>
        );
    }

    return renderSingleBanner(bannerConfig);
};
export const generateBannersObject = configs => {
    if (!Array.isArray(configs)) {
        console.error(
            'generateBannersObject expects an array, received:',
            typeof configs
        );
        return {};
    }

    return configs.reduce((acc, config) => {
        if (!config || !config.key) {
            console.warn('Skipping invalid banner config:', config);
            return acc;
        }

        const renderedBanner = renderBanner(config);

        if (renderedBanner) {
            acc[config.key] = renderedBanner;
        }

        return acc;
    }, {});
};

export default {
    renderSingleBanner,
    renderBanner,
    generateBannersObject
};
