import get from '../../../../private/common/utils/get';

export const DEFAULT_CARD_COLOR = '#333333';

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

const ensureEmbedConfig = cardData => {
    if (!cardData || typeof cardData !== 'object') return {};

    const embed = get(cardData, 'embed', {});
    const config = get(embed, 'config', {});

    return config;
};

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
    const useNumbering = get(embedConfig, 'useNumbering');
    const cardNumber = get(embedConfig, 'cardNumber');
    const cardId = get(embedConfig, 'id');

    const isNumberingEnabled = useNumbering === true || useNumbering === 'true';
    const hasValidCardNumber = cardNumber && String(cardNumber).trim() !== '';
    const hasValidCardId = cardId && String(cardId).trim() !== '';

    let resolvedCardNumber = defaultNumber;
    if (isNumberingEnabled && hasValidCardNumber) {
        resolvedCardNumber = cardNumber;
    } else if (isNumberingEnabled && hasValidCardId) {
        resolvedCardNumber = cardId;
    }

    return {
        cardNumber: resolvedCardNumber,
        title: get(embedConfig, 'title', ''),
        description: get(embedConfig, 'description', ''),
        buttonText: get(embedConfig, 'buttonText', 'Ver más'),
        useNumbering,
        cardColor: normalizeCardColor(get(embedConfig, 'cardColor'))
    };
};

export const createCardWithId = (cardGroup, index) => {
    const cardData = get(cardGroup, 'items[0]', {});
    const cardId = generateCardId(cardData, index);
    const originalConfig = getEmbedConfig(cardData);
    const normalizedFields = getNormalizedCardFields(originalConfig, index);
    const configToUpdate = ensureEmbedConfig(cardData);

    if (configToUpdate) {
        Object.assign(configToUpdate, originalConfig, normalizedFields, {
            cardId
        });
    }

    return cardData;
};

export const getCardRenderData = (group, cardIndex) => {
    const cardContent = get(group, 'items', []).slice(1);
    const normalizedCard = createCardWithId(group, cardIndex);
    const cardId = get(
        normalizedCard,
        'embed.config.cardId',
        `card-${cardIndex + 1}`
    );

    normalizedCard.cardIndex = cardIndex;
    normalizedCard.cardId = cardId;

    return {
        cardData: normalizedCard,
        contenido: cardContent,
        cardId
    };
};

export const getGridColumns = totalCards => {
    if (totalCards <= 0) return 3;
    if (totalCards % 4 === 0) return 4;
    if (totalCards % 3 === 1) return 4;
    if (totalCards % 4 === 1) return 3;
    if (totalCards % 3 === 0) return 3;
    return 4;
};

export const addAutoNumbering = (cards = []) =>
    cards.map((card, index) => {
        const embedConfig = getEmbedConfig(card);
        const useNumbering = get(embedConfig, 'useNumbering', undefined);
        const cardNumber = get(embedConfig, 'cardNumber', null);

        const isNumberingEnabled =
            useNumbering === true || useNumbering === 'true';
        const hasValidCardNumber =
            cardNumber && String(cardNumber).trim() !== '';

        if (isNumberingEnabled && hasValidCardNumber) {
            return mergeEmbedConfig(card, { cardNumber });
        }

        return mergeEmbedConfig(card, { cardNumber: index + 1 });
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
