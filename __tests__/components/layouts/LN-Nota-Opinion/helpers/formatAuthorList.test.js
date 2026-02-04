import formatAuthorList from '../../../../../components/layouts/LN-Nota-Opinion/helpers/formatAuthorList';
import get from '../../../../../components/private/common/utils/get';
import { startsWithIorHiRAE } from '../../../../../components/private/common/utils/getAuthorsAsString';

jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn()
);
jest.mock(
    '../../../../../components/private/common/utils/getAuthorsAsString',
    () => ({
        startsWithIorHiRAE: jest.fn()
    })
);

describe('formatAuthorList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns empty string when authors is not an array', () => {
        expect(formatAuthorList(null)).toBe('');
        expect(formatAuthorList(undefined)).toBe('');
        expect(formatAuthorList({})).toBe('');
    });

    it('returns empty string when authors array is empty', () => {
        expect(formatAuthorList([])).toBe('');
    });

    it('returns empty string when no author type elements exist', () => {
        const authors = [
            { type: 'editor', name: 'Juan' },
            { type: 'photographer', name: 'Pedro' }
        ];

        get.mockReturnValue('Juan');

        expect(formatAuthorList(authors)).toBe('');
    });

    it('returns single author name in uppercase when only one valid author exists', () => {
        const authors = [{ type: 'author', name: 'Juan Pérez' }];

        get.mockReturnValue('Juan Pérez');

        expect(formatAuthorList(authors)).toBe('JUAN PÉREZ');
    });

    it('joins two authors with "y" when last author does not start with i or hi', () => {
        const authors = [
            { type: 'author', name: 'Juan' },
            { type: 'author', name: 'Pedro' }
        ];

        get.mockReturnValueOnce('Juan').mockReturnValueOnce('Pedro');

        startsWithIorHiRAE.mockReturnValue(false);

        expect(formatAuthorList(authors)).toBe('JUAN Y PEDRO');
    });

    it('joins two authors with "e" when last author starts with i or hi', () => {
        const authors = [
            { type: 'author', name: 'Juan' },
            { type: 'author', name: 'Ignacio' }
        ];

        get.mockReturnValueOnce('Juan').mockReturnValueOnce('Ignacio');

        startsWithIorHiRAE.mockReturnValue(true);

        expect(formatAuthorList(authors)).toBe('JUAN E IGNACIO');
    });

    it('formats three authors using commas and the correct final connector', () => {
        const authors = [
            { type: 'author', name: 'Juan' },
            { type: 'author', name: 'Pedro' },
            { type: 'author', name: 'Ignacio' }
        ];

        get.mockReturnValueOnce('Juan')
            .mockReturnValueOnce('Pedro')
            .mockReturnValueOnce('Ignacio');

        startsWithIorHiRAE.mockReturnValue(true);

        expect(formatAuthorList(authors)).toBe('JUAN, PEDRO E IGNACIO');
    });

    it('ignores authors with empty or blank names when formatting the list', () => {
        const authors = [
            { type: 'author', name: 'Juan' },
            { type: 'author', name: '   ' },
            { type: 'author', name: 'Pedro' }
        ];

        get.mockReturnValueOnce('Juan')
            .mockReturnValueOnce('   ')
            .mockReturnValueOnce('Pedro');

        startsWithIorHiRAE.mockReturnValue(false);

        expect(formatAuthorList(authors)).toBe('JUAN Y PEDRO');
    });

    it('returns empty string when all author names are empty or blank', () => {
        const authors = [
            { type: 'author', name: '   ' },
            { type: 'author', name: '' }
        ];

        get.mockReturnValueOnce('   ').mockReturnValueOnce('');

        expect(formatAuthorList(authors)).toBe('');
    });
});
