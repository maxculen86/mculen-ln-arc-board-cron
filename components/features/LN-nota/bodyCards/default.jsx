import React, { useEffect, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import useLazyEmbeds from '../../LN-common/hooks/useLazyEmbeds';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../LN-common/hooks/useScrollDispatcher';
import {
    groupByMarkers,
    getContentBeforeMarkers
} from '../../../layouts/helpers/groupingUtils';
import buildBodyCustomFields from '../body/_utils/_buildBodyCustomFields';
import groupBannerConfig from '../body/_utils/_groupBannerConfig';
import BuildBody from '../body/_children/_buildBody';
import LinkedSummaryCardsGrid from './components/LinkedSummaryCardsGrid';
import {
    getGridColumns,
    createCardWithId,
    supportedTypesCards
} from './_utils/linkedSummaryCardsHelper';
import { renderExpandedCard, scrollCallback } from './_utils/cardRenderer';
import BodyTop from './components/BodyTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { scrollToGrid } from './_utils/bodyCardsHelper';

function BodyCards({ customFields }) {
    const { outputType, globalContent = {} } = useAppContext();
    const { _id, content_elements: contentElements } = globalContent;
    const gridRef = useRef(null);

    const cardGroups = groupByMarkers(contentElements, 'custom-card', 'card');
    if (!cardGroups?.length) return null;

    const cardsGrid = cardGroups?.map(createCardWithId);
    const banners = groupBannerConfig(customFields);
    const leadingElements = getContentBeforeMarkers(
        contentElements,
        'custom-card'
    );

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

    return (
        <div className="mb-120 grid grid-cols-8 grid-cols-12_m grid-cols-16_lg">
            <BodyTop>
                {leadingElements?.length > 0 &&
                    BuildBody({
                        banners,
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
            <div className="grid row-gap-80 grid-row-4 grid-col-1 row-gap-120_m grid-col-2-12_m grid-col-3-11_min1023 grid-col-4-10_md grid-col-5-13_lg">
                {cardGroups.map((cardGroup, index) => (
                    <React.Fragment key={cardGroup.id}>
                        {renderExpandedCard(
                            cardGroup,
                            index,
                            banners,
                            outputType,
                            globalContent,
                            'expanded'
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

BodyCards.label = 'LN-Body-Cards';

BodyCards.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

BodyCards.defaultProps = {
    customFields: {}
};

export default BodyCards;
