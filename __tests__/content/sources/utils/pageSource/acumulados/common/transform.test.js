import transformHomeAcuV1 from '../../../../../../../content/sources/utils/pageSource/acumulados/common/transformAcuV1';
import acuEconomia from '../../../../../../../__mocks__/data/articlesAcum/economia.json';

import 'regenerator-runtime/runtime';

const pageLayoutLNAcumuladoEconomia = {
    information: {
        layoutPage: 'LN-acumulado'
    },
    content_elements: [
        {
            type: 0,
            sectionAliasMobile: 'cajamanual',
            information: {},
            articles: [
                {
                    _id: '2PVUOH2SZVCTPFYRJXJW2N574A'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMM'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Pre-Apertura'
        },
        {
            type: 0,
            sectionAliasMobile: 'ln-common/ranking',
            information: {},
            articles: [
                {
                    _id: '2PVUOH2SZVCTPFYRJXJW2N574A'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMM'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Aside'
        }
    ]
};

const mockResponsePageEconomia = Promise.resolve(pageLayoutLNAcumuladoEconomia);

const mockResponseAcuEconomia = Promise.resolve(acuEconomia);

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
            if (x.uri.includes('economia')) {
                return mockResponsePageEconomia;
            }

            return mockResponsePage;
        }
    };
});

jest.mock(
    '../../../../../../../content/sources/utils/pageSource/acumulados/common/getArticlesAcumulados.js',
    () => {
        return {
            __esModule: true,
            default: x => {
                if (x.uri.includes('Error')) {
                    throw new Error('Error');
                }
                if (x.uri.includes('economia')) {
                    return mockResponseAcuEconomia;
                }

                return {};
            }
        };
    }
);

jest.mock('../../../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

describe('Test transform page', () => {
    test('transform Ok when is Acu Economia', async () => {
        const queryParams = {
            sectionId: 'economia',
            page: 1,
            size: 30,
            restriction: null,
            website: 'la-nacion-ar',
            uri: `http://localhost/api/mobile/v1/bySection/economia/params=size:30;page:1/?_website=la-nacion-ar&outputType=json`,
            title: 'Economia',
            configuration: null,
            categoryUri: 'mobile',
            versionUri: 1,
            featureInPage: null,
            isPage: false
        };

        const result = await transformHomeAcuV1(queryParams);
        expect(Object.keys(result[0]).sort()).toEqual(
            [
                'acumuladoTotal',
                'banners',
                'idSeccion',
                'notas',
                'paginar',
                'titulo',
                'tipoSeccion'
            ].sort()
        );
    });
});
