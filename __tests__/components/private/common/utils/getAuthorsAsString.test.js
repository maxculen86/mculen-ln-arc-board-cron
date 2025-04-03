import getAuthorsAsString from '../../../../../components/private/common/utils/getAuthorsAsString';

describe('getAuthorsAsString', () => {
    const mockArticle = {
        distributor: {
            name: 'Test Distributor',
            category: 'other'
        },
        credits: {
            by: [
                {
                    type: 'author',
                    name: 'Author One',
                    additional_properties: {
                        original: {
                            author_type: ''
                        }
                    }
                },
                {
                    type: 'author',
                    name: 'Author Two'
                }
            ]
        }
    };

    it('should return distributor name when isHomeLN10 is true and conditions are met', () => {
        const result = getAuthorsAsString(mockArticle, true);
        expect(result).toBe('Test Distributor');
    });

    it('should return concatenated author names when isHomeLN10 is true', () => {
        const modifiedArticle = {
            ...mockArticle,
            distributor: {
                ...mockArticle.distributor,
                category: 'staff'
            }
        };
        const result = getAuthorsAsString(modifiedArticle, true);
        expect(result).toBe('Author One y Author Two');
    });

    it('should return concatenated author names prefixed with "Por" when isHomeLN10 is false', () => {
        const result = getAuthorsAsString(mockArticle, false);
        expect(result).toBe('Por Author One y Author Two');
    });

    it('should return concatenated author names prefixed with "Por" and handle more than two authors correctly', () => {
        const modifiedArticle = {
            ...mockArticle,
            credits: {
                by: [
                    ...mockArticle.credits.by,
                    {
                        type: 'author',
                        name: 'Author Three'
                    }
                ]
            }
        };
        const result = getAuthorsAsString(modifiedArticle, false);
        expect(result).toBe('Por Author One, Author Two y Author Three');
    });

    it('should return empty string when there are no authors', () => {
        const result = getAuthorsAsString(
            { distributor: {}, credits: {} },
            false
        );
        expect(result).toBe('');
    });

    it('should return empty string when authorsConcat is empty', () => {
        const result = getAuthorsAsString(
            { distributor: {}, credits: { by: [] } },
            false
        );
        expect(result).toBe('');
    });
});
