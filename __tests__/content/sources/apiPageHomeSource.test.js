import { SITE_LANACION } from '../../../__mocks__/fusion:environment';
import 'regenerator-runtime/runtime';
import apiPageHomeSource from '../../../content/sources/apiPageHomeSource';
import LN_Home_Main_Page from '../../../__mocks__/data/pages/transformPage/LN-Home_Main-Transformed.json';

jest.mock('../../../content/sources/utils/pageSource/index', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            return {};
        }
    };
});

jest.mock(
    '../../../content/sources/utils/pageSource/pageHome/v2/mobile/transform',
    () => {
        return {
            __esModule: true,
            default: async (x, y) => {
                const responseHomeMobileTransformed = require.requireActual(
                    '../../../__mocks__/data/pages/transformPage/LN-Home_Main-Transformed.json'
                );

                if (y && y.rootPath.includes('homereal')) {
                    return responseHomeMobileTransformed;
                }
                if (y && y.rootPath.includes('hometestOk')) {
                    return null;
                }
                return jest.fn().mockReturnValue([]);
            }
        };
    }
);

jest.mock('../../../components/private/LN/api/v2/mobile/home/index', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            if (y && y.rootPath.includes('homereal')) {
                const responseHomeMobile = require.requireActual(
                    '../../../__mocks__/data/pages/transformPage/LN-Home_Main-TransformedToHomeMobile.json'
                );
                return responseHomeMobile;
            }
            if (y && y.rootPath.includes('hometestOk')) {
                return jest.fn().mockReturnValue([{}]);
            }
            return null;
        }
    };
});

describe('content - sources - apiPageHomeSource', () => {
    const paramQuery = {
        website: 'la-nacion-ar',
        versionUri: 1,
        namePage: 'home',
        ticks: '01'
    };
    test('receive page LNMain OK', async () => {
        const query = paramQuery;
        query.namePage = 'home';
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(LN_Home_Main_Page))
        });
        expect(result).not.toBeNull();
        expect(result.length).toBe(32);
    });

    test('when the layout of the loaded page is not mapped in the transformation Mobile v1', async () => {
        const query = paramQuery;
        query.namePage = 'home';
        const pageLayoutMissing = LN_Home_Main_Page;
        pageLayoutMissing.information.layoutPage = 'XXXXXX';

        console.error = jest.fn(a => {
            expect(a).toContain('TypeError: Cannot convert undefined or null to object');
        });

        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest
                .fn()
                .mockReturnValue(Promise.resolve(pageLayoutMissing))
        });
        expect(result).toEqual(null);
    });

    test('when result page is null', async () => {
        console.error = jest.fn(a => {
            expect(a).toContain('Not found page');
        });

        const query = paramQuery;
        query.namePage = 'hometestPageNull';
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest.fn().mockReturnValue(Promise.resolve(null))
        });
        expect(result).toEqual(null);
    });
});
