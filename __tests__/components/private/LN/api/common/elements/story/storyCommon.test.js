import { getPaywallStatus, storyCommon } from '../../../../../../../../components/private/LN/api/common/elements/story/storyCommon';
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
});
