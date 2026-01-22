import 'regenerator-runtime/runtime';
import apiPageHomeSource from '../../../content/sources/apiPageHomeSource';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://wwww.lanacion.com.arr'
}));

jest.mock('../../../content/sources/utils/pageSource/index', () => ({
    __esModule: true,
    default: jest.fn(() => ({}))
}));

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform',
    () => jest.fn(page => page)
);

jest.mock(
    '../../../components/private/LN/api/v2/mobile/home/index',
    () => jest.fn(() => null)
);

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v1/bitacora/transform',
    () => jest.fn(() => ({ cajas: [] }))
);

describe('content - sources - apiPageHomeSource', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    const baseQuery = {
        website: 'la-nacion-ar',
        versionUri: 1,
        namePage: 'home',
        ticks: '01',
        versionDeploy: null,
        useCookie: null
    };


    test('throws error when alias is invalid', async () => {
        expect.assertions(1);

        const query = {
            ...baseQuery,
            namePage: 'homexxxx',
        };

        try {
            await apiPageHomeSource.fetch(query, {
                cachedCall: jest.fn(),
            });
        } catch (error) {
            expect(error.message).toMatch(/apiPageHomeSource/i);
        }
    });


    test('returns bitacora transform', async () => {
        const query = { ...baseQuery, namePage: 'bitacora' };

        const page = {
            information: { layoutPage: 'LN10-Home_Main' },
            content_elements: []
        };

        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest.fn().mockResolvedValue(page)
        });

        expect(result).toEqual({ cajas: [] });
    });

    test('throws error when page is null', async () => {
        expect.assertions(2);

        try {
            await apiPageHomeSource.fetch(baseQuery, {
                cachedCall: jest.fn().mockResolvedValue(null)
            });
        } catch (error) {
            expect(error.message).toContain('Not found page');
            expect(console.error).toHaveBeenCalled();
        }
    });

    test('returns nothing when page falls into default config without alias', async () => {
        const query = {
            ...baseQuery,
            namePage: 'some-random-page',
        };

        try {
            const result = await apiPageHomeSource.fetch(query, {
                cachedCall: jest.fn(),
            });

            expect(result).toBeUndefined();
        } catch (error) {
            expect(error.message).toContain('Not found page');
        }
    });

});
