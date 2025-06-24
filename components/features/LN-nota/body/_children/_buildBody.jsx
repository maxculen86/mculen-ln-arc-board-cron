/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import { bodyElementRules } from '../_utils/_bodyElementRules';
import { BuildBanners } from './_buildBanners';
import { supportedTypes } from '../_utils/_bodyRules';
import get from '../../../../private/common/utils/get';
import { transformEmbedScript } from '../_utils/_embedHelper';

const BuildBody = ({ banners, outputType, globalContent = {} }) => {
    const {
        content_elements: contentElements,
        headlines: { basic: tituloNota },
        subtype = '',
        withSponsoredLink
    } = globalContent;

    let counter = 0;
    return contentElements.map((element, currentIndex) => {
        const newElement = element.subtype
            ? transformEmbedScript(element)
            : element;

        const nodeType = get(newElement, 'additional_properties.nodeType', {});
        const capitalIndex = contentElements.findIndex(v => v.type === 'text');

        const Component = bodyElementRules({
            element: newElement,
            outputType,
            subtype
        });

        const arcType = get(Component, 'arcType', '');

        const extraProps = setExtraProps({
            tituloNota,
            capitalIndex,
            globalContent,
            contentElements,
            withSponsoredLink
        });

        const ComponentWithProps = setDataComponent({
            Component,
            extraProps,
            element,
            currentIndex,
            capitalIndex,
            outputType,
            arcType
        });

        if (Component) {
            if (supportedTypes.includes(Component.arcType)) {
                if (nodeType.length) return <></>;
                counter += 1;

                const bannerToRedender = BuildBanners({
                    banners,
                    globalContent,
                    elementPosition: counter,
                    contentElements,
                    outputType
                });

                return (
                    <>
                        {ComponentWithProps}
                        {currentIndex === contentElements.length - 1 && (
                            <div id="fin-de-nota"></div>
                        )}
                        {bannerToRedender}
                    </>
                );
            }
            return ComponentWithProps;
        }

        return <></>;
    });
};

export default BuildBody;

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
    Component ? (
        <Component
            data={element}
            capital={currentIndex === capitalIndex}
            outputType={outputType}
            {...(extraProps[arcType] || {})}
        />
    ) : (
        <></>
    );
