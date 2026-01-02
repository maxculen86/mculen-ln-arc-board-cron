import React from 'react';
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
        gridColumns === 4 && 'grid-cols-16_lg',
        gridColumns === 3 && 'grid-cols-12_lg',
        'grid grid-cols-8 row-gap-16 grid-cols-12_m gap-32_m'
    );

    return (
        <div data-testid="cards-grid" className={gridCardSmall}>
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
                    />
                );
            })}
        </div>
    );
}

export default LinkedSummaryCardsGrid;
