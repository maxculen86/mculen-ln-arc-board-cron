import {
    buttonPropsByVariant,
    getVariantBarrier
} from '../../../../../../components/features/foodit-global/common/emptyState/helpers';
import {
    SITIO_SEGURO_REGISTRACION,
    FOODIT_LOGIN_URL
} from 'fusion:environment';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://mocked-registro.com',
    FOODIT_LOGIN_URL: 'https://mocked-login.com/'
}));

describe('buttonPropsByVariant', () => {
    it('should return the correct button props for barrier-logged variant', () => {
        const variant = 'barrier-logged';

        const buttonProps = buttonPropsByVariant[variant];

        expect(buttonProps.label).toBe('Suscribite');
        expect(buttonProps.variant).toBe('accent');
        expect(buttonProps.href).toContain(SITIO_SEGURO_REGISTRACION);
    });

    it('should return the correct button props for barrier-unlogged variant', () => {
        const variant = 'barrier-unlogged';

        const buttonProps = buttonPropsByVariant[variant];

        expect(buttonProps.label).toBe('Iniciá sesión');
        expect(buttonProps.variant).toBe('link');
        expect(buttonProps.href).toContain(FOODIT_LOGIN_URL);
    });

    it('should return the correct button props for empty-state variant', () => {
        const variant = 'empty-state';

        const buttonProps = buttonPropsByVariant[variant];

        expect(buttonProps.label).toBe(false);
        expect(buttonProps.variant).toBeUndefined();
        expect(buttonProps.href).toBeUndefined();
    });
});

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
