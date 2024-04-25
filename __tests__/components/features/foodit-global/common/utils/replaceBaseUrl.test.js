import replaceBaseUrl from '../../../../../../components/features/foodit-global/common/utils/replaceBaseUrl';
import ARTICLE_MOCK from '../../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit-lanacion.com.ar/',
    RESIZER_URL_PUBLIC: 'https://sandbox.lanacion.com.ar/'
}));

describe('Components - Feature - Foodit Global - Common - Utils - replaceBaseUrl', () => {
    const { promo_items } = ARTICLE_MOCK;

    const { storytelling_mobile, video_jw } = promo_items;

    test('Should replace RESIZER_URL_PUBLIC with basic SITE_FOODIT url', () => {
        const result = replaceBaseUrl(storytelling_mobile);

        expect(result.url).toMatch('https://foodit-lanacion.com.ar/');

        expect(result.resized_urls[0].resizedUrl).toMatch(
            'https://foodit-lanacion.com.ar/'
        );
    });

    test('Should return the same object if promo_item type is not "image"', () => {
        const result = replaceBaseUrl(video_jw);

        expect(result).toBe(video_jw);
    });

    describe('Default cases', () => {
        test('Should return the same received property', () => {
            const undefinedIput = replaceBaseUrl();
            expect(undefinedIput).toEqual(undefined);

            const nullInput = replaceBaseUrl(null);
            expect(nullInput).toEqual(null);

            const emptyObjInput = replaceBaseUrl({});
            expect(emptyObjInput).toEqual({});
        });
    });
});
