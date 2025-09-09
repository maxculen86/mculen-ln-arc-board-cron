import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import useLazyEmbeds from '../../LN-common/hooks/useLazyEmbeds';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../LN-common/hooks/useScrollDispatcher';
import { groupByMarkers } from '../../../layouts/helpers/groupingUtils';
import buildBodyCustomFields from '../body/_utils/_buildBodyCustomFields';
import groupBannerConfig from '../body/_utils/_groupBannerConfig';
import LinkedSummaryCardsGrid from './components/LinkedSummaryCardsGrid';
import {
    getGridColumns,
    createCardWithId
} from './_utils/linkedSummaryCardsHelper';
import { renderExpandedCard, scrollCallback } from './_utils/cardRenderer';

function BodyCards({ customFields }) {
    const { outputType, globalContent = {} } = useAppContext();
    const { _id, content_elements: contentElements } = globalContent;

    const cardGroups = groupByMarkers(contentElements, 'custom-card', 'card');
    if (!cardGroups?.length) return null;

    const cardsGrid = cardGroups?.map(createCardWithId);
    const banners = groupBannerConfig(customFields);

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
        <div
            style={{
                border: '2px solid red',
                margin: '10px',
                padding: '10px',
                backgroundColor: '#f9f9f9'
            }}
        >
            {cardsGrid.length > 0 && (
                <LinkedSummaryCardsGrid
                    cards={cardsGrid}
                    gridColumns={getGridColumns(cardsGrid.length)}
                />
            )}
            {cardGroups.map((cardGroup, index) => (
                <React.Fragment key={cardGroup.id}>
                    {renderExpandedCard(
                        cardGroup,
                        index,
                        banners,
                        outputType,
                        globalContent
                    )}
                </React.Fragment>
            ))}
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
