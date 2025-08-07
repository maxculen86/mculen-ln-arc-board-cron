import { getVariantBarrier } from '../../../../../../components/features/foodit-global/common/emptyState/helpers';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://mocked-registro.com',
    FOODIT_LOGIN_URL: 'https://mocked-login.com/'
}));

describe('getVariantBarrier', () => {
    it('should return correct variant for logged userType', () => {
        const variant = getVariantBarrier('logged');
        expect(variant).toBe('barrier-logged');
    });

    it('should return correct variant for unlogged userType', () => {
        const variant = getVariantBarrier('unlogged');
        expect(variant).toBe('barrier-unlogged');
    });

    it('should return correct variant for subscribed userType', () => {
        const variant = getVariantBarrier('subscribed');
        expect(variant).toBe('empty-state');
    });

    it('should return undefined for unknown userType', () => {
        const variant = getVariantBarrier('unknown');
        expect(variant).toBeUndefined();
    });
});
