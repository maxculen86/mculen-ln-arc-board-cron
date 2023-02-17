import transformHomeV1 from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import transformLayout from '../../../../../../../../components/private/LN/api/global/page/index';
import pageHomeMain from '../../../../../../../../__mocks__/data/pages/LN-Home_Main.json';
import pageLnAcuEconomia from '../../../../../../../../__mocks__/data/pages/Ln-Acumulado-Economia.json';
import pageHomeMainTransformed from '../../../../../../../../__mocks__/data/pages/transform/LN-Home_Main-Transformed.json';
import acuRevistaLiving from '../../../../../../../../__mocks__/data/articlesAcum/revista-living.json';
import acuEconomia from '../../../../../../../../__mocks__/data/articlesAcum/economia.json';

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
    '../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);

describe('Test transform page', () => {
    test('transform Ok when is Page', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            ticksCache: '01',
            website: 'la-nacion-ar',
            isPage: true
        };

        const result = await transformHomeV1(
            transformLayout(pageHomeMain),
            queryParams
        );
        console.log(result);
        expect(result.length).toBeGreaterThan(24);
    });
});
