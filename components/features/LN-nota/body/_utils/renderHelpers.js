import React from 'react';
import { BuildBanners } from '../_children/_buildBanners';
import { processElement } from '../_children/_processElement';
import get from '../../../../private/common/utils/get';
import {
    getDynamicBannerSettings,
    getDynamicBannersWithGPTConfigsForIndex
} from '../../../../private/common/banners/dynamicBanners/dynamicBannersHelper';
import { getBannerStrategy } from './dynamicBannerStrategies';

export const DYNAMIC_BANNER_COUNTABLE_TYPES = [
    'text',
    'image',
    'gallery',
    'video',
    'raw_html',
    'oembed_response'
];

export const DYNAMIC_BANNER_COUNTABLE_SUBTYPES = [
    'video_jw',
    'gallery-embed',
    'custom-how-to',
    'custom-card'
];

export const isElementCountable = element => {
    if (DYNAMIC_BANNER_COUNTABLE_TYPES.includes(element.type)) return true;

    if (element.type === 'custom_embed') {
        return DYNAMIC_BANNER_COUNTABLE_SUBTYPES.includes(element.subtype);
    }

    return false;
};

export const hasBodyBanners = (banners, dynamicBanners) =>
    Boolean(banners) || Boolean(dynamicBanners?.enabled);

export const shouldCountElementForBanners = ({
    renderedElement,
    banners,
    dynamicBanners,
    element,
    supportedTypes
}) => {
    if (!renderedElement || !hasBodyBanners(banners, dynamicBanners)) {
        return false;
    }

    if (dynamicBanners?.enabled) {
        return isElementCountable(element);
    }

    return supportedTypes.includes(element.type);
};

const renderDynamicBanners = ({
    globalContent,
    elementPosition,
    bannerCounter,
    currentIndex,
    currentDevice,
    dynamicBanners,
    onDynamicBannersGoogletagConfig,
    layout
}) => {
    if (!dynamicBanners?.enabled) return null;

    const subtype = get(globalContent, 'subtype', '');
    const { maxBanners } = getDynamicBannerSettings({
        globalContent,
        layout,
        subtype
    });

    const context = {
        elementPosition,
        itemIndex: elementPosition - 1,
        bannerCounter,
        maxBanners,
        isSubscribed: get(dynamicBanners, 'isSubscribed', false)
    };

    const strategy = getBannerStrategy(subtype);
    const bannerIndex = strategy.getBannerIndex(context);
    const shouldInsert = strategy.shouldInsert({ ...context, bannerIndex });

    if (!shouldInsert) return null;

    // eslint-disable-next-line no-param-reassign
    bannerCounter.current += 1;

    const dynamicBannersResult = getDynamicBannersWithGPTConfigsForIndex({
        globalContent,
        currentDevice,
        bannerIndex,
        keyIndex: currentIndex,
        layout
    });

    if (!dynamicBannersResult) return null;

    onDynamicBannersGoogletagConfig?.(dynamicBannersResult.googleTagConfig);

    return dynamicBannersResult.bannerDivs;
};

export const renderWithBanners = (ComponentWithProps, config) => {
    const {
        banners,
        globalContent,
        elements,
        outputType,
        counter,
        bannerCounter,
        element,
        currentIndex,
        dynamicBanners,
        currentDevice,
        onDynamicBannersGoogletagConfig,
        layout
    } = config;

    const bannerToRender = BuildBanners({
        banners,
        globalContent,
        elementPosition: counter,
        contentElements: elements,
        outputType
    });

    const dynamicBannerToRender = renderDynamicBanners({
        globalContent,
        elementPosition: counter,
        bannerCounter,
        currentIndex,
        currentDevice,
        dynamicBanners,
        onDynamicBannersGoogletagConfig,
        layout
    });

    return (
        <React.Fragment key={get(element, '_id', currentIndex)}>
            {ComponentWithProps}
            {bannerToRender}
            {dynamicBannerToRender}
        </React.Fragment>
    );
};

export const createElementProps = (
    globalContent,
    elements,
    useCapitalIndex
) => {
    const { headlines: { basic: tituloNota } = {}, withSponsoredLink } =
        globalContent;
    const capitalIndex = useCapitalIndex
        ? elements.findIndex(v => v.type === 'text')
        : undefined;

    return {
        tituloNota,
        capitalIndex: useCapitalIndex ? capitalIndex : undefined,
        globalContent,
        contentElements: elements,
        withSponsoredLink
    };
};

export const shouldSkipElement = nodeType => nodeType.length > 0;

export const isUnsupportedType = (Component, supportedTypes) =>
    !supportedTypes.includes(Component.arcType);

export const shouldRenderComponent = (Component, supportedTypes, nodeType) =>
    Component && supportedTypes.includes(Component.arcType) && !nodeType.length;

export const renderElement = (
    element,
    currentIndex,
    elementProps,
    outputType,
    subtype,
    finalSupportedTypes,
    banners,
    globalContent,
    elements,
    counter,
    bannerCounter,
    createComponentProps,
    bodyComponents,
    ruleConditions,
    dynamicBanners,
    currentDevice,
    onDynamicBannersGoogletagConfig,
    layout
) => {
    const { nodeType, Component } = processElement(
        element,
        outputType,
        subtype,
        bodyComponents,
        ruleConditions
    );

    if (!Component) return null;

    const ComponentWithProps = createComponentProps(
        Component,
        elementProps,
        element,
        currentIndex,
        outputType,
        {
            capitalIndex: elementProps.capitalIndex,
            processElementProps: true
        }
    );

    const isCountableForDynamicBanners =
        dynamicBanners?.enabled && isElementCountable(element);

    if (
        isUnsupportedType(Component, finalSupportedTypes) &&
        !isCountableForDynamicBanners
    ) {
        return ComponentWithProps;
    }

    if (shouldSkipElement(nodeType)) return null;

    if (hasBodyBanners(banners, dynamicBanners)) {
        return renderWithBanners(ComponentWithProps, {
            banners,
            globalContent,
            elements,
            outputType,
            counter: counter.current + 1,
            bannerCounter,
            element,
            currentIndex,
            dynamicBanners,
            currentDevice,
            onDynamicBannersGoogletagConfig,
            layout
        });
    }

    return ComponentWithProps;
};
