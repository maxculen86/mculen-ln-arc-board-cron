import React from 'react';
import { BuildBanners } from '../_children/_buildBanners';
import { processElement } from '../_children/_processElement';
import get from '../../../../private/common/utils/get';

export const renderWithBanners = (ComponentWithProps, config) => {
    const {
        banners,
        globalContent,
        elements,
        outputType,
        counter,
        element,
        currentIndex
    } = config;

    const bannerToRender = BuildBanners({
        banners,
        globalContent,
        elementPosition: counter,
        contentElements: elements,
        outputType
    });

    return (
        <React.Fragment key={get(element, '_id', currentIndex)}>
            {ComponentWithProps}
            {bannerToRender}
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
    createComponentProps,
    bodyComponents
) => {
    const { nodeType, Component } = processElement(
        element,
        outputType,
        subtype,
        bodyComponents
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

    if (isUnsupportedType(Component, finalSupportedTypes)) {
        return ComponentWithProps;
    }

    if (shouldSkipElement(nodeType)) return null;

    if (banners) {
        return renderWithBanners(ComponentWithProps, {
            banners,
            globalContent,
            elements,
            outputType,
            counter: counter.current + 1,
            element,
            currentIndex
        });
    }

    return ComponentWithProps;
};
