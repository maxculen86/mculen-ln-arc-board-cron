import {
    SITIO_SEGURO_REGISTRACION,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';

import {
    getEventData,
    getNavbarItems
} from '../../../../../components/private/LN10/navbar/_helper';

describe('Components - Private - LN10 - Helper', () => {
    it('should have Navbar Items', () => {
        expect(getNavbarItems(true, true, true)).toHaveLength(5);
    });
    it('should redirect to home', () => {
        expect(getNavbarItems(false, true, true)[0].link).toStrictEqual(
            'https://www.lanacion.com.ar/'
        );
    });
    it('should not have bookmark item', () => {
        expect(getNavbarItems(true, false, true)[3]).toStrictEqual(false);
    });
    it('should redirect to mis notas', () => {
        expect(getNavbarItems(true, true, true)[3].link).toStrictEqual(
            'https://www.lanacion.com.ar/mis-notas/'
        );
    });
    it('should redirect to Club La Nacion', () => {
        expect(getNavbarItems(true, true, false)[3].link).toStrictEqual(
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
