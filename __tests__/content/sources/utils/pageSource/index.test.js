import page from '../../../../../content/sources/utils/pageSource/index';
import pageHomeMain from '../../../../../__mocks__/data/pages/LN-Home_Main.json';
import 'regenerator-runtime/runtime';

const mockResponse = Promise.resolve(pageHomeMain);
jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/'
    };
});

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: x => {
            if (x.uri.includes('Error')) {
                throw new Error('Error');
            }

            return mockResponse;
        }
    };
});

jest.mock('../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

describe('Test page', () => {
    test('fetch Ok', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            ticksCache: '01',
            website: 'la-nacion-ar',
            isPage: true
        };
        const result = await page.fetch(queryParams);
        expect(Object.keys(result).sort()).toEqual(
            ['arcSite', 'children', 'layout', 'renderables'].sort()
        );
    });

    test('fetch Error', async () => {
        try {
            const queryParams = {
                rootPath: `http://localhost/homepageError`,
                ticksCache: '01',
                website: 'la-nacion-ar',
                isPage: true
            };
            await page.fetch(queryParams);
        } catch (err) {
            expect(err.message).toBe('Error');
        }
    });
});
