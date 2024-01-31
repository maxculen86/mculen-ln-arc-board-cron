/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import bodyComponents from '../utils/bodyComponents';
import { transformEmbedScript } from '../../../LN-nota/body/_utils/_embedHelper';
import { STORYTELLING } from '../../../../private/common/utils/subtypes/subtypeHelper';

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
        if (!element) return <></>;

        const { type, subtype } = element.subtype
            ? transformEmbedScript(element)
            : element;

        const capitalIndex = contentElements.findIndex(
            element => element.type === 'text'
        );

        const Component =
            bodyComponents[type] || bodyComponents[subtype] || null;

        return Component ? (
            setDataComponent({
                Component,
                extraProps,
                element,
                currentIndex,
                capitalIndex,
                type,
                subtype,
                articleSubtype
            })
        ) : (
            <></>
        );
    });
};

const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    type,
    subtype,
    articleSubtype
}) => {
    return articleSubtype === STORYTELLING ? (
        <section
            key={`body-${currentIndex}`}
            className={
                type === 'image' || subtype === 'video_jw'
                    ? 'full-width'
                    : 'content'
            }
        >
            <Component
                data={element}
                capital={currentIndex === capitalIndex}
                outputType={'foodit'}
                {...(extraProps[type] || extraProps[subtype] || {})}
            />
        </section>
    ) : (
        <Component
            key={`body-${currentIndex}`}
            data={element}
            outputType={'foodit'}
            {...(extraProps[type] || extraProps[subtype] || {})}
        />
    );
};

export default buildBody;
