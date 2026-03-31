import normalizeNumericRating, {
    normalizeNumericRatingElements
} from '../../../../../content/sources/utils/common/normalizeNumericRating';

describe('normalizeNumericRating', () => {
    test.each([
        [0, 0.5],
        [0.5, 0.5],
        [0.7, 0.5],
        [0.8, 1],
        [1.2, 1],
        [1.3, 1.5],
        [3.7, 3.5],
        [3.8, 4],
        [4.7, 4.5],
        [4.8, 5],
        [5.0, 5]
    ])('normaliza %p a %p', (input, expected) => {
        expect(normalizeNumericRating(input)).toBe(expected);
    });

    it('returns the original value when it is not a number', () => {
        expect(normalizeNumericRating(undefined)).toBeUndefined();
        expect(normalizeNumericRating(null)).toBeNull();
        expect(normalizeNumericRating('4.5')).toBe('4.5');
    });

    it('normaliza numeric_rating dentro de un array de elementos', () => {
        expect(
            normalizeNumericRatingElements([
                { type: 'text', content: 'Primer parrafo' },
                { type: 'numeric_rating', numeric_rating: 0 }
            ])
        ).toEqual([
            { type: 'text', content: 'Primer parrafo' },
            { type: 'numeric_rating', numeric_rating: 0.5 }
        ]);
    });
});
