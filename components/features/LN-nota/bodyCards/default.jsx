import React, { useEffect, useRef, useMemo } from 'react';
import { useAppContext } from 'fusion:context';
import useLazyEmbeds from '../../LN-common/hooks/useLazyEmbeds';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../LN-common/hooks/useScrollDispatcher';
import {
    groupByMarkers,
    getContentBeforeMarkers
} from '../../../layouts/helpers/groupingUtils';
import BuildBody from '../body/_children/_buildBody';
import LinkedSummaryCardsGrid from './components/LinkedSummaryCardsGrid';
import {
    getGridColumns,
    createCardWithId,
    supportedTypesCards
} from './_utils/linkedSummaryCardsHelper';
import { renderExpandedCard, scrollCallback } from './_utils/cardRenderer';
import {
    insertBannersIntoCards,
    createRenderConfig
} from './utils/bannerInsertion';
import BodyTop from './components/BodyTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { scrollToGrid } from './_utils/bodyCardsHelper';
import { queueGoogletagCommand } from '../../../private/LN/common/utils/bannerHelper';

function BodyCards() {
    const { outputType, globalContent = {} } = useAppContext();
    const { _id, content_elements: contentElements } = globalContent;
    const gridRef = useRef(null);
    const device = useViewportSize();

    const cardGroups = groupByMarkers(contentElements, 'custom-card', 'card');
    if (!cardGroups?.length) return null;

    const cardsGrid = cardGroups?.map(createCardWithId);
    const rawLeadingElements = getContentBeforeMarkers(
        contentElements,
        'custom-card'
    );

    const processElementsWithImageProps = elements => {
        if (!elements?.length) return elements;

        const firstElementIndex = 0;
        const lastElementIndex = elements.length - 1;

        return elements.map((element, index) => {
            if (element.type !== 'image') return element;

            return {
                ...element,
                ...(index === firstElementIndex && { isFirstImage: true }),
                ...(index === lastElementIndex && { isLastImage: true })
            };
        });
    };

    const leadingElements = processElementsWithImageProps(rawLeadingElements);

    useLazyEmbeds({
        contentElements,
        outputType,
        bodyOrigin: 'Body default',
        noteId: _id,
        selector: 'cuerpo__nota'
    });

    useScrollDispatcher({ startSelector: 'h1', endSelector: '#fin-de-nota' });

    useEffect(
        () =>
            registerScrollTrigger({
                id: 'scroll-body-GA',
                type: 'percentage',
                threshold: 10,
                thresholdStep: 10,
                callback: scrollCallback
            }),
        []
    );

    const renderConfig = useMemo(
        () => createRenderConfig(renderExpandedCard, outputType),
        [outputType]
    );

    const { elements: cardsWithBanners, googleTagConfigs } = useMemo(
        () =>
            insertBannersIntoCards(
                cardGroups,
                globalContent,
                renderConfig,
                device
            ),
        [cardGroups, globalContent, renderConfig, device]
    );

    useEffect(() => {
        if (googleTagConfigs.length > 0) {
            queueGoogletagCommand(googleTagConfigs);
        }
    }, [googleTagConfigs]);

    return (
        <div className="mb-120 grid grid-cols-8 grid-cols-12_m grid-cols-16_lg">
            <BodyTop>
                {leadingElements?.length > 0 &&
                    BuildBody({
                        outputType,
                        globalContent,
                        groupedElements: leadingElements,
                        supportedTypesOverride: supportedTypesCards
                    })}
            </BodyTop>
            <div
                ref={gridRef}
                className="pt-8 grid grid-col-1 grid-row-2 grid-col-3-15_lg"
            >
                {cardsGrid.length > 0 && (
                    <LinkedSummaryCardsGrid
                        cards={cardsGrid}
                        gridColumns={getGridColumns(cardsGrid.length)}
                    />
                )}
            </div>
            <ScrollToTopButton onClick={() => scrollToGrid(gridRef)} />
            <span className="block grid-row-4 grid-col-1 h-1 bg-muted w-100 mb-80 grid-col-3-11_m grid-col-5-13_lg" />
            <div className="grid-row-5 grid-col-1">
                <div className="grid grid-cols-8 row-gap-80 grid-cols-12_m row-gap-120_m grid-cols-16_lg">
                    {cardsWithBanners}
                </div>
            </div>
        </div>
    );
}

BodyCards.label = 'LN-Body-Cards';

export default BodyCards;
