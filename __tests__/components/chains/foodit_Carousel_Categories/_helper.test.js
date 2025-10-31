import { validateCarouselCategory } from '../../../../components/chains/foodit_Carousel_Categories/_helper';

jest.mock(
    '../../../../components/private/common/utils/pageBuilderValidator',
    () => jest.fn(r => r)
);

describe('validateCarouselCategory', () => {
    it('should return error when children length is not 8', () => {
        const result = validateCarouselCategory({ children: [1, 2, 3] });
        expect(result[0].validation).toBe(true);
        expect(result[0].message).toBe(
            'Se requiere un minimo y maximo de 8 articulos'
        );
    });

    it('should not return error when children length is 8', () => {
        const result = validateCarouselCategory({
            children: [1, 2, 3, 4, 5, 6, 7, 8]
        });
        expect(result[0].validation).toBe(false);
    });

    it('should default children to empty array', () => {
        const result = validateCarouselCategory({});
        expect(result[0].validation).toBe(true);
    });
});
