import 'regenerator-runtime/runtime';
import apiPageHomeLastUpdateSource from '../../../content/sources/apiPageHomeLastUpdateSource';
// mock fusion:environment'
jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://wwww.lanacion.com.arr'
}));

// mock Page
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
        return function(layoutPage, query) {
            return [];
        };
    }
);

// mock transformHome V2
jest.mock(
    '../../../components/private/LN/api/v2/mobile/home/index',
    (layoutPage, query) => {
        return function(layoutPage, query) {
            return [
                {
                    metadata: {
                        paginate: false,
                        contentVersion:
                            '615f8379bba6741c979f985add9489e9e485f2506734cf79bdda7f13fcb66e1a'
                    },
                    items: []
                }
            ];
        };
    }
);

describe('content - sources - apiPageHomeLastUpdateSource', () => {
    beforeEach(() => {
        jest.resetModules();

        jest.spyOn(console, 'error');
    });

    const paramQuery = {
        website: 'la-nacion-ar',
        versionUri: 2,
        namePage: 'home',
        contentVersion:
            '615f8379bba6741c979f985add9489e9e485f2506734cf79bdda7f13fcb66e1a',
        ticks: new Date().getTime().toString(),
        versionDeploy: null,
        useCookie: null
    };

    test('receive last update page LN10Main without param contentVersion', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'home';
        delete query['contentVersion'];

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };
        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest
                    .fn()
                    .mockReturnValue(Promise.resolve(resultLayoutPage))
            });
        } catch (error) {
            expect(error.message).toBe('content version is required');
        }
    });

    test('receive last update page LN10Main with param versionUri null', async () => {
        const query = Object.assign({}, paramQuery);
        query.versionUri = null;
        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };
        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest
                    .fn()
                    .mockReturnValue(Promise.resolve(resultLayoutPage))
            });
        } catch (error) {
            expect(error.message).toBe('versionUri is required');
        }
    });

    test('receive last update page when alias no exist', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'homexxxx';
        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };

        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest
                    .fn()
                    .mockReturnValue(Promise.resolve(resultLayoutPage))
            });
        } catch (error) {
            expect(error.message).toBe(
                'content version not implemented for this case.'
            );
        }
    });

    test('receive last update page LN10Main with param versionUri != 2', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'home';
        query.versionUri = 1;
        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            }
        };
        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest
                    .fn()
                    .mockReturnValue(Promise.resolve(resultLayoutPage))
            });
        } catch (error) {
            expect(error.message).toBe(
                'content version not implemented for this case.'
            );
        }
    });

    test('receive last update page LN10Main with param namePage != home', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'bitacora';

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: []
        };
        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest
                    .fn()
                    .mockReturnValue(Promise.resolve(resultLayoutPage))
            });
        } catch (error) {
            expect(error.message).toBe(
                'content version not implemented for this case.'
            );
        }
    });

    test('receive last update page LN10Main when is null', async () => {
        const query = Object.assign({}, paramQuery);

        try {
            await apiPageHomeLastUpdateSource.fetch(query, {
                cachedCall: jest.fn().mockReturnValue(Promise.resolve(null))
            });
        } catch (error) {
            expect(error.message).toBe('Not found page');
        }
    });

    test('receive homeUpdated false property for page LN10Main ', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'home';

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: []
        };

        const result = await apiPageHomeLastUpdateSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });

        expect(result).toHaveProperty('homeUpdated');
        expect(result.homeUpdated).toEqual(false);
    });

    test('receive homeUpdated true property for page LN10Main ', async () => {
        const query = Object.assign({}, paramQuery);
        query.namePage = 'home';
        query.contentVersion = 'testhash';

        const resultLayoutPage = {
            information: {
                layoutPage: 'LN10-Home_Main'
            },
            content_elements: []
        };

        const result = await apiPageHomeLastUpdateSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(resultLayoutPage))
        });

        expect(result).toHaveProperty('homeUpdated');
        expect(result).toHaveProperty('contentVersion');
        expect(result.homeUpdated).toEqual(true);
    });
});
