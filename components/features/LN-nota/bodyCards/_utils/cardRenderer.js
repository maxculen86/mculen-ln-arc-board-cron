import React from 'react';
import get from '../../../../private/common/utils/get';
import BuildBody from '../../body/_children/_buildBody';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

export const renderExpandedCard = (
    cardGroup,
    index,
    banners,
    outputType,
    globalContent
) => {
    const firstCard = cardGroup.items[0];
    const cardId =
        get(firstCard, 'embed.config.cardId') ||
        get(firstCard, 'embed.config.id') ||
        `card-${index + 1}`;

    return (
        <div key={cardId} id={`card-ampliada-${cardId}`}>
            <p>{get(firstCard, 'embed.config.title', 'Card')}</p>
            {BuildBody({
                banners,
                outputType,
                globalContent,
                groupedElements: cardGroup.items
            })}
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
