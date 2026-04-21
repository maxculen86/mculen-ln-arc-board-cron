import {
    getPaywallStatus,
    storyCommon
} from '../../../../../../../../components/private/LN/api/common/elements/story/storyCommon';

const baseNota = {
    _id: 'ABC123',
    subtype: '1',
    website_url: '/test',
    taxonomy: {
        primary_section: { name: 'Sociedad' }
    },
    comments: {},
    planning: { story_length: { word_count_actual: 200 } }
};

const cuerpoMock = [{ type: 'text', content: 'hola' }];
describe('storyCommon', () => {
    it('should return PaywallStatus "comun"', () => {
        const input = { content_restrictions: { content_code: 'comun' } };
        const paywallStatus = getPaywallStatus(input);
        expect(paywallStatus).toBe('comun');
    });

    it('should return PaywallStatus "abierta"', () => {
        const input = { content_restrictions: { content_code: 'abierta' } };
        const paywallStatus = getPaywallStatus(input);
        expect(paywallStatus).toBe('abierta');
    });

    it('should return PaywallStatus "cerrada"', () => {
        const input = { content_restrictions: { content_code: 'cerrada' } };
        const paywallStatus = getPaywallStatus(input);
        expect(paywallStatus).toBe('cerrada');
    });

    it('should return PaywallStatus "comun" because content_code not exist', () => {
        const input = { content_restrictions: {} };
        const paywallStatus = getPaywallStatus(input);
        expect(paywallStatus).toBe('comun');
    });

    it('should return template "1" for subtype "13"', () => {
        const input = {
            _id: 'id',
            subtype: '13',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result.template).toBe('1');
    });

    it('should return template "1" for subtype "6"', () => {
        const input = {
            _id: 'id',
            subtype: '6',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result.template).toBe('1');
    });
    it('should return template unchanged for other subtypes', () => {
        const input = {
            _id: 'id',
            subtype: '7',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result.template).toBe('7');
    });

    it('should return template undefined if subtype is missing', () => {
        const input = {
            _id: 'id',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result.template).toBeUndefined();
    });
    it('should return template as is for unknown subtype', () => {
        const input = {
            _id: 'id',
            subtype: 'unknown',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result.template).toBe('unknown');
    });

    it('should always return an object with id and template', () => {
        const input = {
            _id: 'id',
            subtype: '13',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('template');
    });

    it('should always return an object with id and template', () => {
        const input = {
            _id: 'id',
            subtype: '12',
            website_url: 'url',
            taxonomy: { primary_section: {} }
        };
        const result = storyCommon(input, []);
        expect(result).toHaveProperty('id');
        expect(result.template).toBe('5');
    });

    it('When the note contains a table, sendToApps and openingMode should follow Composer configuration', () => {
        const notaConTabla = {
            ...baseNota,
            content_elements: [
                { type: 'text', content: 'x' },
                { type: 'table', header: [], rows: [] }
            ]
        };

        const resp = storyCommon(notaConTabla, cuerpoMock);

        expect(resp.enviarApps).toBe(true);
        expect(resp.openingMode).toBe('Native');
    });

    it('should not return content when subtype is 16', () => {
        const notaSubtype16 = {
            _id: 'TEST123',
            subtype: '16',
            website_url: '/video/test',
            taxonomy: { primary_section: { name: 'Videos' } },
            content_elements: [
                {
                    type: 'text',
                    content: 'This content should not appear in the result'
                }
            ],
            promo_items: {
                video_jw: {
                    embed: {
                        config: {
                            idPlayer: 'player123',
                            idVideo: 'video123'
                        }
                    }
                }
            }
        };

        const result = storyCommon(notaSubtype16, [
            { type: 'text', content: 'body content' }
        ]);
        expect(result.contenido).toBeUndefined();
        expect(result.HTML).toBeUndefined();
    });
});
