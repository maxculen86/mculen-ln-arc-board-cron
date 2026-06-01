import React, { useEffect, useRef, useMemo } from 'react';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import BaseBodyWrapper from '../body/_children/BaseBodyWrapper';
import { registerScrollTrigger } from '../../LN-common/hooks/useScrollDispatcher';
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
import ScrollToTopButton from '../../LN/common/scrollToTopButton/ScrollToTopButton';
import { scrollToGrid } from './_utils/bodyCardsHelper';
import { queueGoogletagCommand } from '../../../private/LN/common/utils/bannerHelper';

function BodyCards() {
    const { outputType, globalContent = {}, layout } = useAppContext();
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

    const registerScrollTracking = noteId =>
        registerScrollTrigger({
            id: 'scroll-body-GA',
            type: 'percentage',
            threshold: 25,
            thresholdStep: 25,
            callback: percent => scrollCallback(percent, noteId)
        });

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
                device,
                layout
            ),
        [cardGroups, globalContent, renderConfig, device, layout]
    );

    useEffect(() => {
        if (googleTagConfigs.length > 0) {
            queueGoogletagCommand(googleTagConfigs);
        }
    }, [googleTagConfigs]);

    const gridColumns = getGridColumns(cardsGrid.length);

    const gridCardSmall = cx(
        gridColumns === 3 && 'grid-col-3-15_lg',
        'grid-col-1 grid-row-2 mt-32'
    );

    return (
        <BaseBodyWrapper
            contentElements={contentElements}
            outputType={outputType}
            noteId={_id}
            onRegisterScrollTrigger={registerScrollTracking}
        >
            <div className="grid grid-cols-8 grid-cols-12_m grid-cols-16_lg">
                <BodyTop>
                    {leadingElements?.length > 0 &&
                        BuildBody({
                            outputType,
                            globalContent,
                            groupedElements: leadingElements,
                            supportedTypesOverride: supportedTypesCards
                        })}
                </BodyTop>
                <div className={gridCardSmall} ref={gridRef}>
                    {cardsGrid.length > 0 && (
                        <LinkedSummaryCardsGrid
                            cards={cardsGrid}
                            gridColumns={gridColumns}
                        />
                    )}
                </div>
                <ScrollToTopButton
                    template="cards"
                    onClick={() => scrollToGrid(gridRef)}
                />
                <div className="grid-col-1 grid-row-4 bg-muted h-1 max-w-550 w-100 ml-auto mr-auto mt-20 mb-80 grid-col-2-12_m max-w-635_m grid-col-5-13_lg" />
                <div className="grid-row-5 grid-col-1">
                    <div className="grid row-gap-80 row-gap-120_m">
                        {cardsWithBanners}
                    </div>
                </div>
            </div>
        </BaseBodyWrapper>
    );
}

BodyCards.label = 'LN-Body-Cards';

export default BodyCards;
