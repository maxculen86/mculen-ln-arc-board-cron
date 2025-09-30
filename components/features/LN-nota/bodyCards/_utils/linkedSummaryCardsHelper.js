import get from '../../../../private/common/utils/get';

export const DEFAULT_CARD_COLOR = '#0250C9';

const getEmbedConfig = cardData => get(cardData, 'embed.config', {});

const mergeEmbedConfig = (cardData, overrides) => ({
    ...cardData,
    embed: {
        ...(cardData?.embed || {}),
        config: {
            ...getEmbedConfig(cardData),
            ...overrides
        }
    }
});

export const normalizeCardColor = color => {
    if (!color && color !== 0) return DEFAULT_CARD_COLOR;

    const rawValue = `${color}`.trim();
    if (!rawValue) return DEFAULT_CARD_COLOR;

    return rawValue.startsWith('#') ? rawValue : `#${rawValue}`;
};

export const generateCardId = (cardData, index) => {
    const embedConfig = getEmbedConfig(cardData);
    return embedConfig.cardId || embedConfig.id || `card-${index + 1}`;
};

export const getNormalizedCardFields = (
    embedConfig = {},
    fallbackIndex = 0
) => {
    const defaultNumber = fallbackIndex + 1;

    return {
        cardNumber: get(
            embedConfig,
            'cardNumber',
            get(embedConfig, 'id', defaultNumber)
        ),
        title: get(embedConfig, 'title', ''),
        description: get(embedConfig, 'description', ''),
        buttonText: get(embedConfig, 'buttonText', 'Ver más'),
        useNumbering: get(embedConfig, 'useNumbering'),
        cardColor: normalizeCardColor(get(embedConfig, 'cardColor'))
    };
};

export const createCardWithId = (cardGroup, index) => {
    const cardData = get(cardGroup, 'items[0]', {});
    const cardId = generateCardId(cardData, index);
    const embedConfig = getEmbedConfig(cardData);
    const normalizedFields = getNormalizedCardFields(embedConfig, index);

    return mergeEmbedConfig(cardData, {
        ...normalizedFields,
        cardId
    });
};

export const getCardRenderData = (group, cardIndex) => {
    const cardElement = get(group, 'items[0]', {});
    const cardContent = get(group, 'items', []).slice(1);
    const embedConfig = getEmbedConfig(cardElement);
    const cardId = generateCardId(cardElement, cardIndex);
    const normalizedFields = getNormalizedCardFields(embedConfig, cardIndex);

    const cardData = {
        ...mergeEmbedConfig(cardElement, {
            ...normalizedFields,
            cardId
        }),
        cardIndex,
        cardId
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

export const addAutoNumbering = (cards = []) =>
    cards.map((card, index) => {
        const embedConfig = getEmbedConfig(card);
        const cardNumber = get(embedConfig, 'cardNumber');

        if (cardNumber) {
            return mergeEmbedConfig(card, {
                cardNumber
            });
        }

        return mergeEmbedConfig(card, {
            cardNumber: index + 1
        });
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
