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

        test('Should return true when sections are allowed', () => {
            expect(
                isAllowSection({
                    section: '/revista-living'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/sociedad'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/seguridad'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/economia'
                })
            ).toBeTruthy();
        });

        test('Should return true even when provided section is son of allowed section = /revista-living/dormitorios', () => {
            expect(
                isAllowSection({
                    section: '/revista-living/dormitorios'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/sociedad/mock'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/seguridad/mock'
                })
            ).toBeTruthy();
            expect(
                isAllowSection({
                    section: '/economia/comercio-exterior/'
                })
            ).toBeTruthy();
        });

        test('Should return false only for v1 remaining sections: deportes y politica', () => {
            expect(
                isAllowSection({
                    section: '/deportes'
                })
            ).toBeFalsy();
            expect(
                isAllowSection({
                    section: '/politica'
                })
            ).toBeFalsy();
        });
        test('Should return false for v1 remaining child sections of: deportes y politica', () => {
            expect(
                isAllowSection({
                    section: '/deportes/futbol/'
                })
            ).toBeFalsy();
            expect(
                isAllowSection({
                    section: '/politica/mock/'
                })
            ).toBeFalsy();
        });
    });
});
