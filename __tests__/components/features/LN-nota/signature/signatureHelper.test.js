import { getAuthorData } from '../../../../../components/features/LN-nota/signature/signatureHelper';

describe('components - feature - LN-nota - signature - signatureHelper', () => {
    describe('components - feature - LN-nota - signature - getAuthorData', () => {
        it('Returns the value of the key if "author" is defined', () => {
            const author = { name: 'John Doe', link: '/author/john-doe' };
            const authors = [];
            const key = 'name';

            expect(getAuthorData(author, authors, key)).toBe('John Doe');
        });

        it('Returns an array of key values for "authors" if "author" is not defined', () => {
            const author = null;
            const authors = [
                { name: 'Jane Smith', link: '/author/jane-smith' },
                { name: 'Mark Twain', link: '/author/mark-twain' }
            ];
            const key = 'name';

            expect(getAuthorData(author, authors, key)).toEqual([
                'Jane Smith',
                'Mark Twain'
            ]);
        });

        it('Returns an empty array if "authors" is empty and "author" is null', () => {
            const author = null;
            const authors = [];
            const key = 'name';

            expect(getAuthorData(author, authors, key)).toEqual([]);
        });

        it('Returns "undefined" if the key does not exist in "author"', () => {
            const author = { name: 'John Doe' };
            const authors = [];
            const key = 'link';

            expect(getAuthorData(author, authors, key)).toBeUndefined();
        });

        it('Returns "undefined" for missing keys in "authors"', () => {
            const author = null;
            const authors = [{ name: 'Jane Smith' }, { name: 'Mark Twain' }];
            const key = 'link';

            expect(getAuthorData(author, authors, key)).toEqual([
                undefined,
                undefined
            ]);
        });
    });
});
