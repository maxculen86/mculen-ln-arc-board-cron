import paywall from '../../../../../content/sources/utils/paywall';
import Redirect from '../../../../../content/sources/utils/redirect';

const BASE_URL = 'https://www.lanacion.com.ar';
const PATH = '/politica/nota-de-prueba-nid20201028';
const PAYWALL_URL_CALLBACK =
    'https://ingresar.lanacion.com.ar/suscripcion/V/1/1/?callback={{callback}}';

const ARTICLE_COMUN = {
    content_restrictions: {
        content_code: 'comun'
    }
};

const ARTICLE_ABIERTA = {
    content_restrictions: {
        content_code: 'abierta'
    }
};

describe('Tests for paywall content source utils', () => {
    it('Test for checkPaywall - DISALLOW - Article comun', () => {
        let err;
        try {
            paywall.checkPaywall({
                queryData: {
                    paywallEnabled: '1',
                    meteringVariant: 'D',
                    paywallUrl: PAYWALL_URL_CALLBACK,
                    url: PATH
                },
                urlBase: BASE_URL,
                responseData: ARTICLE_COMUN
            });
        } catch (error) {
            err = error;
        }
        expect(err.location).not.toBeNull();
        expect(
            err.location.startsWith(
                'https://ingresar.lanacion.com.ar/suscripcion/V/1/1/?callback='
            )
        ).toBeTruthy();
        expect(err.statusCode).toBe(302);

        const regex = new RegExp('callback=(.*)');

        const regexResult = regex.exec(err.location);

        const callbackDecoded = Buffer.from(
            regexResult[1],
            'base64'
        ).toString();

        expect(callbackDecoded.startsWith(BASE_URL)).toBeTruthy();

        const uri = new URL(callbackDecoded);
        const r = uri.searchParams.get('R');
        expect(r.length).toBe(6);
    });

    it('Test for checkPaywall - DISALLOW - Article abierta', () => {
        let err;
        try {
            paywall.checkPaywall({
                queryData: {
                    paywallEnabled: '1',
                    meteringVariant: 'D',
                    paywallUrl: PAYWALL_URL_CALLBACK,
                    url: PATH
                },
                urlBase: BASE_URL,
                responseData: ARTICLE_ABIERTA
            });
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined();
    });

    it('Test for checkPaywall - ALLOW - Article comun', () => {
        let err;
        try {
            paywall.checkPaywall({
                queryData: {
                    paywallEnabled: '1',
                    meteringVariant: 'A',
                    paywallUrl: PAYWALL_URL_CALLBACK,
                    url: PATH
                },
                urlBase: BASE_URL,
                responseData: ARTICLE_COMUN
            });
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined();
    });

    it('Test for checkPaywall - DISALLOW - Paywall down', () => {
        let err;
        try {
            paywall.checkPaywall({
                queryData: {
                    paywallEnabled: '0',
                    meteringVariant: 'D',
                    paywallUrl: PAYWALL_URL_CALLBACK,
                    url: PATH
                },
                urlBase: BASE_URL,
                responseData: ARTICLE_COMUN
            });
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined();
    });
});
