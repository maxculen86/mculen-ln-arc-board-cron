import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import MOCK_PROMO_V1 from '../../../../__mocks__/data/articles/promoItemResizerV1.json';
import MOCK_PROMO_V2 from '../../../../__mocks__/data/articles/promoItemResizerV2.json';
import * as env from 'fusion:environment';

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.hostlanacion.com.ar/'
}));

jest.mock('fusion:environment', () => ({
    __esModule: true,
    SITE_LANACION: 'https://site.lanacion.com.ar/',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/',
    API_ENV: 'prod'
}));

describe('Content - sources - utils - replaceUrlResizerToWWW function', () => {
    describe('Content - sources - utils - replaceUrlResizerToWWW function - When API_ENV is set to prod', () => {
        test('Should replace RESIZER_URL_PUBLIC with provided host for resizer v2', () => {
            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            expect(result.url).toBe(
                'https://www.hostlanacion.com.ar/resizer/v2/KME4IGTK6NEVZO7O6TD6RBBWUI.jpg?auth=6aaf8a47cab740f1d00bcd323d50b1271205caa15e5616e35e3b9ef565630a9f&width=1920&height=0&quality=80&smart=true'
            );
        });
    });

    describe('Content - sources - utils - replaceUrlResizerToWWW function - When API_ENV is set to sandbox', () => {
        test('Should replace RESIZER_URL_PUBLIC with provided SITE_LANACION for resizer v2', () => {
            env.API_ENV = 'sandbox';

            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            expect(result.url).toBe(
                'https://site.lanacion.com.ar/resizer/v2/KME4IGTK6NEVZO7O6TD6RBBWUI.jpg?auth=6aaf8a47cab740f1d00bcd323d50b1271205caa15e5616e35e3b9ef565630a9f&width=1920&height=0&quality=80&smart=true'
            );
        });
    });

    describe('Content - sources - utils - replaceUrlResizerToWWW function - When API_ENV is prod and IS_STAGING is true', () => {
        test('Should replace RESIZER_URL_PUBLIC with SITE_LANACION instead of host', () => {
            env.API_ENV = 'prod';
            env.IS_STAGING = 'true';

            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            expect(result.url).toBe(
                'https://site.lanacion.com.ar/resizer/v2/KME4IGTK6NEVZO7O6TD6RBBWUI.jpg?auth=6aaf8a47cab740f1d00bcd323d50b1271205caa15e5616e35e3b9ef565630a9f&width=1920&height=0&quality=80&smart=true'
            );
        });

        test('Should replace RESIZER_URL_PUBLIC with SITE_LANACION in resized_urls', () => {
            env.API_ENV = 'prod';
            env.IS_STAGING = 'true';

            const result = replaceUrlResizerToWWW(MOCK_PROMO_V2);

            result.resized_urls.forEach(item => {
                expect(item.resizedUrl).toContain('https://site.lanacion.com.ar/');
            });
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
