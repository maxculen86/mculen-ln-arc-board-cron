import { getPaywallStatus, storyCommon } from '../../../../../../../../components/private/LN/api/common/elements/story/storyCommon';

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
        const input = { _id: 'id', subtype: '13', website_url: 'url', taxonomy: { primary_section: {} } };
        const result = storyCommon(input, []);
        expect(result.template).toBe('1');
    });

    it('should return template unchanged for other subtypes', () => {
        const input = { _id: 'id', subtype: '7', website_url: 'url', taxonomy: { primary_section: {} } };
        const result = storyCommon(input, []);
        expect(result.template).toBe('7');
    });

    it('should return template undefined if subtype is missing', () => {
        const input = { _id: 'id', website_url: 'url', taxonomy: { primary_section: {} } };
        const result = storyCommon(input, []);
        expect(result.template).toBeUndefined();
    });
    it('should return template as is for unknown subtype', () => {
        const input = { _id: 'id', subtype: 'unknown', website_url: 'url', taxonomy: { primary_section: {} } };
        const result = storyCommon(input, []);
        expect(result.template).toBe('unknown');
    });

    it('should always return an object with id and template', () => {
        const input = { _id: 'id', subtype: '13', website_url: 'url', taxonomy: { primary_section: {} } };
        const result = storyCommon(input, []);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('template');
    });

    it('If the note contains a table, send Apps should be false and openingMode NativeBrowser', () => {
        const notaConTabla = {
            ...baseNota,
            content_elements: [
                { type: 'text', content: 'x' },
                { type: 'table', header: [], rows: [] }
            ]
        };

        const resp = storyCommon(notaConTabla, cuerpoMock);

        expect(resp.enviarApps).toBe(false);
        expect(resp.openingMode).toBe('NativeBrowser');
    });
});
