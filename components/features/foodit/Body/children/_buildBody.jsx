/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import bodyComponents from '../utils/bodyComponents';
import get from '../../../../private/common/utils/get';
import { transformEmbedScript } from '../../../LN-nota/body/_utils/_embedHelper';

const buildBody = ({ globalContent = {} }) => {
    const {
        content_elements: contentElements = [],
        headlines: { basic: tituloNota } = {},
        withSponsoredLink
    } = globalContent;

    return contentElements.map((element, currentIndex) => {
        if (!element) return <></>;

        const newElement = element.subtype
            ? transformEmbedScript(element)
            : element;

        const capitalIndex = contentElements.findIndex(v => v.type === 'text');
        // TODO: ajustar videoJW para notas del subtipo recetas, pendiente a nuevo content source
        const { type, subtype } = newElement;

        const Component =
            bodyComponents[type] || bodyComponents[subtype] || null;

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
            arcType
        });

        return Component ? ComponentWithProps : <></>;
    });
};

const setExtraProps = ({
    tituloNota,
    capitalIndex,
    globalContent,
    contentElements,
    withSponsoredLink
}) => {
    return {
        image: { withZoom: '--zoom', insideBody: true, globalContent },
        gallery: { withZoom: '--zoom' },
        video_jw: {
            tituloNota,
            primerParrafo:
                (capitalIndex !== -1 && contentElements[capitalIndex]) || ''
        },
        text: {
            withSponsoredLink
        }
    };
};

const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    arcType
}) =>
    Component ? (
        <Component
            key={`body-${currentIndex}`}
            data={element}
            capital={currentIndex === capitalIndex}
            outputType={'foodit'}
            {...(extraProps[arcType] || {})}
        />
    ) : (
        <></>
    );

export default buildBody;
