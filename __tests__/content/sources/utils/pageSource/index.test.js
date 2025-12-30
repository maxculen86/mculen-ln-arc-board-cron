import 'regenerator-runtime/runtime';
import pageHomeMain from '../../../../../__mocks__/data/pages/preLayout/LN-Home_Main.json';
import page from '../../../../../content/sources/utils/pageSource/index';

const mockResponse = Promise.resolve(pageHomeMain);
jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/'
    };
});

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse)
    });
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
            [
                'arcSite',
                'children',
                'layout',
                'renderables',
                'homeFetchDate'
            ].sort()
        );
    });

    test('fetch with is not param website', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            ticksCache: '01',
            isPage: true
        };
        const result = await page.fetch(queryParams);
        expect(Object.keys(result).sort()).toEqual(
            [
                'arcSite',
                'children',
                'layout',
                'renderables',
                'homeFetchDate'
            ].sort()
        );
    });

    test('fetch with is not param ticksCache', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            website: 'la-nacion-ar',
            isPage: true
        };
        const result = await page.fetch(queryParams);
        expect(Object.keys(result).sort()).toEqual(
            [
                'arcSite',
                'children',
                'layout',
                'renderables',
                'homeFetchDate'
            ].sort()
        );
    });

    test('fetch with param versionDeploy', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            ticksCache: '01',
            website: 'la-nacion-ar',
            versionDeploy: 14,
            isPage: true
        };
        const result = await page.fetch(queryParams);
        expect(Object.keys(result).sort()).toEqual(
            [
                'arcSite',
                'children',
                'layout',
                'renderables',
                'homeFetchDate'
            ].sort()
        );
    });

    test('fetch with param cookie', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepageCookie`,
            ticksCache: '01',
            website: 'la-nacion-ar',
            isPage: true,
            cookie: 'abc'
        };
        const result = await page.fetch(queryParams);
        expect(Object.keys(result).sort()).toEqual(
            [
                'arcSite',
                'children',
                'layout',
                'renderables',
                'homeFetchDate'
            ].sort()
        );
    });

    test('fetch query params null', async () => {
        try {
            await page.fetch(null);
        } catch (err) {
            expect(err.message).toBe(
                "Cannot read properties of null (reading 'cookie')"
            );
        }
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
            expect(err.message).toBe('404 - Error');
        }
    });
});
