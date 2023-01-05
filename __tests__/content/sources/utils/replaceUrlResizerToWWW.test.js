import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import MOCK_PROMO_V1 from '../../../../__mocks__/data/articles/promoItemResizerV1.json';
import MOCK_PROMO_V2 from '../../../../__mocks__/data/articles/promoItemResizerV2.json';

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.hostlanacion.com.ar/'
}));

afterEach(() => {
    jest.resetModules();
});

// TODO: Solucionar tema de scope en mock de API_ENV para que no fallen los tests.

jest.mock('fusion:environment', env => ({
    SITE_LANACION: 'https://sitelanacion.com.ar/',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/',
    API_ENV: 'prod'
}));

describe('Content - sources - utils - replaceUrlResizerToWWW function', () => {
    describe('Content - sources - utils - replaceUrlResizerToWWW function - When API_ENV is set to prod', () => {
        test('Should replace RESIZER_URL_PUBLIC with provided host for resizer v1', () => {
            const result = replaceUrlResizerToWWW(MOCK_PROMO_V1);

            expect(result.url).toBe(
                'https://www.hostlanacion.com.ar/resizer/hTRLcNaCThdI-Uhvqu7bHplK88E=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/77KREVX35FDMXC3QVJ3BRBRYZE.jpg'
            );
        });
        test('Should replace RESIZER_URL_PUBLIC with provided host for resizer v2', () => {
            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            expect(result.url).toBe(
                'https://www.hostlanacion.com.ar/resizer/v2/KME4IGTK6NEVZO7O6TD6RBBWUI.jpg?auth=6aaf8a47cab740f1d00bcd323d50b1271205caa15e5616e35e3b9ef565630a9f&width=1920&height=0&quality=80&smart=true'
            );
        });
    });

    jest.mock('fusion:environment', () => ({
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/',
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/',
        API_ENV: 'sandbox'
    }));
    describe('Content - sources - utils - replaceUrlResizerToWWW function - When API_ENV is set to sandbox', () => {
        test('Should replace RESIZER_URL_PUBLIC with provided host for resizer v1', () => {
            const result = replaceUrlResizerToWWW(MOCK_PROMO_V1);

            expect(result.url).toBe(
                'https://www.hostlanacion.com.ar/resizer/hTRLcNaCThdI-Uhvqu7bHplK88E=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/77KREVX35FDMXC3QVJ3BRBRYZE.jpg'
            );
        });

        test('Should replace RESIZER_URL_PUBLIC with provided host for resizer v2', () => {
            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            expect(result.url).toBe(
                'https://sandbox.lanacion.com.ar/resizer/v2/KME4IGTK6NEVZO7O6TD6RBBWUI.jpg?auth=6aaf8a47cab740f1d00bcd323d50b1271205caa15e5616e35e3b9ef565630a9f&width=1920&height=0&quality=80&smart=true'
            );
        });
    });

    describe('When promo items are not type image', () => {
        test('Should return same promo_items as provived', () => {
            const notImageTypePromoItem = {
                ...MOCK_PROMO_V1,
                type: 'video'
            };

            expect(replaceUrlResizerToWWW(notImageTypePromoItem)).toStrictEqual(
                notImageTypePromoItem
            );
        });
    });
});
