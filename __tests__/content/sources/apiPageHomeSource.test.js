import 'regenerator-runtime/runtime';
import apiPageHomeSource from '../../../content/sources/apiPageHomeSource';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://wwww.lanacion.com.arr'
}));

jest.mock('../../../content/sources/utils/pageSource/index', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            return {};
        }
    };
});

// mock transformPage V1

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform',
    (layoutPage, query) => {
        return function (layoutPage, query) {
            return [];
        };
    }
);

// mock transformPage V2

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v2/mobile/transform',
    (layoutPage, query) => {
        return function (layoutPage, query) {
            return null;
        };
    }
);

// mock transformHome V1

jest.mock(
    '../../../components/private/LN/api/v1/mobile/home/index',
    (layoutPage, query) => {
        return function (layoutPage, query) {
            return [{}];
        };
    }
);

// mock transformHome V2

jest.mock(
    '../../../components/private/LN/api/v2/mobile/home/index',
    (layoutPage, query) => {
        return function (layoutPage, query) {
            return null;
        };
    }
);

// mock transformBitacora V1

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v1/bitacora/transform',
    (layoutPage, query) => {
        return function (layoutPage, query) {
            return { cajas: [] };
        };
    }
);

describe('content - sources - apiPageHomeSource', () => {
    beforeEach(() => {
        jest.resetModules();

        jest.spyOn(console, 'error');
    });
    const paramQuery = {
        website: 'la-nacion-ar',
        versionUri: 1,
        namePage: 'home',
        ticks: '01',
        versionDeploy: null,
        useCookie: null
    };

    test('receive page LN10Main with param versionUri null', async () => {
        const query = Object.assign({}, paramQuery);
        query.versionUri = null;
        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };

        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });
        expect(result).not.toBeNull();
        expect(result).toEqual(resultLayoutPage);
    });

    test('receive page when alias no exist', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'homexxxx';
        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };

        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });
        expect(result).not.toBeNull();
        expect(result).toEqual({});
    });

    test('receive page LN10Main with param versionUri 1', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'home';

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });
        expect(result).not.toBeNull();
        expect(result).toEqual({});
    });

    test('receive page LN10Main with param versionUri No exist', async () => {
        const query = Object.assign({}, paramQuery);
        query.versionUri = 3;

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: []
        };
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });
        expect(result).not.toBeNull();
        expect(result).toMatchObject(resultLayoutPage);
    });

    test('receive page LN10Main with param namePage Bitacora', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'bitacora';

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: []
        };
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });
        expect(result).not.toBeNull();
        expect(result).toMatchObject({ cajas: [] });
    });

    test('receive page LN10Main when is null', async () => {
        try {
            const query = Object.assign({}, paramQuery);

            await apiPageHomeSource.fetch(query, {
                cachedCall: jest.fn().mockReturnValue(Promise.resolve(null))
            });
        } catch (error) {
            expect(error.message).toBe(
                'Error content/apiPageHomeSource QueryParams: {"rootPath":"https://wwww.lanacion.com.arr/","ticksCache":"01","website":"la-nacion-ar","isPage":true,"versionDeploy":null,"cookie":null} errorMsj: Not found page'
            );
            expect(console.error).toHaveBeenCalledTimes(1);
        }
    });
});
