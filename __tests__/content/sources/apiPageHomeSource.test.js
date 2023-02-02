import { SITE_LANACION } from '../../../__mocks__/fusion:environment';
import 'regenerator-runtime/runtime';
import apiPageHomeSource from '../../../content/sources/apiPageHomeSource';
import LN_Home_Main from '../../../__mocks__/data/pages/LN-Home_Main.json';

jest.mock('../../../content/sources/utils/servicesSource/pages/index', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            console.log(x);
            return {};
        }
    };
});

jest.mock(
    '../../../content/sources/utils/servicesSource/pages/transform',
    () => {
        return {
            __esModule: true,
            default: async (x, y) => {
                // if I want test real change return
                // const transform = require.requireActual(
                //     '../../../content/sources/utils/servicesSource/pages/transform'
                // );
                //return await transform.default(x, y);
                const responseHomeMobileTransformed = require.requireActual(
                    '../../../__mocks__/data/pages/transform/LN-Home_Main-Transformed.json'
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

jest.mock('../../../components/private/LN/api/v1/mobile/home/index', () => {
    return {
        __esModule: true,
        default: (x, y) => {
            /*  if (x.headers.Authorization === 'bad') {
                throw new Error(
                    'User is not authorized to access this resource with an explicit deny'
                );
            } */
            // if I want test real change return
            // const home = require.requireActual(
            //     '../../../components/private/LN/api/v1/global/home/index'
            // );
            // return home.default(x, y);

            if (y && y.rootPath.includes('homereal')) {
                const responseHomeMobile = require.requireActual(
                    '../../../__mocks__/data/pages/transform/LN-Home_Main-TransformedToHomeMobile.json'
                );
                return responseHomeMobile;
            }
            if (y && y.rootPath.includes('hometestOk')) {
                return jest.fn().mockReturnValue([{}]);
            }
            return null;
            //return jest.fn().mockImplementation(() => Promise.resolve(tokenOk));
        }
    };
});

describe('content - sources - apiPageHomeSource', () => {
    const paramQuery = {
        website: 'la-nacion-ar',
        namePage: 'home',
        ticks: '01'
    };
    test('receive result Real it is OK', async () => {
        const query = paramQuery;
        query.namePage = 'homereal';
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest.fn().mockReturnValue(Promise.resolve(LN_Home_Main))
        });
        expect(result).not.toBeNull();
        expect(result.length > 30).toBeTruthy();
    });

    test('receive result Test it is OK', async () => {
        const query = paramQuery;
        query.namePage = 'hometestOk';
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest.fn().mockReturnValue(Promise.resolve(LN_Home_Main))
        });
        expect(result).not.toBeNull();
        expect(result).toEqual({});
    });
    test('when result page is null', async () => {
        console.error = jest.fn(a => {
            expect(a).toContain("Cannot read property 'reduce' of null");
        });

        const query = paramQuery;
        query.namePage = 'hometestPageNull';
        const result = await apiPageHomeSource.fetch(query, {
            cachedCall: jest.fn().mockReturnValue(Promise.resolve(null))
        });
        expect(result).toEqual({});
    });
});
