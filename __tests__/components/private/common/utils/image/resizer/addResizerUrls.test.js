import {
    isAllowSection,
    addResizedUrls
} from '../../../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import MOCK_OPTIONS from '../../../../../../../__mocks__/data/resizer/options.json';
import MOCK_ANS_DOC from '../../../../../../../__mocks__/data/resizer/ansDoc.json';

jest.mock('fusion:environment', () => ({
    API_ENV: 'prod',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('utils - image - resizer - addResizerUrls', () => {
    describe('addResizedUrls', () => {
        test('Should first match snapshot', () => {
            const payload = addResizedUrls(MOCK_ANS_DOC, MOCK_OPTIONS);
            expect(payload).toMatchSnapshot();
        });
    });
    describe('isAllowSection', () => {
        test('Should return false when section is undefined', () => {
            const payload = isAllowSection({
                section: undefined
            });
            expect(payload).toBeFalsy();
        });

        test('Should return false when section is not allowed = /revista-jardin', () => {
            const payload = isAllowSection({
                section: '/revista-jardin'
            });
            expect(payload).toBeFalsy();
        });

        test('Should return true when section is allowed = /revista-living', () => {
            const payload = isAllowSection({
                section: '/revista-living'
            });
            expect(payload).toBeTruthy();
        });

        test('Should return true even when provided section is son of allowed section = /revista-living/dormitorios', () => {
            const payload = isAllowSection({
                section: '/revista-living/dormitorios'
            });
            expect(payload).toBeTruthy();
        });
    });
});
