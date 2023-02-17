import transformHomeAcuV1 from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v1/mobile/bySection/transform';
import transformLayout from '../../../../../../../../../components/private/LN/api/global/page/index';
import pageHomeMain from '../../../../../../../../../__mocks__/data/pages/LN-Home_Main.json';
import pageLnAcuEconomia from '../../../../../../../../../__mocks__/data/pages/Ln-Acumulado-Economia.json';
import pageHomeMainTransformed from '../../../../../../../../../__mocks__/data/pages/transform/LN-Home_Main-Transformed.json';
import acuRevistaLiving from '../../../../../../../../../__mocks__/data/articlesAcum/revista-living.json';
import acuEconomia from '../../../../../../../../../__mocks__/data/articlesAcum/economia.json';

import 'regenerator-runtime/runtime';

const mockResponsePage = Promise.resolve(transformLayout(pageHomeMain));
const mockResponsePageEconomia = Promise.resolve(
    transformLayout(pageLnAcuEconomia)
);
const mockResponsePageTransformed = pageHomeMainTransformed;

const mockResponseAcuEconomia = Promise.resolve(acuEconomia);
const mockResponseAcuRevistaLiving = Promise.resolve(acuRevistaLiving);

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
    '../../../../../../../../../content/sources/utils/pageSource/acumulados/common/getArticlesAcumulados.js',
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

/* jest.mock(
    '../../../../../../components/private/LN/api/global/page/index.js',
    () => {
        return function(component) {
            return mockResponsePageTransformed;
        };
    }
); */

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

        const result = await transformHomeAcuV1(
            transformLayout(pageLnAcuEconomia),
            queryParams
        );
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
