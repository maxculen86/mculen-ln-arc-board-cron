import React from 'react';
import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';

export const isFotoAl100 = (noteSubtype, subtypeElement) =>
    noteSubtype === FOTOAL100 && subtypeElement !== 'custom-parallax';

export const isVideoJw = (componentElement, subtypeElement) =>
    componentElement.arcType === subtypeElement &&
    componentElement.arcType === 'video_jw';

export const isHowTo = (componentElement, subtypeElement) =>
    componentElement.arcType === subtypeElement &&
    componentElement.arcType === 'custom-how-to';

export const matchesArcType = (componentElement, type) =>
    componentElement.arcType === type;

export const setExtraProps = ({
    tituloNota,
    capitalIndex,
    globalContent,
    contentElements,
    withSponsoredLink
}) => ({
    image: { withZoom: '--zoom', insideBody: true, globalContent },
    gallery: { withZoom: '--zoom' },
    video: {
        tituloNota,
        primerParrafo:
            (capitalIndex !== -1 && contentElements[capitalIndex]) || ''
    },
    text: {
        withSponsoredLink
    }
});

export const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    outputType,
    arcType
}) =>
    Component
        ? React.createElement(Component, {
              data: element,
              capital: currentIndex === capitalIndex,
              outputType,
              ...(extraProps[arcType] || {})
          })
        : null;

export const createExtraProps = (globalContent, elements, useCapitalIndex) => {
    const { headlines: { basic: tituloNota } = {}, withSponsoredLink } =
        globalContent;

    const baseProps = {
        tituloNota,
        globalContent,
        contentElements: elements,
        withSponsoredLink
    };

    if (useCapitalIndex) {
        baseProps.capitalIndex = elements.findIndex(v => v.type === 'text');
    }

    return setExtraProps(baseProps);
};

export const shouldRenderComponent = (Component, supportedTypes, nodeType) =>
    Component && supportedTypes.includes(Component.arcType) && !nodeType.length;

export const createCounter = () => {
    let count = 0;
    const increment = () => {
        count += 1;
        increment.counter = count;
    };
    increment.counter = count;
    return increment;
};

export const createPropsFactory = ({
    Component,
    ComponentWithProps,
    element,
    currentIndex,
    nodeType,
    supportedTypes,
    globalContent,
    elements,
    outputType,
    incrementCounter
}) => ({
    Component,
    ComponentWithProps,
    element,
    currentIndex,
    nodeType,
    supportedTypes,
    arcType: Component?.arcType || '',
    counter: incrementCounter.counter,
    globalContent,
    elements,
    outputType,
    incrementCounter
});

export const renderElementDefault = (
    Component,
    ComponentWithProps,
    supportedTypes,
    nodeType
) =>
    shouldRenderComponent(Component, supportedTypes, nodeType)
        ? ComponentWithProps
        : null;
