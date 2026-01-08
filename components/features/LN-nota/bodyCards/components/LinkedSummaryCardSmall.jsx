import React, { memo } from 'react';
import get from '../../../../private/common/utils/get';
import { normalizeCardColor } from '../_utils/linkedSummaryCardsHelper';
import LinkedCard from './linkedCard/LinkedCard';

const LinkedSummaryCardSmall = memo(({ data, onCardClick, variant, ...r }) => {
    const cardNumber = get(data, 'embed.config.cardNumber', '');
    const title = get(data, 'embed.config.title', '');
    const description = get(data, 'embed.config.description', '');
    const buttonText = get(data, 'embed.config.buttonText', 'Ver más');

    const cardId = get(data, 'embed.config.cardId', '');
    const cardColor = normalizeCardColor(get(data, 'embed.config.cardColor'));

    return (
        <LinkedCard variant={variant} cardColor={cardColor} {...r}>
            <LinkedCard.Container>
                <LinkedCard.Heading title={title} number={cardNumber} />
                {description && (
                    <LinkedCard.Description>
                        {description}
                    </LinkedCard.Description>
                )}

                <LinkedCard.Button
                    onClick={() => cardId && onCardClick?.(cardId)}
                    buttonText={buttonText}
                />
            </LinkedCard.Container>
        </LinkedCard>
    );
});
export default LinkedSummaryCardSmall;
