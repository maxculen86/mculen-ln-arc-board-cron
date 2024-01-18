import { useContent } from 'fusion:content';
import {
    getHomeOpeningImages,
    getPromoItemsImages
} from '../../../../../../../components/features/foodit-global/common/image/preloadImage/_helper';
import article from '../../../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/3WA35TYAJJBETLFALJ4U3YDAZM.json';
import videoArticle from '../../../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

describe('Foodit - Preload Images - Helper', () => {
    describe('getHomeOpeningImages', () => {
        it('Should return empty array with no article', () => {
            useContent.mockReturnValue({});
            const result = getHomeOpeningImages([]);
            expect(result).toEqual([]);
        });

        it('Should return images array', () => {
            useContent.mockReturnValue(videoArticle);
            const result = getHomeOpeningImages([]);
            expect(result.length).toBe(4);
            expect(result).toMatchSnapshot();
        });
    });

    describe('getPromoItemsImages', () => {
        it('Should return empty array with no article', () => {
            const result = getPromoItemsImages({});
            expect(result).toEqual([]);
        });
        it('With storytelling subtype, should return mobile and desk images', () => {
            const result = getPromoItemsImages(article, 'Foodit-ficha-nota');
            expect(result.length).toBe(4);
            expect(result).toMatchSnapshot();
        });

        it('With recipe subtype, should return desk images', () => {
            const result = getPromoItemsImages(article, 'Foodit-ficha-receta');
            expect(result.length).toBe(4);
            expect(result).toMatchSnapshot();
        });

        it('With videoJW and storytelling subtype, should return mobile and poster images', () => {
            const result = getPromoItemsImages(
                videoArticle,
                'Foodit-ficha-nota'
            );
            expect(result.length).toBe(3);
            expect(result).toMatchSnapshot();
        });

        it('With video and recipe subtype, should return poster image', () => {
            const result = getPromoItemsImages(
                videoArticle,
                'Foodit-ficha-receta'
            );
            expect(result.length).toBe(1);
        });
    });
});
