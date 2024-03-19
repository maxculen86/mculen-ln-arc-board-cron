import {
    getNavbarItems,
    getEventData
} from '../../../../../../components/features/LN-10-global/header/navBar/_helper';

jest.mock('fusion:environment', () => {
    return {
        API_ENV: 'prod',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
        MY_ACCOUNT_URL: 'https://myaccount.lanacion.com.ar'
    };
});

describe('components - features - LN-10-global - header - navbar', () => {
    it('should have Navbar Items', () => {
        expect(getNavbarItems(true, true, true)).toHaveLength(5);
    });
    it('should redirect to home', () => {
        expect(getNavbarItems(false, true, true)[0].link).toStrictEqual(
            'https://www.lanacion.com.ar/'
        );
    });
    it('should not have bookmark item', () => {
        expect(getNavbarItems(false, true, true)[3]).toStrictEqual(false);
    });
    it('should redirect to mis notas', () => {
        expect(getNavbarItems(true, true, true)[3].link).toStrictEqual(
            'https://www.lanacion.com.ar/mis-notas/'
        );
    });
    it('should redirect to Club La Nacion', () => {
        expect(getNavbarItems(true, false, true)[3].link).toStrictEqual(
            'https://club.lanacion.com.ar/'
        );
    });
    it('should test getEventData', () => {
        expect(getEventData('buscar')).toStrictEqual({
            event: 'e_linkclick',
            action: 'navbar',
            category: 'home_ln10',
            label: 'buscar'
        });
    });
});
