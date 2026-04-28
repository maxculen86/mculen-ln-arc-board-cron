import React from 'react';
import get from '../../../../private/common/utils/get';
import BuildBody from '../../body/_children/_buildBody';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import LinkedCard from '../components/linkedCard/LinkedCard';
import { normalizeCardColor } from './linkedSummaryCardsHelper';

export const renderExpandedCard = (
    cardGroup,
    index,
    outputType,
    globalContent,
    variant
) => {
    const firstCard = cardGroup.items[0];
    const cardId =
        get(firstCard, 'embed.config.cardId') ||
        get(firstCard, 'embed.config.id') ||
        `card-${index + 1}`;

    const titleCard = get(firstCard, 'embed.config.title', '');
    const cardColor = normalizeCardColor(
        get(firstCard, 'embed.config.cardColor')
    );
    const cardNumber = get(firstCard, 'embed.config.cardNumber', '');

    return (
        <div
            key={cardId}
            id={`card-ampliada-${cardId}`}
            className="flex flex-column gap-16 ai-center max-w-550 max-w-596_md gap-24_m max-w-635_l max-w-592_lg max-w-635_xl"
        >
            <LinkedCard
                variant={variant}
                cardColor={cardColor}
                className="w-100"
            >
                <LinkedCard.Container>
                    <LinkedCard.Heading title={titleCard} number={cardNumber} />
                    <LinkedCard.Content>
                        {BuildBody({
                            outputType,
                            globalContent,
                            groupedElements: cardGroup.items,
                            useCapitalIndex: false
                        })}
                    </LinkedCard.Content>
                </LinkedCard.Container>
            </LinkedCard>
        </div>
    );
};

export const scrollCallback = percent =>
    addEventToDataLayerV2({
        event: 'scroll_tracking_nota',
        rest: {
            scroll_percent: percent,
            content_type: 'nota'
        }
    });
