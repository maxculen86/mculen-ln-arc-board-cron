jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

import { useContent } from 'fusion:content';
import addRelatedImage from '../../../../../../components/private/LN/common/utils/addRelatedImage';
import relatedImage from '../../../../../../__mocks__/data/images/K7L5NZFU2FDG7MXZVLQRGBA6JU.json';
import notaWithRelateImage from '../../../../../../__mocks__/data/articles/6WTWFSCNKBGHTPTZUBF7WOPC5M.json';
import notaWithoutRelateImage from '../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';

describe('cuando tiene imagen relacionada', () => {
    useContent.mockImplementation(() => ({
        promo_items: {
            basic: relatedImage
        }
    }));

    it('return true', () => {
        const notaWithRelateImage = {
            promo_items: {
                basic: relatedImage
            }
        };

        const expectedResult = {
            ...notaWithRelateImage,
            acuOgImg: { promo_items: { basic: relatedImage } }
        };

        expect(addRelatedImage(notaWithRelateImage)).toEqual(expectedResult);
    });
});

describe('cuando No tiene imagen relacionada', () => {
    beforeAll(() => {
        useContent.mockImplementation(() => null);
    });

    it('return original article', () => {
        expect(addRelatedImage(notaWithoutRelateImage)).toEqual(
            notaWithoutRelateImage
        );
    });
});
