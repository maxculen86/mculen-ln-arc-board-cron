import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';
import {
    generateCardId,
    getNormalizedCardFields
} from '../_utils/linkedSummaryCardsHelper';
import LinkedSummaryCardSmall from './LinkedSummaryCardSmall';

const scrollToCard = cardId => {
    if (!cardId) return;
    document.getElementById(`card-ampliada-${cardId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
};

const createCardWithDefaults = (card, index) => {
    const cardConfig = get(card, 'embed.config', {});
    const cardId = generateCardId(card, index);
    const normalizedFields = getNormalizedCardFields(cardConfig, index);
    return {
        ...card,
        embed: {
            ...(card.embed || {}),
            config: {
                ...cardConfig,
                ...normalizedFields,
                cardId
            }
        }
    };
};

function LinkedSummaryCardsGrid({ cards = [], gridColumns }) {
    if (!cards.length) return null;

    return (
        <div
            className="linked-summary-cards-grid-container"
            style={{ margin: '2rem 0' }}
        >
            <div
                className="cards-grid"
                style={{
                    display: 'grid',
                    gap: '1.25rem',
                    marginBottom: '2.5rem',
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
                }}
            >
                {cards.map((card, index) => {
                    const normalizedCard = createCardWithDefaults(card, index);
                    const cardId = get(
                        normalizedCard,
                        'embed.config.cardId',
                        `card-${index + 1}`
                    );

                    return (
                        <LinkedSummaryCardSmall
                            key={cardId}
                            data={normalizedCard}
                            onCardClick={scrollToCard}
                        />
                    );
                })}
            </div>
        </div>
    );
}

LinkedSummaryCardsGrid.arcType = 'custom-cards-grid';
LinkedSummaryCardsGrid.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            embed: PropTypes.shape({
                config: PropTypes.shape({
                    cardNumber: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number
                    ]),
                    title: PropTypes.string,
                    description: PropTypes.string,
                    buttonText: PropTypes.string,
                    cardId: PropTypes.string,
                    cardColor: PropTypes.string
                })
            })
        })
    ),
    gridColumns: PropTypes.number.isRequired
};

LinkedSummaryCardsGrid.defaultProps = {
    cards: []
};

export default LinkedSummaryCardsGrid;
