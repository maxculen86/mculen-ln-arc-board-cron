/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { bodyElementRules } from '../_utils/_bodyElementRules';
import { BuildBanners } from './_buildBanners';
import { supportedTypes } from '../_utils/_bodyRules';
import get from '../../../../private/common/utils/get';

const BuildBody = ({ banners, outputType, globalContent = {} }) => {
    const {
        content_elements: contentElements,
        headlines: { basic: tituloNota },
        subtype = ''
    } = globalContent;

    let counter = 0;
    const elementList = contentElements.map((element, currentIndex) => {
        const nodeType = get(element, 'additional_properties.nodeType', {});
        const capitalIndex = contentElements.findIndex(v => v.type === 'text');

        const Component = bodyElementRules({
            element,
            outputType,
            subtype
        });

        const arcType = get(Component, 'arcType', '');

        const extraProps = setExtraProps({
            tituloNota,
            capitalIndex,
            contentElements
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
                        {bannerToRedender}
                    </>
                );
            }
            return ComponentWithProps;
        }

        return <></>;
    });

    return elementList;
};

export default BuildBody;

const setExtraProps = ({ tituloNota, capitalIndex, contentElements }) => {
    return {
        image: { withZoom: '--zoom' },
        gallery: { withZoom: '--zoom' },
        video: {
            tituloNota,
            primerParrafo: (capitalIndex && contentElements[capitalIndex]) || ''
        }
    };
};

const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    outputType,
    arcType
}) => {
    const baseComponent = Component ? (
        <Component
            data={element}
            capital={currentIndex === capitalIndex}
            outputType={outputType}
            {...(extraProps[arcType] || {})}
        />
    ) : (
        <></>
    );
    return baseComponent;
};
