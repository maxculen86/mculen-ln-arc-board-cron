import { getPaywallStatus } from '../../../../../../../../components/private/LN/api/common/elements/story/storyCommon';
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
});
