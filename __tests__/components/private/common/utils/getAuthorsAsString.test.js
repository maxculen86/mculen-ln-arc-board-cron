import getAuthorsAsString, {
    startsWithIorHiRAE
} from '../../../../../components/private/common/utils/getAuthorsAsString';

describe('components - private - common - utils', () => {
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

        it('should return concatenated author names prefixed with "Por" using "e" when the last author starts with i or hi', () => {
            const modifiedArticle = {
                ...mockArticle,
                credits: {
                    by: [
                        ...mockArticle.credits.by,
                        {
                            type: 'author',
                            name: 'Ignacio'
                        }
                    ]
                }
            };

            const result = getAuthorsAsString(modifiedArticle, false);

            expect(result).toBe('Por Author One, Author Two e Ignacio');
        });

        it('should return concatenated author names prefixed with "Por" using "e" when the last author starts with hi', () => {
            const modifiedArticle = {
                ...mockArticle,
                credits: {
                    by: [
                        ...mockArticle.credits.by,
                        {
                            type: 'author',
                            name: 'Hilda'
                        }
                    ]
                }
            };

            const result = getAuthorsAsString(modifiedArticle, false);

            expect(result).toBe('Por Author One, Author Two e Hilda');
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

    describe('startsWithIorHiRAE', () => {
        it('should return true when name starts with "i"', () => {
            expect(startsWithIorHiRAE('Ignacio')).toBe(true);
            expect(startsWithIorHiRAE('ivan')).toBe(true);
        });

        it('should return true when name starts with "hi"', () => {
            expect(startsWithIorHiRAE('Hilario')).toBe(true);
            expect(startsWithIorHiRAE('Hilda')).toBe(true);
        });

        it('should return false when name does not start with "i" or "hi"', () => {
            expect(startsWithIorHiRAE('Juan')).toBe(false);
            expect(startsWithIorHiRAE('Yolanda')).toBe(false);
            expect(startsWithIorHiRAE('Maria')).toBe(false);
        });

        it('should be case insensitive', () => {
            expect(startsWithIorHiRAE('IGNACIO')).toBe(true);
            expect(startsWithIorHiRAE('Hiromi')).toBe(true);
        });

        it('should return false for empty or falsy values', () => {
            expect(startsWithIorHiRAE('')).toBe(false);
            expect(startsWithIorHiRAE(null)).toBe(false);
            expect(startsWithIorHiRAE(undefined)).toBe(false);
        });

        it('returns false when I or HI is followed by A, E, O', () => {
            expect(startsWithIorHiRAE('Iara')).toBe(false);
            expect(startsWithIorHiRAE('Hiaquel')).toBe(false);
            expect(startsWithIorHiRAE('Hiebre')).toBe(false);
            expect(startsWithIorHiRAE('Hiomar')).toBe(false);
        });
    });
});
