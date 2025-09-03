import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../../private/common/utils/get';
import LinkedSummaryCardSmall from './LinkedSummaryCardSmall';

const scrollToCard = cardId => {
    document.getElementById(`card-ampliada-${cardId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
};

const createCardWithDefaults = (card, index) => {
    const cardId = get(card, 'embed.config.cardId', `card-${index + 1}`);
    return {
        ...card,
        embed: {
            ...card.embed,
            config: {
                ...get(card, 'embed.config', {}),
                numero: get(card, 'embed.config.numero', index + 1),
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
                {cards.map((card, index) => (
                    <LinkedSummaryCardSmall
                        key={get(
                            card,
                            'embed.config.cardId',
                            `card-${index + 1}`
                        )}
                        data={createCardWithDefaults(card, index)}
                        onCardClick={scrollToCard}
                    />
                ))}
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
                    numero: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number
                    ]),
                    titulo: PropTypes.string,
                    texto: PropTypes.string,
                    botonTexto: PropTypes.string,
                    cardId: PropTypes.string
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
