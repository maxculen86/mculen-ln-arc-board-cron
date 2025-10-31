import {
    DEFAULT_CARD_COLOR,
    normalizeCardColor,
    createCardWithId,
    getCardRenderData,
    getNormalizedCardFields
} from 'features/LN-nota/bodyCards/_utils/linkedSummaryCardsHelper';

describe('linkedSummaryCardsHelper - normalizeCardColor', () => {
    it('returns the default color when value is empty or undefined', () => {
        expect(normalizeCardColor()).toBe(DEFAULT_CARD_COLOR);
        expect(normalizeCardColor('')).toBe(DEFAULT_CARD_COLOR);
        expect(normalizeCardColor('   ')).toBe(DEFAULT_CARD_COLOR);
    });

    it('accepts hex values without leading hash', () => {
        expect(normalizeCardColor('008561')).toBe('#008561');
        expect(normalizeCardColor('7267c3')).toBe('#7267c3');
    });

    it('keeps provided values as received when already prefixed', () => {
        expect(normalizeCardColor('#7267c3')).toBe('#7267c3');
        expect(normalizeCardColor('#0250C9')).toBe('#0250C9');
    });

    it('returns input when hex format is unexpected but not empty', () => {
        expect(normalizeCardColor('#abc')).toBe('#abc');
        expect(normalizeCardColor('invalid')).toBe('#invalid');
        expect(normalizeCardColor('#xyz')).toBe('#xyz');
    });
});

describe('linkedSummaryCardsHelper - createCardWithId', () => {
    it('creates card with generated ID when cardId is missing', () => {
        const cardGroup = {
            items: [
                {
                    embed: { config: { title: 'Test' } }
                }
            ]
        };

        const result = createCardWithId(cardGroup, 0);
        expect(result.embed.config.cardId).toBe('card-1');
    });

    it('preserves existing cardId when present', () => {
        const cardGroup = {
            items: [
                {
                    embed: { config: { cardId: 'custom-id', title: 'Test' } }
                }
            ]
        };

        const result = createCardWithId(cardGroup, 0);
        expect(result.embed.config.cardId).toBe('custom-id');
    });

    it('handles malformed data gracefully', () => {
        const result = createCardWithId(null, 0);
        expect(result).toEqual({});
    });

    it('normalizes cardColor in the result', () => {
        const cardGroup = {
            items: [
                {
                    embed: { config: { cardColor: '008561' } }
                }
            ]
        };

        const result = createCardWithId(cardGroup, 0);
        expect(result.embed.config.cardColor).toBe('#008561');
    });

    it('maps powerUp keys (cardNumber, title, description, buttonText) to normalized config', () => {
        const cardGroup = {
            items: [
                {
                    embed: {
                        config: {
                            cardNumber: 7,
                            useNumbering: true,
                            title: 'Título PowerUp',
                            description: 'Descripción PowerUp',
                            buttonText: 'Explorar',
                            cardColor: '#7267c3'
                        }
                    }
                }
            ]
        };

        const result = createCardWithId(cardGroup, 0);
        const { config } = result.embed;

        expect(config.cardNumber).toBe(7);
        expect(config.title).toBe('Título PowerUp');
        expect(config.description).toBe('Descripción PowerUp');
        expect(config.buttonText).toBe('Explorar');
        expect(config.cardColor).toBe('#7267c3');
    });
});

describe('linkedSummaryCardsHelper - getCardRenderData', () => {
    it('extracts card data and content correctly', () => {
        const group = {
            items: [
                {
                    embed: {
                        config: { title: 'Card Title', cardId: 'test-id' }
                    }
                },
                { type: 'text', content: 'Content 1' },
                { type: 'text', content: 'Content 2' }
            ]
        };

        const result = getCardRenderData(group, 0);

        expect(result.cardData.embed.config.title).toBe('Card Title');
        expect(result.cardData.embed.config.cardId).toBe('test-id');
        expect(result.contenido).toHaveLength(2);
        expect(result.cardId).toBe('test-id');
    });

    it('generates fallback values for missing data', () => {
        const group = { items: [{}] };

        const result = getCardRenderData(group, 2);

        expect(result.cardId).toBe('card-3');
        expect(result.cardData).toBeDefined();
    });
});

describe('linkedSummaryCardsHelper - getNormalizedCardFields', () => {
    it('returns null cardNumber when useNumbering is not enabled', () => {
        const embedConfig = { title: 'Test Card' };

        const result = getNormalizedCardFields(embedConfig, 2);

        expect(result.cardNumber).toBe(null);
        expect(result.title).toBe('Test Card');
    });

    it('returns automatic cardNumber when useNumbering is true but no cardNumber provided', () => {
        const embedConfig = { useNumbering: true, title: 'Test Card' };

        const result = getNormalizedCardFields(embedConfig, 2);

        expect(result.cardNumber).toBe(3); // fallbackIndex + 1
        expect(result.title).toBe('Test Card');
    });

    it('returns custom cardNumber when useNumbering is true and cardNumber provided', () => {
        const embedConfig = {
            useNumbering: true,
            cardNumber: 5,
            title: 'Test Card'
        };

        const result = getNormalizedCardFields(embedConfig, 2);

        expect(result.cardNumber).toBe(5);
        expect(result.title).toBe('Test Card');
    });

    it('returns cardId as cardNumber when useNumbering is true and only cardId provided', () => {
        const embedConfig = {
            useNumbering: true,
            id: 'custom-id',
            title: 'Test Card'
        };

        const result = getNormalizedCardFields(embedConfig, 2);

        expect(result.cardNumber).toBe('custom-id');
        expect(result.title).toBe('Test Card');
    });

    it('handles string "true" value for useNumbering', () => {
        const embedConfig = { useNumbering: 'true', title: 'Test Card' };

        const result = getNormalizedCardFields(embedConfig, 2);

        expect(result.cardNumber).toBe(3); // fallbackIndex + 1
        expect(result.title).toBe('Test Card');
    });
});
