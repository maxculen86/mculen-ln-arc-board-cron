import isGuestAuthor from '../../../../../components/private/common/utils/isGuestAuthor';

describe('isGuestAuthor', () => {
    it('return false when author has author_type value "Estándar"', () => {
        const article = {
            credits: {
                by: [
                    {
                        _id: 'author-1234',
                        slug: 'author-1234',
                        byline: 'autor',
                        name: 'autor',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: 'Estándar' }
                        }
                    }
                ]
            }
        };

        const result = isGuestAuthor(article);
        expect(result).toBe(false);
    });

    it('return true when autor has not id', () => {
        const article = {
            credits: {
                by: [
                    {
                        byline: 'autor',
                        name: 'autor',
                        type: 'author'
                    }
                ]
            }
        };

        const result = isGuestAuthor(article);
        expect(result).toBe(true);
    });

    it('return true when autor type !== "Estándar"', () => {
        const article = {
            credits: {
                by: [
                    {
                        byline: 'autor',
                        name: 'autor',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: 'guest' }
                        }
                    }
                ]
            }
        };

        const result = isGuestAuthor(article);
        expect(result).toBe(true);
    });

    it('return false when no authors are present', () => {
        const article = { credits: { by: [] } };
        const result = isGuestAuthor(article);
        expect(result).toBe(true);
    });
});
