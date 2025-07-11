import { isExternalUrl } from '../../../../../components/private/common/utils/isExternalUrl';

describe('isExternalUrl', () => {
    const siteHost = 'https://sandbox.lanacion.com.ar';

    const testCases = [
        { url: null, expected: false, description: 'null value' },
        { url: undefined, expected: false, description: 'undefined value' },
        { url: '', expected: false, description: 'empty string' },
        {
            url: '::::esto-no-es-url',
            expected: false,
            description: 'malformed URL'
        },
        {
            url: 'https://sandbox.lanacion.com.ar/deportes',
            expected: false,
            description: 'same-origin absolute URL'
        },
        {
            url: 'https://google.com',
            expected: true,
            description: 'external URL'
        },
        {
            url: 'https://servicios.lanacion.com.ar',
            expected: true,
            description: 'same domain but different subdomain'
        }
    ];

    testCases.forEach(({ url, expected, description }) => {
        it(`should return ${expected} for ${description}`, () => {
            expect(isExternalUrl(url, siteHost)).toBe(expected);
        });
    });
});
