import { getAuthorsNameAndLink } from '../../../../../components/private/common/utils/firmaHelper';

describe('components - private - common - utils - firmaHelper', () => {
    describe('getAuthorsNameAndLink', () => {
        it('should return the author name and link when there is a single author', () => {
            const authors = [
                { name: 'José Del Rio', link: '/autor/jose-del-rio/' }
            ];
            expect(getAuthorsNameAndLink(authors)).toEqual({
                author: { name: 'José Del Rio', link: '/autor/jose-del-rio/' }
            });
        });

        it('should return author false when there is more than one author', () => {
            const authors = [
                { name: 'José Del Rio', link: '/autor/jose-del-rio/' },
                { name: 'Carlos Pagni', link: '/autor/carlos-pagni/' }
            ];
            expect(getAuthorsNameAndLink(authors)).toEqual({ author: false });
        });

        it('should return author false when there are no authors', () => {
            expect(getAuthorsNameAndLink([])).toEqual({ author: false });
        });
    });
});
