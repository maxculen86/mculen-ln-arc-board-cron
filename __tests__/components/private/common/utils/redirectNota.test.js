import redirectNota from '../../../../../components/private/common/utils/redirectNota';

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});
describe('Components - Private - Common - Utils - redirectNota', () => {
    it('should return link to redirect', () => {
        const urlToRedirect = redirectNota({
            redirect: true,
            requestUri: '/nota.asp?nota_id=123123%2F&_website=la-nacion-ar'
        });

        expect(urlToRedirect).toBe('https://www.lanacion.com.ar/123123');
    });
    it('should return a empty', () => {
        const urlToRedirect = redirectNota({
            redirect: false,
            requestUri: '/nota.asp?nota_id=2304999%2F&_website=la-nacion-ar'
        });

        expect(urlToRedirect).toBe('');
    });
    it('should return empty because redirect is undefined', () => {
        const urlToRedirect = redirectNota({
            requestUri: '/nota.asp?nota_id=2304999%2F&_website=la-nacion-ar'
        });

        expect(urlToRedirect).toBe('');
    });
    it('should return SITE_LANACION because requestUri is undefined', () => {
        const urlToRedirect = redirectNota({
            redirect: true
        });

        expect(urlToRedirect).toBe('https://www.lanacion.com.ar/');
    });
});
