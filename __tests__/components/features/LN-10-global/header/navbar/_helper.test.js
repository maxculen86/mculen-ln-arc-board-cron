import {
    getNavbarItems,
    getEventData
} from '../../../../../../components/features/LN-10-global/header/navBar/_helper';
import { useHeaderContext } from '../../../../../../components/features/LN-10-global/header/context';

jest.mock('fusion:environment', () => {
    return {
        API_ENV: 'prod',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
        MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar'
    };
});
jest.mock(
    '../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);

describe('components - features - LN-10-global - header - navbar', () => {
    useHeaderContext.mockImplementation(() => ({
        toggleDesplegable: jest.fn()
    }));

    it('should have Navbar Items', () => {
        expect(getNavbarItems()).toHaveLength(5);
    });
    it('should redirect to home', () => {
        expect(getNavbarItems()[0].link).toStrictEqual(
            'https://www.lanacion.com.ar/'
        );
    });
    it('should redirect to foodit website', () => {
        expect(getNavbarItems()[2].link).toStrictEqual(
            'https://foodit.lanacion.com.ar/'
        );
    });
    it('should redirect to Club La Nacion', () => {
        expect(getNavbarItems()[3].link).toStrictEqual(
            'https://club.lanacion.com.ar/'
        );
    });
    it('should redirect to myaccount', () => {
        expect(getNavbarItems()[4].link).toStrictEqual(
            'https://micuenta.lanacion.com.ar/'
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
