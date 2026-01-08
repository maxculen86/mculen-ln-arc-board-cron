import { getDomainCLL } from '../../../../../../../../components/private/LN/api/common/elements/domain/index';

jest.mock('fusion:environment', () => ({
    CLL_HTMLFREE_DOMAIN: 'https://canchallena.lanacion.com.ar/especiales'
}));

describe('components - private - LN - api - common - elements - domain - index', () => {
    describe('getDomainCLL function test', () => {
        it('getDomainCLL should return correctly domain because subtype is CLLHTMLLIBRE', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                subtype: '15'
            };

            const result = getDomainCLL(element);
            expect(result).toContain(
                'https://canchallena.lanacion.com.ar/especiales'
            );
        });

        it('getDomainCLL should return correctly domain because templateId is CLLHTMLLIBRE', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                templateId: '15'
            };

            const result = getDomainCLL(element);
            expect(result).toContain(
                'https://canchallena.lanacion.com.ar/especiales'
            );
        });

        it('getDomainCLL should return null domain because templateId not is CLLHTMLLIBRE', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                templateId: '1'
            };

            const result = getDomainCLL(element);
            expect(result).toBeNull();
        });

        it('getDomainCLL should return null domain because subtype not is CLLHTMLLIBRE', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                subtype: '1'
            };

            const result = getDomainCLL(element);
            expect(result).toBeNull();
        });
    });
});
