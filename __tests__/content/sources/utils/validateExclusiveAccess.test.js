import validateExclusiveAccess from '../../../../content/sources/utils/validateExclusiveAccess';
import Redirect from '../../../../content/sources/utils/redirect';
import { SITE_LANACION } from 'fusion:environment';

const BASE_URL = 'https://www.lanacion.com.ar';
const PATH = '/politica/nota-de-prueba-nid20201028';

describe('content - sources - ultils - validateArticleAccess', () => {
    const mocks = {
        redirect: {
            contentCode: 'cerrada',
            meteringVariant: 'M',
            host: BASE_URL,
            path: PATH
        },
        exclusive: {
            contentCode: 'cerrada',
            meteringVariant: 'S',
            host: BASE_URL,
            path: PATH
        },
        default: {
            contentCode: 'comun',
            meteringVariant: 'S',
            host: BASE_URL,
            path: PATH
        }
    };

    it('should redirect to Paywall', () => {
        expect(() => validateExclusiveAccess(mocks.redirect)).toThrow(Redirect);
    });

    it('should be exclusive access', () => {
        expect(validateExclusiveAccess(mocks.exclusive)).toBeTruthy();
    });

    it('should be default access', () => {
        expect(validateExclusiveAccess(mocks.default)).toBeFalsy();
    });
});
