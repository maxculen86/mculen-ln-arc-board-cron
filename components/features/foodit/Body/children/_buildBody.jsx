/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import bodyComponents from '../utils/bodyComponents';
import { transformEmbedScript } from '../../../LN-nota/body/_utils/_embedHelper';
import { STORYTELLING } from '../../../../private/common/utils/subtypes/subtypeHelper';

const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    type,
    subtype,
    articleSubtype
}) =>
    articleSubtype === STORYTELLING ? (
        <section key={`body-${currentIndex}`} className="content">
            <Component
                data={element}
                capital={currentIndex === capitalIndex}
                outputType="foodit"
                {...(extraProps[type] || extraProps[subtype] || {})}
            />
        </section>
    ) : (
        <Component
            key={`body-${currentIndex}`}
            data={element}
            outputType="foodit"
            {...(extraProps[type] || extraProps[subtype] || {})}
        />
    );

const buildBody = ({ globalContent = {} }) => {
    const {
        content_elements: contentElements = [],
        headlines: { basic: tituloNota } = {},
        subtype: articleSubtype = ''
    } = globalContent;

    const extraProps = {
        video_jw: {
            tituloNota,
            className: 'w-100 ratio-16-9'
        }
    };

    return contentElements.map((element, currentIndex) => {
        if (!element) return null;

        const { type, subtype } = element.subtype
            ? transformEmbedScript(element)
            : element;

        const capitalIndex = contentElements.findIndex(
            el => el.type === 'text'
        );

        const Component =
            bodyComponents[type] || bodyComponents[subtype] || null;

        const elementData =
            type === 'image' ? { ...element, title: tituloNota } : element;

        return Component
            ? setDataComponent({
                  Component,
                  extraProps,
                  element: elementData,
                  currentIndex,
                  capitalIndex,
                  type,
                  subtype,
                  articleSubtype
              })
            : null;
    });
};

export default buildBody;
