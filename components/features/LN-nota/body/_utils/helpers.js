import React from 'react';
import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';

export const isFotoAl100 = (noteSubtype, subtypeElement) =>
    noteSubtype === FOTOAL100 && subtypeElement !== 'custom-parallax';

export const isVideoJw = (componentElement, subtypeElement) =>
    componentElement.arcType === subtypeElement &&
    componentElement.arcType === 'video_jw';

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
    Component ? (
        <Component
            data={element}
            capital={currentIndex === capitalIndex}
            outputType={outputType}
            {...(extraProps[arcType] || {})}
        />
    ) : null;
