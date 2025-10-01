import {
    DEFAULT_CARD_COLOR,
    normalizeCardColor,
    createCardWithId,
    getCardRenderData,
    addAutoNumbering
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
        expect(result.embed.config.cardId).toBe('card-1');
        expect(result.embed.config.cardColor).toBe(DEFAULT_CARD_COLOR);
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

        expect(result.cardData.embed.config.cardId).toBe('card-3');
        expect(result.cardData.embed.config.cardNumber).toBe(3);
        expect(result.cardData.embed.config.buttonText).toBe('Ver más');
    });

    it('handles empty or invalid groups safely', () => {
        const result = getCardRenderData({}, 0);

        expect(result.cardData.embed.config.cardId).toBe('card-1');
        expect(result.contenido).toEqual([]);
    });
});

describe('linkedSummaryCardsHelper - addAutoNumbering', () => {
    it('adds numbering to cards without cardNumber', () => {
        const cards = [{ embed: { config: {} } }, { embed: { config: {} } }];

        const result = addAutoNumbering(cards);

        expect(result[0].embed.config.cardNumber).toBe(1);
        expect(result[1].embed.config.cardNumber).toBe(2);
    });

    it('preserves existing cardNumber values', () => {
        const cards = [
            { embed: { config: { cardNumber: 5 } } },
            { embed: { config: { cardNumber: 2 } } }
        ];

        const result = addAutoNumbering(cards);

        expect(result[0].embed.config.cardNumber).toBe(5);
        expect(result[1].embed.config.cardNumber).toBe(2);
    });

    it('handles empty array safely', () => {
        const result = addAutoNumbering([]);
        expect(result).toEqual([]);
    });

    it('handles cards with malformed embed structure', () => {
        const cards = [{ title: 'Card without embed' }];

        const result = addAutoNumbering(cards);

        expect(result[0].embed.config.cardNumber).toBe(1);
    });
});
