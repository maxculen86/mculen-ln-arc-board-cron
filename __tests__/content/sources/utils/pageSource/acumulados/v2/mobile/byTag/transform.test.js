import transformHomeAcuV1 from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/byTag/transform';
import responseAcumulado from '../../../../../../../../../__mocks__/data/articlesAcum/economia.json';

import 'regenerator-runtime/runtime';

const mockResponseAcumulado = Promise.resolve(responseAcumulado);

jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/'
    };
});

jest.mock(
    '../../../../../../../../../content/sources/utils/pageSource/acumulados/common/getArticlesAcumulados.js',
    () => {
        return {
            __esModule: true,
            default: x => {
                return mockResponseAcumulado;
            }
        };
    }
);

jest.mock(
    '../../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);

describe('Test transform page', () => {
    test('transform Ok when is Acu Economia', async () => {
        const queryParams = {
            size: 30,
            page: 1,
            tagId: 'lionel-messi-tid1619',
            categoryUri: 'mobile',
            versionUri: '1',
            website: 'la-nacion-ar',
            tagSourceResult: {
                Payload: {
                    items: [
                        {
                            slug: 'test slug',
                            name: 'test name'
                        }
                    ]
                }
            }
        };

        const result = await transformHomeAcuV1(queryParams);
        expect(Object.keys(result[0]).sort()).toEqual(
            [
                'acumuladoTotal',
                'banners',
                'idSeccion',
                'notas',
                'paginar',
                'tema',
                'titulo',
                'tipoSeccion'
            ].sort()
        );
    });
});
