/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import { bodyElementRules } from '../_utils/_bodyElementRules';
import { buildBanners } from './_buildBanners';
import { supportedTypes } from '../_utils/_bodyRules';
import get from '../../../../private/common/utils/get';

const BuildBody = ({
    banners,
    tituloNota,
    contentElements,
    globalSubType,
    outputType,
    globalContent
}) => {
    // let counter = 0;

    const elementList = contentElements.map((element, currentIndex) => {
        // const { additional_properties: { nodeType = {} } = {} } = element || {};
        const nodeType = get(element, 'additional_properties.nodeType', {});
        const capitalIndex = contentElements.findIndex(v => v.type === 'text');

        const Component = bodyElementRules({
            element,
            outputType,
            globalSubType
        });

        // const { arcType = '' } = Component || {};
        const arcType = get(Component, 'arcType', '');

        const extraProps = setExtraProps({
            tituloNota,
            capitalIndex,
            contentElements
        });

        const _BaseComp = setDataComponent({
            Component,
            extraProps,
            element,
            currentIndex,
            capitalIndex,
            outputType,
            arcType
        });

        // return _BaseComp;

        const _Comp = _BaseComp;

        // console.log('Componente', _Comp, 'Banner', banners);
        // debugger
        if (Component) {
            if (supportedTypes.includes(Component.arcType)) {
                if (nodeType.length) return <></>;
                // counter += 1;
                const counterElement = currentIndex + 1;
                const bannerToRedender = buildBanners({
                    banners,
                    globalContent,
                    counterElement,
                    contentElements,
                    outputType
                });

                return (
                    <>
                        {_Comp}
                        {bannerToRedender}
                    </>
                );
            }
            return _Comp;
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
