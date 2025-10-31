import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import get from '../../../../private/common/utils/get';
import {
    generateCardId,
    getNormalizedCardFields
} from '../_utils/linkedSummaryCardsHelper';
import LinkedSummaryCardSmall from './LinkedSummaryCardSmall';
import { scrollToCard } from '../_utils/bodyCardsHelper';

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

    const gridCardSmall = cx(
        gridColumns === 4 && 'grid-col-3_min1023',
        gridColumns === 3 && 'grid-col-4_min1023'
    );

    return (
        <div
            data-testid="cards-grid"
            className="grid grid-cols-8 grid-cols-12_m mt-80 mb-40 row-gap-16 row-gap-24_m mb-120_m gap-32_lg w-968_lg mr-auto_lg ml-auto_lg"
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
                        data-testid="card-small"
                        onCardClick={() => scrollToCard(cardId)}
                        variant="collapsed"
                        className={gridCardSmall}
                    />
                );
            })}
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
