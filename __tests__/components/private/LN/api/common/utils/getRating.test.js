import getRating from "../../../../../../../components/private/LN/api/common/utils/getRating";

describe('getRating util', () => {
    it('returns null when there are no content_elements', () => {
        expect(getRating({})).toBeNull();
    });

    it('returns null when there are content_elements but no numeric_rating', () => {
        const article = { content_elements: [{ type: 'text', content: 'foo' }] };
        expect(getRating(article)).toBeNull();
    });

    it('returns the numeric_rating of the first element that has it', () => {
        const article = {
            content_elements: [
                { type: 'text' },
                { type: 'numeric_rating', numeric_rating: 4.2, units: 'stars' },
                { type: 'numeric_rating', numeric_rating: 5 }
            ]
        };
        expect(getRating(article)).toBe(4);
    });

    it('ignores non-number numeric_rating values', () => {
        const article = {
            content_elements: [
                { numeric_rating: 'not a number' },
                { numeric_rating: 3.7 }
            ]
        };
        expect(getRating(article)).toBe(3.5);
    });

    it('returns null when numeric_rating is 0', () => {
        const article = {
            content_elements: [
                { numeric_rating: 0 }
            ]
        };
        expect(getRating(article)).toBeNull();
    });
});

describe('rating normalization', () => {
    test.each([
        [0.1, 0.5],
        [0.4, 0.5],
        [0.6, 0.5],
        [0.7, 0.5],
        [0.8, 1],
        [1.2, 1],
        [1.3, 1.5],
        [1.8, 2],
        [2.3, 2.5],
        [3.8, 4],
        [4.9, 5],
        [5.0, 5]
    ])(
        'numeric_rating %p should return rating %p',
        (input, expected) => {
            const article = {
                content_elements: [
                    {
                        numeric_rating: input
                    }
                ]
            };

            const result = getRating(article);

            expect(result).toBe(expected);
        }
    );
});
