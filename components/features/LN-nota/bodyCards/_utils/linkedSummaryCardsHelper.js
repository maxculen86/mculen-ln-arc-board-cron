import get from '../../../../private/common/utils/get';

export const createCardWithId = (cardGroup, index) => {
    const cardData = cardGroup.items[0];
    const cardId =
        get(cardData, 'embed.config.cardId') ||
        get(cardData, 'embed.config.id') ||
        `card-${index + 1}`;
    return {
        ...cardData,
        embed: {
            ...cardData.embed,
            config: { ...get(cardData, 'embed.config', {}), cardId }
        }
    };
};

export const getCardRenderData = (group, cardIndex) => {
    const cardElement = get(group, 'items[0]', {});
    const cardContent = get(group, 'items', []).slice(1);
    const embedConfig = get(cardElement, 'embed.config', {});
    const cardId =
        embedConfig.cardId || embedConfig.id || `card-${cardIndex + 1}`;

    const cardData = {
        ...cardElement,
        cardIndex,
        cardId,
        embed: {
            ...cardElement.embed,
            config: {
                ...embedConfig,
                cardId,
                numero: embedConfig.numero || embedConfig.id || cardIndex + 1,
                titulo: embedConfig.titulo || embedConfig.title,
                texto: embedConfig.texto,
                botonTexto: get(
                    cardElement,
                    'embed.config.botonTexto',
                    'Ver más'
                )
            }
        }
    };

    return {
        cardData,
        contenido: cardContent,
        cardId
    };
};

export const getGridColumns = totalCards => {
    if (totalCards <= 6) return 3;
    if (totalCards <= 8) return 4;
    if (totalCards <= 10) return 5;
    return 4; // Por defecto para más de 10 cards
};

export const generateCardId = (cardData, index) =>
    get(cardData, 'embed.config.cardId', `card-${index + 1}`);

export const addAutoNumbering = (cards = []) =>
    cards.map((card, index) => {
        if (!get(card, 'embed.config.numero')) {
            return {
                ...card,
                embed: {
                    ...card.embed,
                    config: {
                        ...get(card, 'embed.config', {}),
                        numero: index + 1
                    }
                }
            };
        }
        return card;
    });

export const supportedTypesCards = [
    'text',
    'image',
    'video',
    'oembed_response',
    'raw_html',
    'blockquote',
    'interstitial_link',
    'list',
    'header'
];
