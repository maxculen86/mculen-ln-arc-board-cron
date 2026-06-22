import React from 'react';
import { useAppContext } from 'fusion:context';
import bodyComponents from '../utils/bodyComponents';
import ConsecutiveImages from '../../../private-global/body/doubleImage/foodit';
import { transformEmbedScript } from '../../../LN-nota/body/_utils/_embedHelper';
import {
    NOTA_CERRADA,
    STORYTELLING
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import {
    bannersElements,
    BannersFoodit
} from '../../../foodit-global/Banners/foodit';

const setDataComponent = ({
    Component,
    extraProps,
    element,
    currentIndex,
    capitalIndex,
    type,
    subtype,
    articleSubtype,
    hasConsecutiveImages,
    images,
    contentElements
}) => {
    if (hasConsecutiveImages && images) {
        return (
            <ConsecutiveImages
                key={`consecutive-${currentIndex}`}
                images={images}
            />
        );
    }
    const { layout, siteProperties } = useAppContext();
    const { layoutsName } = siteProperties || {};

    const isPaywallLayout = [
        layoutsName?.FooditRecipePaywall,
        layoutsName?.FooditNotePaywall
    ].includes(layout);

    const classNameNotePaywall = isPaywallLayout ? 'difumination' : '';

    const isNote =
        articleSubtype === STORYTELLING || articleSubtype === NOTA_CERRADA;

    const cardEmbeddedIndex = element.subtype === 'custom-card-embebida';

    const shouldRenderTopDivider =
        cardEmbeddedIndex &&
        contentElements[currentIndex - 1]?.subtype !== 'custom-card-embebida';

    return isNote ? (
        <section
            key={`body-${currentIndex}`}
            className={`content ${classNameNotePaywall}`}
        >
            {shouldRenderTopDivider && <hr />}
            <Component
                data={element}
                capital={currentIndex === capitalIndex}
                outputType="foodit"
                {...(extraProps[type] || extraProps[subtype] || {})}
            />
            {cardEmbeddedIndex && <hr />}
        </section>
    ) : (
        <Component
            key={`body-${currentIndex}`}
            data={element}
            contentElements={contentElements}
            outputType="foodit"
            {...(extraProps[type] || extraProps[subtype] || {})}
        />
    );
};

const buildBody = ({ globalContent = {} }) => {
    const { layout } = useAppContext();
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

    const processedIndices = new Set();

    const bannersMap = Object.fromEntries(
        bannersElements.map(b => [b.position, b])
    );

    const contentElementsProcessed = contentElements.reduce(
        (acc, content, index) => {
            if (index in bannersMap) acc.push(bannersMap[index]);
            acc.push(content);
            return acc;
        },
        []
    );

    return contentElementsProcessed.map((element, currentIndex) => {
        if (processedIndices.has(currentIndex)) return null;
        if (!element) return null;

        if (
            element?.type === 'banner-element' &&
            element?.allowLayouts?.includes(layout)
        ) {
            const BannerComponent = BannersFoodit[element._id];
            if (!BannerComponent) return null;
            return (
                <section className="content">
                    <BannerComponent />
                </section>
            );
        }

        const { type, subtype } = element.subtype
            ? transformEmbedScript(element)
            : element;

        const capitalIndex = contentElementsProcessed.findIndex(
            el => el?.type === 'text'
        );

        if (type === 'image' && currentIndex < contentElements.length - 1) {
            const nextElement = contentElementsProcessed[currentIndex + 1];
            const nextElementProcessed = nextElement?.subtype
                ? transformEmbedScript(nextElement)
                : nextElement;
            const nextType = nextElementProcessed?.type;

            if (nextType === 'image') {
                processedIndices.add(currentIndex + 1);

                return setDataComponent({
                    Component: ConsecutiveImages,
                    extraProps,
                    element,
                    currentIndex,
                    capitalIndex,
                    type,
                    subtype,
                    articleSubtype,
                    hasConsecutiveImages: true,
                    images: [element, nextElement],
                    contentElements
                });
            }
        }

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
                  articleSubtype,
                  hasConsecutiveImages: false,
                  contentElements
              })
            : null;
    });
};

export default buildBody;
