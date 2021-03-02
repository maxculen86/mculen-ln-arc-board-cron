jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

import { useContent } from 'fusion:content';
import addRelatedImage from '../../../../../../components/private/LN/common/utils/addRelatedImage';
import relatedImage from '../../../../../../__mocks__/data/images/K7L5NZFU2FDG7MXZVLQRGBA6JU.json';
import notaWithRelateImage from '../../../../../../__mocks__/data/articles/6WTWFSCNKBGHTPTZUBF7WOPC5M.json';
import notaWithoutRelateImage from '../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';

describe('Agregar imagen relacionada al promo Items del articulo', () => {
    describe('cuando tiene imagen relacionada', () => {
        useContent.mockImplementation(() => ({
            promo_items: {
                basic: relatedImage
            }
        }));

        it('return true', () => {
            expect(addRelatedImage(notaWithRelateImage)).toStrictEqual({
                ...notaWithRelateImage,
                promo_items: {
                    basic: relatedImage
                }
            });
        });
    });

    describe('cuando No tiene imagen relacionada', () => {
        it('return original article', () => {
            expect(addRelatedImage(notaWithoutRelateImage)).toBe(
                notaWithoutRelateImage
            );
        });
    });
});
